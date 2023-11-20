import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Pages/HomePage/HomePage'
import Login from './Pages/Authentication/Login';
import Error from './Pages/Error';
import Layout from './Pages/Layout';
import SignUp from './Pages/Authentication/SignUp';
import Search from './Pages/Search/Search';
import './App.css';
import Sidebar from './Pages/Sidebar/Sidebar.jsx';



function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path='/' >
          <Route index element={<HomePage />} />
          <Route path='login' element={<Login  ></Login>} />
          <Route path='signup' element={<SignUp ></SignUp>} />
          <Route path='search' element={<Search ></Search>} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
    //<Sidebar/>
  );
}

export default App;
