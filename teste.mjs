import { writeFile } from "node:fs/promises";
import 'dotenv/config'
const API_KEY = process.env.VITE_AUDIO;

if (!API_KEY) {
  throw new Error("FISH_API_KEY não encontrada!");
}

const response = await fetch("https://api.fish.audio/v1/tts", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    model: "s2.1-pro-free",
  },
  body: JSON.stringify({
    text: "Ora, ora! Uma nova aventura nos aguarda!",
    reference_id: "ddc68459485f42c2948faad6e2702dd3",
    format: "mp3",
  }),
});

if (!response.ok) {
  throw new Error(`${response.status}: ${await response.text()}`);
}

await writeFile("don-teste.mp3", Buffer.from(await response.arrayBuffer()));

console.log("Áudio gerado com sucesso!");