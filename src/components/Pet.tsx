import donq from "../assets/aura.png"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import gif from '../assets/don-quixote.gif'
import lulad from '../assets/lulad.jpg'
import { useState, useEffect } from "react";
import cute from '../assets/981f150d3e45fd936e838286cde89473.jpg'
import { webviewWindow } from "@tauri-apps/api";

export const Pet = () => {
  const [ent, setEnt] = useState(false)
  let [temp, seTemp] = useState(0)
  useEffect(() => {
    let crono: ReturnType<typeof setInterval>;
    if(ent){
      crono = setInterval(() => {
        seTemp((temp) => temp + 3)
      }, 1000);
    }
    else {
      crono = setInterval(() => {
        seTemp((temp) => temp - 1)
      }, 1500);
    }
    return () => clearInterval(crono)
  }, [ent])

    const imagemAtual = ent
      ? "https://i.pinimg.com/736x/56/dd/70/56dd70c9ad25ead1ad07fca19dfce42a.jpg"
      : temp >10 ? 
        cute
        : temp < -10 ? 
        lulad
        :
        donq
        ;

const mitose = () => {
   const novaJanela = new WebviewWindow(
    `don-${Date.now()}`,
    {
      url: "index.html",
      title: "Don Quixote assist",
      width: 320,
      height: 420,

      alwaysOnTop: true,
      resizable: false,
    }
  );

  novaJanela.once("tauri://error", (event) => {
    console.error("Erro ao criar janela:", event);
  });
}
const abrirChat =() => {
  const chat = new WebviewWindow("janela-chat", {
     url: "index.html?view=chat",
    title: "Don's Music",
    width: 520,
    height: 650,
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
  })
    const estrela = new WebviewWindow(`estrela${Date.now()}`, {
    url: "index.html?view=star",
    title: "Estrela vermelha",
   width: 320,
    height: 450,
     alwaysOnTop: true,
    resizable: false,
    decorations: false,
  })
  chat.once("tauri://error", (error) => {
    console.error("Deu pau hein ", error);
    
  })
}

const abrirMusica = () => {
  const musica = new WebviewWindow("janela-musica", {
    url: "index.html?view=music",
    title: "Don's Music",
    width: 520,
    height: 250,
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
  });
  const estrela = new WebviewWindow(`estrela${Date.now()}`, {
    url: "index.html?view=star",
    title: "Estrela vermelha",
   width: 320,
    height: 450,
     alwaysOnTop: true,
    resizable: false,
    decorations: false,
  })
  
  musica.once("tauri://error", (error) => {
    console.error("Erro ao abrir música:", error);
  });
};
    return (
        <>
        
            <div className="don">
              <img className="pt" src="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/1280px-Red_star.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail" alt="" />
        <img id="img" onMouseEnter={() => {setEnt(true)}} onMouseLeave={() => {setEnt(false)}}  src={imagemAtual} alt="DOnquixote" />
      </div>
        <h2>{ent ? "Fazendo carinhoo.. " : temp > 10 ? "Feliz" : temp < -10 ? "Ódio" :  "Nada ainda"}</h2>
        <p>Pontos carinho:{temp}</p>
      <div className="action">
      
        <button onClick={mitose}>Mitose</button>
        <button onClick={abrirMusica}>Musgas</button>          
        <button onClick={abrirChat}>Chat
          </button>
      </div>
        </>
    )
}