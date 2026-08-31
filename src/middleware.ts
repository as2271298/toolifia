import { NextRequest, NextResponse } from "next/server";

// ── In-memory rate limit store (resets on cold start — fine for Vercel Edge) ──
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  "/api/tools": { max: 20, windowMs: 60_000 },
  "/api/":      { max: 60, windowMs: 60_000 },
  "/contact":   { max: 5,  windowMs: 60_000 },
};

// ── Known bad bots, scanners, scrapers ──
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i, /nikto/i, /nmap/i, /masscan/i, /zgrab/i,
  /dirbuster/i, /gobuster/i, /nuclei/i, /acunetix/i,
  /nessus/i, /openvas/i, /w3af/i, /havij/i,
  /scrapy/i, /libwww-perl/i, /lwp-trivial/i,
];

// ── Known attack paths to block immediately ──
const BLOCKED_PATH_PATTERNS = [
  /\/wp-login/i, /\/wp-admin/i, /\/xmlrpc\.php/i,
  /\/\.env/i, /\/\.git\//i, /\/config\.php/i,
  /\/phpinfo/i, /\/etc\/passwd/i, /\/proc\/self/i,
  /\/shell\?/i, /\/boaform/i, /\/cgi-bin/i,
  /\/vendor\/phpunit/i, /\.php$/i, /\.asp$/i,
  /\.aspx$/i, /\.jsp$/i, /\/actuator\//i,
];

function getRateLimit(pathname: string) {
  for (const [prefix, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(prefix)) return config;
  }
  return null;
}

function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

// ── Allowed Search Engine Crawlers & Auditing Bots ──
const SEARCH_ENGINE_BOTS = [
  /Googlebot/i,
  /Google-InspectionTool/i,
  /Mediapartners-Google/i,
  /AdsBot-Google/i,
  /bingbot/i,
  /Slurp/i,
  /DuckDuckBot/i,
  /Baiduspider/i,
  /Yandex/i,
  /Screaming Frog/i,
  /AhrefsBot/i,
  /SemrushBot/i,
];

function isSearchBot(ua: string): boolean {
  return SEARCH_ENGINE_BOTS.some((bot) => bot.test(ua));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Always allow search engine crawlers and AdSense verification bots
  if (isSearchBot(ua)) {
    return NextResponse.next();
  }

  // 1. Block known attack paths
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // 2. Block malicious user agents
  if (ua) {
    for (const pattern of BLOCKED_UA_PATTERNS) {
      if (pattern.test(ua)) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }
  }

  // 3. Rate limiting for non-bots
  const limit = getRateLimit(pathname);
  if (limit) {
    const key = `${ip}:${pathname.split("/").slice(0, 3).join("/")}`;
    const allowed = checkRateLimit(key, limit.max, limit.windowMs);
    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too Many Requests. Please slow down." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|woff|woff2|ttf|css|js|txt|xml)).*)",
  ],
};
