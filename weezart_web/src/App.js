import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './Pages/HomePage/HomePage'
import Login from './Pages/Authentication/Login';
import Error from './Pages/Error';
import SignUp from './Pages/Authentication/SignUp';
import Search from './Pages/Search/Search';
import './App.css';
import Sidebar from './Pages/Sidebar/Sidebar.jsx';
import AddSong from './Pages/ImportFile/AddSong.jsx';
import Analyze from './Pages/Analyze/Analyze.jsx';
import AddUniqueSong from './Pages/ImportFile/AddUniqueSong.jsx';
import SongFileUpload from './Pages/ImportFile/SongFileUpload.jsx';
import MyProfile from './Pages/Profile/MyProfile.jsx';
import FollowersList from './Pages/Profile/FollowersList.jsx';
import FollowingList from './Pages/Profile/FollowingList.jsx';
import LikedSongsList from './Pages/Lists/LikedSongsList.jsx';
import LikedArtistsList from './Pages/Lists/LikedArtists.jsx';
import LikedAlbumsList from './Pages/Lists/LikedAlbumsList.jsx';
import AddFriend from './Pages/AddFriend/AddFriend.jsx';
import ExportPage from './Pages/ImportFile/ExportFile.jsx';
import CloudImport from './Pages/ImportFile/CloudImport.jsx';



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
      setIsLoggedin(localStorage.getItem('isLoggedin'));

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
    localStorage.setItem('isLoggedin', true);
  };

  //to set token in the login page
  const storeToken = (e) => {
      localStorage.setItem('token', e); //to keep it in page rendering
      setToken(e);                      //to pass it to the other pages as props
  };

  const logoutFunc = () => {
    localStorage.removeItem('token');                      
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedin');

    setToken("");
    setUserId("");
    setUsername("");
    setIsLoggedin(false);
};

  //token chack api si olmadığı için o kısmı eklemedim ama sonradan alınan tokenleri burada check edip ona göre
  // yanlış ya da geçersiz tokense username id "" , is loggedin false yapabilriiz


  return (
    <BrowserRouter>

      <div style={{ display: isLoggedin ? 'flex' : 'block', height:"100%",display:"sticky" }}  >
        <Sidebar username={username} isLoggedin={isLoggedin} userId={userId} logoutFunc={logoutFunc} />

        <div style={{ flex: 1,  boxSizing: 'border-box' }}>
          <Routes>
            <Route path='/'>
              <Route index element={<Login changeUserInfo={changeUserInfo} storeToken={storeToken} />} />

              <Route path='home' element={<HomePage token={token} userId={userId}/>} />
              <Route path='signup' element={<SignUp />} />
              <Route path='addFriend' element={<AddFriend token={token} userId={userId} username={username}/>} />


              <Route path='search' element={<Search />} />

              <Route path='import' element={<AddSong token={token} userId = {userId} />} />
              <Route path = 'importUniqueSong' element={<AddUniqueSong token={token} userId={userId}/>}/>
              <Route path = 'songFileUpload' element={<SongFileUpload token={token} userId={userId}/>}/>
              <Route path = 'exportFile' element={<ExportPage token={token} userId={userId}/>}/>
              <Route path = 'cloudImport' element={<CloudImport token={token} userId={userId}/>}/>

              <Route path = 'myProfile' element={<MyProfile token={token} userId={userId}/>}/>
              <Route path = 'followers' element={<FollowersList token={token} userId={userId} username={username}/>}/>
              <Route path = 'following' element={<FollowingList token={token} userId={userId} username={username}/>}/>

              {/* farklı kullanıcılara girince nasıl yapmalıyız */}

              <Route path = 'likedSongs' element={<LikedSongsList token={token} userId={userId}/>}/>
              <Route path = 'likedArtists' element={<LikedArtistsList token={token} userId={userId}/>}/>
              <Route path = 'likedAlbums' element={<LikedAlbumsList token={token} userId={userId}/>}/>

              <Route path='analyze' element={<Analyze token={token} userId={userId}/>} />

              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;