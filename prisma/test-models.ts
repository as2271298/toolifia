async function testOpenRouterFree() {
  const apiKey = process.env.OPENROUTER_API_KEY || "";
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Write a short 2-sentence greeting for web developers." }],
      max_tokens: 100,
    }),
  });

  if (res.ok) {
    const json = await res.json();
    console.log("✅ SUCCESS with 'openrouter/free'!", json.choices[0]?.message?.content);
  } else {
    console.log("❌ Failed:", await res.text());
  }
}

testOpenRouterFree();
