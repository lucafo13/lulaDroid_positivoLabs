
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use std::process::Command;

#[tauri::command]
fn trocar_wallpaper(caminho: String) -> Result<(), String> {
    let lively = r"C:\Users\Davi\AppData\Local\Programs\Lively Wallpaper\Lively.exe";

    Command::new(lively)
        .arg("setwp")
        .arg("--file")
        .arg(caminho)
        .spawn()
        .map_err(|e| format!("Erro ao abrir Lively: {e}"))?;

    Ok(())
}
#[tauri::command]
async fn gerar_audio(texto: String) -> Result<String, String> {
    use base64::{engine::general_purpose::STANDARD, Engine};
    use reqwest::Client;
    use serde_json::json;

    let api_key = std::env::var("VITE_AUDIO")
        .map_err(|_| "Chave FISH_API_KEY não encontrada".to_string())?;

    let response = Client::new()
        .post("https://api.fish.audio/v1/tts")
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .header("model", "s2.1-pro-free")
        .json(&json!({
            "text": texto,
            "reference_id": "a4ac1426e4a749839c86853ad613eebe",
             //"ddc68459485f42c2948faad6e2702dd3",
            "format": "mp3"
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !response.status().is_success() {
        return Err(response.text().await.unwrap_or_default());
    }

    let bytes = response.bytes().await.map_err(|e| e.to_string())?;

    Ok(STANDARD.encode(bytes))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenvy::dotenv().ok();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![greet, gerar_audio, trocar_wallpaper])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
