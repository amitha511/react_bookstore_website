import { BrowserRouter} from 'react-router-dom';
import "./App.css";
import React,{useEffect,} from 'react';
import Background from './components/Background';
import RoutesComponent from './components/Routes';
import NavbarComponent from './components/Navbar';
import io from 'socket.io-client'; 

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <NavbarComponent></NavbarComponent>
        </header>
        <Background></Background>
        <main>
            <RoutesComponent></RoutesComponent>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
