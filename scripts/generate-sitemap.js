const fs = require("fs");
const path = require("path");
const https = require("https");

const targetPath = path.join(__dirname, "../public/sitemap.xml");

console.log("Fetching live sitemap XML to generate physical public/sitemap.xml...");

https.get("https://toolifia.vercel.app/sitemap.xml", (res) => {
  let xml = "";
  res.on("data", chunk => xml += chunk);
  res.on("end", () => {
    if (res.statusCode === 200 && xml.includes("</urlset>")) {
      fs.writeFileSync(targetPath, xml, "utf8");
      console.log(`✅ Static physical public/sitemap.xml generated (${xml.length} bytes)!`);
    } else {
      console.error("Failed to fetch sitemap XML:", res.statusCode);
    }
  });
}).on("error", err => console.error("Error fetching sitemap:", err.message));
