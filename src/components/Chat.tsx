import '../App.css'
import { TitleBar } from "./TItlebar"
import { useEffect, useRef, useState } from 'react'
import { processo } from '../Ia/processo'


export const Chat = () => {
  const [mensagem, setMensagem] = useState("");
    const [mensagens, setMensagens] = useState([
    { texto: 'resenhax no clubex', autor: 'bot' }
  ]);
useEffect(() => {
    fimDoChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);
  const fimDoChatRef = useRef(null);
    const [resposta, setResposta] = useState("");

  const testarIA = async (texto: string) => {
    if (!texto.trim()) return;

    setMensagem("");
    setMensagens((prev) => [...prev, { texto, autor: 'user' }]);

    const resultado = await processo([
      { role: "user", content: texto }
    ]);

    setMensagens((prev) => [...prev, { texto: resultado, autor: 'bot' }]);
  };

    return (
        <>
        <TitleBar />
      <div className="container">
        <h1>CHat com o presidentexxxxxxx</h1>

        <div className="chat-box">
          {mensagens.map((msg, index) => (
            <div
              key={index}
              className={`bolha ${msg.autor === 'user' ? 'bolha-user' : 'bolha-bot'}`}
            >
              {msg.texto}
            </div>
          ))}
          <div ref={fimDoChatRef} />
        </div>
      </div>

      <form
        className="guardain"
        onSubmit={(e) => {
          e.preventDefault();
          testarIA(mensagem);
        }}
      >
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="in"
          placeholder="Digite aiS"
        />
        <button type="submit" className="ab">ENviar</button>
      </form>
        </>
    )
}