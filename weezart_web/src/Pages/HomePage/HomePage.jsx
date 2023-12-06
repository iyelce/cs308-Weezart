import React, { useEffect } from 'react';
import Recommendations from './Recommendations';




const HomePage = () => {
  return (
    
    <div className="homepage">

    
      <div className="homepage-content">
       

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

    </div>
  );
}


export default HomePage;
