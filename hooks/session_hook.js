const fs = require("fs");

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const payload = JSON.parse(Buffer.concat(chunks).toString());

  // Read existing entries, append new one, write back
  const logPath = "./hooks/payloads.json";
  let entries = [];
  if (fs.existsSync(logPath)) {
    try {
      entries = JSON.parse(fs.readFileSync(logPath, "utf8"));
    } catch {
      entries = [];
    }
  }

  entries.push({ timestamp: new Date().toISOString(), payload });
  fs.writeFileSync(logPath, JSON.stringify(entries, null, 2));
}

main();
