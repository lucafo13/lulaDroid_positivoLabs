import '../App.css'
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { listen } from '@tauri-apps/api/event';
import { convertFileSrc } from "@tauri-apps/api/core";
import { TitleBar } from "./TItlebar"
import lulag from '../assets/guitar.jpg'
import stoped from '../assets/donstoped.jpg'
import video from '../music/Video Project 1.mp4'
import { useEffect, useState, useRef } from 'react';
import lendo from '../assets/lulalendo.jpg'
export const Music = () => {
    let dance = "https://media1.tenor.com/m/B-EMm24pVcAAAAAd/don-quixote-dance.gif"
    function paraSegundos(tempoTexto: any) {
      const partes = tempoTexto.split(':').map(Number);
      
      if (partes.length === 2) {
        return partes[0] * 60 + partes[1];
      }
      if (partes.length === 3) {
        return partes[0] * 3600 + partes[1] * 60 + partes[2];
      }
      
      return 0;
    }
    function formatarTempo(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return "0:00";

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60);

  return `${minutos}:${String(segundosRestantes).padStart(2, "0")}`;
}
    const tocadento = async(caminho: string) => {
         if (!audioRef.current) return;
    
        audioRef.current.src = convertFileSrc(caminho);
        try {
            
            await audioRef.current.play();
            setTocando(true);
        } catch (error) {
            return
        }
    }
    const [at, setAt] = useState('')
    const [tocando, setTocando] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let stop: (() => void) | undefined

        listen('selected', async (event) => {
            const data = event.payload as {
                nome: string,
                caminho: string
            }
            setAt(data.nome)
            await tocadento(data.caminho)
        }).then((unlisten) => {
            stop = unlisten
        })
        return () => {stop?.()}

    }, [])
    const abirSeletor = () => {
    new WebviewWindow("janela-musica-2", {
    url: "index.html?view=select",
    title: "Don's Music",
    width: 320,
    height: 320,
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
  })
  
}
const mechernosom = async() => {
    if(!audioRef.current){
        return
    }
    if(tocando){
        audioRef.current.pause()
        console.log(at)

        console.log(formatarTempo(audioRef.current.duration))
        console.log(formatarTempo(audioRef.current.currentTime))
    }
    else{
        try {
          await  audioRef.current.play()
        } catch (error) {
            console.log(error);
            
        }
    }
}
    return(
    <>
    
     <audio
          ref={audioRef}
          onEnded={() => setTocando(false)}
          onPause={() => setTocando(false)}
          onPlay={() => setTocando(true)}
        />
    <TitleBar/>
    <main className='music-layout'>
    <div className='music-left'>
        <h1>{at || "lulinha"}</h1>

        <div className="music-don">
            {
                at === "Hero.mp3" ?
                <video controls={false} autoPlay={true} muted={true} onClick={abirSeletor}>
                    <source src={video}/>
                </video>
                :
                <img src={tocando ? lulag : lendo} alt="" onClick={abirSeletor}/>
            }
        </div>
    </div>
    <div className="music-controls">
            <input type="range" name=""  value={paraSegundos(formatarTempo(Number( audioRef.current?.currentTime)))} max={paraSegundos(formatarTempo(Number(audioRef.current?.duration)))} id="" />
            <br />
        <span>duracao: {formatarTempo(Number( audioRef.current?.duration))}</span>
        <div className='n'>

        <button>⏮</button>
        <button onClick={mechernosom}>{tocando ? "⏸" : "▶"}</button>
        <button>⏭</button>
        </div>
    </div>
</main>
    </>
    )
}