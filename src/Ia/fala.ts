
import { invoke } from "@tauri-apps/api/core";

export const falar = async (fala: string) => {
  const base64 = await invoke<string>("gerar_audio", {
    texto: fala
  });

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));

  const blob = new Blob([bytes], {
    type: "audio/mpeg"
  });

  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);

  audio.onended = () => URL.revokeObjectURL(url);

  await audio.play();
};
