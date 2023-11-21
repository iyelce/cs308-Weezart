import React, { useEffect } from 'react';
import Recommendations from './Recommendations';




const HomePage = () => {
  return (
    
    <div className="homepage">

      <div className="homepage-sidebar">
        Sidebar
      </div>

      <div className="homepage-content">
        <div className="homepage-intro-img">
          <span>
            <img src='https://iastate.pressbooks.pub/app/uploads/sites/67/2022/11/Bach-Minuet-in-G-with-sentences.png' alt=''/>
          </span>
        </div>

        <div className='homepage-recommendations'> 
          <p >
            Recently added
          </p>

          <div className="homepage-recently-added">
            Added item list
          </div>

          <p >
            Recommendations for YOU
          </p>

          <div className="recommendations-body">
            
            <Recommendations/>

          </div>

        </div>
        
      </div>
      <div className="homepage-friend-activity">Friend Activity</div>
    </div>
  );
}


export default HomePage;
