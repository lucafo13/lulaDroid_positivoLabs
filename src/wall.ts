import { invoke } from "@tauri-apps/api/core";

export async function trocarWallpaper(caminho: string) {
  await invoke("trocar_wallpaper", { caminho });
}