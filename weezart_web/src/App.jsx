import logo from './logo.svg';
import './App.css';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Signup/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
