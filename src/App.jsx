import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./Join/Join";
import Chat from "./Chat/Chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Join /> } />
          <Route path="/chat" element={ <Chat /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
