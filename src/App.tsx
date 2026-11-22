
import "./App.css";
import { Chat } from "./components/Chat";
import { Base } from "./components/Base";
import { Select } from "./components/Select";
import { Music } from "./components/Music";
import  RandomStar from "./components/RandomStar";
function App() {
const params = new URLSearchParams(
  window.location.search
)
 
const view = params.get('view')
if (view === 'music'){
  return <Music/>
}
if(view === 'star'){
  return <RandomStar/>
}
if(view === "select"){
  return <Select/>
}
if(view === "chat"){
  return <Chat/>
}
return <Base/>
}
export default App;
