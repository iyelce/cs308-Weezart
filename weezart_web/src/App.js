import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './Pages/HomePage/HomePage'
import Login from './Pages/Authentication/Login';
import Error from './Pages/Error';
import Layout from './Pages/Layout';
import SignUp from './Pages/Authentication/SignUp';
import Search from './Pages/Search/Search';
import './App.css';
import Sidebar from './Pages/Sidebar/Sidebar.jsx';



function App() {

  //token check fokisyou gelirse useeffect ile ilk önce localde tuttuğumuz tokeni check edip 
  //doğruysa username id çekip isloggedin true yapabiliriz

  useEffect(() => {

    const storedToken = localStorage.getItem('token');

    if(storedToken !== null) {

      setToken(storedToken);

      //hepsini aynı fonksiyonda set ettiğimiz için böyle alınca problem olmaz ama yine kontrol edebiliriz if içinde
      setUsername(localStorage.getItem('username')); 
      setUserId(localStorage.getItem('userId'));
    }           
  }, []); // [] sayfa ilk renderlandığında 1 defa çalışması için


  //to store user data
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  // boolean login check
  const [isLoggedin, setIsLoggedin] = useState(false);
 
  //to be able to change user data from signup and login pages
  const changeUserInfo = (username, userId) => {
    setUsername(username);
    setUserId(userId);
    setIsLoggedin(true); // if this function is called from pages then the login was successful

    //token check fonksiyonu olmadığı için her girişte tutuyor ve logout olana kadar kalıyor
    //token check fonksiyonu olusa bu useeffect içine de girmeli
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
  };

  //to set token in the login page
  const storeToken = (e) => {
      localStorage.setItem('token', e); //to keep it in page rendering
      setToken(e);                      //to pass it to the other pages as props
  };

  //token chack api si olmadığı için o kısmı eklemedim ama sonradan alınan tokenleri burada check edip ona göre
  // yanlış ya da geçersiz tokense username id "" , is loggedin false yapabilriiz


  return (
    <BrowserRouter>

      <Layout username= {username} isLoggedin={isLoggedin} userId={userId}/>
      
      <Routes>
        <Route path='/' >

          {/* localhost:3000 starts from login page */}
          <Route index element={ <Login 
            changeUserInfo = {changeUserInfo}
            storeToken = {storeToken}
            /> } /> 

          <Route path='home' element={<HomePage />} />

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
