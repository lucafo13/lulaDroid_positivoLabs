import { TitleBar } from "./TItlebar"
import { Pet } from "./Pet"
import  audio from '../assets/audio.mp4'
import { useEffect } from "react"
import { trocarWallpaper } from "../wall"
export const Base = () => {
  useEffect(() => {
    trocarWallpaper("C:\\Users\\Davi\\Desktop\\projs\\Don_Pet\\src\\assets\\videoW.mp4")
    const audioElement = new Audio(audio);
    audioElement.play().catch((error) => {
      console.error("Erro ao reproduzir o áudio:", error);
    });
  }, [])
    return (

      
        <>
  <TitleBar/>
    <main className="container">
      <h1>LulaDroid</h1>
      <Pet/>
    </main>
    </>
    ) 
}