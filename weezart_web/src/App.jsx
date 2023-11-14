
import Login from './Pages/Authentication/Login';
import SignUp from "./Pages/Authentication/SignUp";
import Search from './Pages/Search/Search';
import HomePage from './Pages/HomePage/HomePage';


function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      {/* <SignUp/>  */}
      <HomePage/>
       {/* <Search/> */}
    </div>
  );
}


export default App;


// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import HomePage from './Pages/HomePage/HomePage';
// import Layout from './Pages/Layout';
// import Search from './Pages/Search/Search';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/search" element={<Search />} />
//       </Routes>
//     </BrowserRouter>
//   );

// };

// export default App;

