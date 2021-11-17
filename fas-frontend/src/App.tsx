import React, { useState } from 'react';
import Chats from './components/chat'

function App() {
  const [info, setInfo] = useState("hksvwy")
  return (
    <div className="popup">
      <Chats info={info}/>

    </div>
  );
}

export default App;
