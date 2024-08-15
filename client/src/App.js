import './App.css';
import AllRoutes from "./component/AllRoutes";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Internet Of Things';
  }, [])
  return (
    <AllRoutes/>
  );
}

export default App;
