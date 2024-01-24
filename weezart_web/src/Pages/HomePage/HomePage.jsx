import React, { useState,useEffect } from 'react';
import Recommendations from './Recommendations';





const HomePage = ({...props}) => {
 

  return (
    
    <div className="homepage">

    
      <div className="homepage-content">
       

        <div className='homepage-recommendations'> 
          
          
          <div className="recommendations-body">
            
            <Recommendations token={props.token} userId={props.userId} />

          </div>

        </div>
        
      </div>

    </div>
  );
}


export default HomePage;
