async function testGen() {
  console.log("🚀 Testing OpenRouter AI blog post generation...");
  const res = await fetch("http://localhost:3001/api/cron/generate-blog?key=Yousuf2008@", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const json = await res.json();
  console.log("Status:", res.status);
  console.log("Response:", JSON.stringify(json, null, 2));
}

testGen().catch(console.error);
