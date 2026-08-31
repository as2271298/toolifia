const https = require("https");
const { URL } = require("url");

const INDEXNOW_KEY = "2032946dbd1548d89436c5306cc46231";
const SITE_URL = "https://toolifia.vercel.app";
const HOST = "toolifia.vercel.app";

// Import tools and blog slugs
const fs = require("fs");
const path = require("path");

const toolsRegistry = fs.readFileSync(path.join(__dirname, "../src/config/tools.registry.ts"), "utf8");
const slugMatches = [...toolsRegistry.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
const uniqueTools = Array.from(new Set(slugMatches)).filter(s => s !== "string");

const urlList = [
  SITE_URL,
  `${SITE_URL}/tools`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/about`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/privacy`,
  `${SITE_URL}/terms`,
  `${SITE_URL}/cookie-policy`,
  `${SITE_URL}/disclaimer`,
  `${SITE_URL}/category/ai-tools`,
  `${SITE_URL}/category/seo-tools`,
  `${SITE_URL}/category/developer-tools`,
  `${SITE_URL}/category/calculator-tools`,
  `${SITE_URL}/category/converter-tools`,
  `${SITE_URL}/category/text-tools`,
  `${SITE_URL}/category/image-tools`,
  `${SITE_URL}/category/generator-tools`,
  `${SITE_URL}/category/security-tools`,
  ...uniqueTools.map(slug => `${SITE_URL}/tool/${slug}`),
  `${SITE_URL}/blog/meta-title-length-checker-complete-guide-and-best-practices`,
  `${SITE_URL}/blog/keyword-density-checker-complete-guide-and-best-practices`,
  `${SITE_URL}/blog/mastering-json-ld-schema-engineering-for-google-rich-snippets`,
  `${SITE_URL}/blog/how-to-bypass-ai-detectors-naturally`,
  `${SITE_URL}/blog/best-toolify-ai-alternative-2026`,
  `${SITE_URL}/blog/best-free-ai-humanizer-no-signup-2026`,
  `${SITE_URL}/blog/best-free-seo-tools-online-2026`,
  `${SITE_URL}/blog/ai-content-detector-vs-humanizer-guide-2026`,
  `${SITE_URL}/blog/300-free-online-tools-developers-writers-seos`
];

console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

const payload = JSON.stringify({
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: urlList
});

const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow"
];

function submit(endpointUrl) {
  return new Promise((resolve) => {
    const parsed = new URL(endpointUrl);
    const options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        console.log(`[${parsed.hostname}] Status: ${res.statusCode} ${res.statusMessage}`);
        resolve({ endpoint: endpointUrl, status: res.statusCode });
      });
    });

    req.on("error", (err) => {
      console.error(`[${parsed.hostname}] Error:`, err.message);
      resolve({ endpoint: endpointUrl, error: err.message });
    });

    req.write(payload);
    req.end();
  });
}

Promise.all(endpoints.map(submit)).then(() => {
  console.log("IndexNow submission completed!");
});
