// ======= YOUR KEYS HERE =======
const apiKey = "API_KEY";
const apiSecret = "API_SECRET";
// =========================================


// BUILD SHA256
async function generateSignature(apiKey, apiSecret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const data = apiKey + apiSecret + timestamp;

  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);

  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

 

  // RETUNRNS THE SIGNATURE AND TIMESTAMP
  return { signature, timestamp };
}

// SIGNNATURE ON CONSOLE
generateSignature(apiKey, apiSecret)
  .then(result => console.log("signature:", result.signature, "timestamp:", result.timestamp))
  .catch(err => console.error(err));
