
import { useEffect } from "react";
import { useState } from "react";


import RecommendationPopularApi from "../../API/RecommendationPopularApi";
import RecommendationHotApi from "../../API/RecommendationHotApi";
import RecommendationFriendApi from "../../API/RecommendationFriend";



const Recommendations = ({...props}) => {


    const [recommendationsPopular, setRecommendationsPopular] = useState([]);
    const [recommendationsHot, setRecommendationsHot] = useState([]);
    const [recommendationsFriend, setRecommendationsFriend] = useState([]);
    const [recommendationsFriendName, setRecommendationsFriendName] = useState("");
    

    const fetchRecommendations = async () => {
      const response = await RecommendationPopularApi(props.token );
      console.log("response", response);
      setRecommendationsPopular(response);
      const responseHot = await RecommendationHotApi(props.token,props.userId );
        console.log("responseHot", responseHot);
        setRecommendationsHot(responseHot);
        const responseFriend = await RecommendationFriendApi(props.token,props.userId );
        console.log("responseFriend", responseFriend);
        setRecommendationsFriend(responseFriend);
        setRecommendationsFriendName(responseFriend?.friendName);




    }
  
  useEffect(() => {
      fetchRecommendations();
      }, [props.userId, props.token]);
    
    function recommendationRender  (arr)  {
        let recommendationsPopularRender = [];
        if(arr!==undefined){
        for(let i=0; i<arr.length; i++) {
            recommendationsPopularRender.push(
            <div class="item" onClick={()=> {alert("clicked div")}}>
            <img src={arr[i].albumImageURL===null?"https://i.pinimg.com/564x/47/99/fd/4799fdb80098968bf6ff4c311eed1110.jpg":arr[i].albumImageURL} />
            <div class="play">
            </div>
            <h4>{arr[i].name}</h4>
            <p>{arr[i].artistsName}</p>
            </div>);
        }
    }
        return recommendationsPopularRender;
    }

  return (
    
 
    <div className="recommendations-body">
            

    <div className="homepage-recom-content">

        <p> Most Populars</p>

        <div className="row">

            <div className="list">
              
                {recommendationRender(recommendationsPopular)}
            </div>
        </div>

        <p>More of what you like</p>

     <div className="row">

            <div className="list">
                
            {recommendationRender(recommendationsHot)}
           
            
        </div>
        
    </div>

<p>According to friend {recommendationsFriendName}</p>
    <div className="row">

            <div className="list">
                
            {recommendationRender(recommendationsFriend?.friendSongs)}
           
            
        </div>
        
    </div>
      
    </div>
    
  








  </div>

  );
}


export default Recommendations;
