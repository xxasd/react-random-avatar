import { useEffect } from 'react';
import './App.css';

import { mockAvatar } from './components/RandomAvatar/mock'

function App() {

  useEffect(() => {
    console.log(mockAvatar)
  }, [])

  return (
    <div className="App">
      123
    </div>
  );
}

export default App;
