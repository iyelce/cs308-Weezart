import { useEffect, useState } from "react";
import RecommendationPopularApi from "../../API/RecommendationPopularApi";
import RecommendationHotApi from "../../API/RecommendationHotApi";
import RecommendationFriendApi from "../../API/RecommendationFriend";
import SongInfoPopup from "../Popups/SongInfoPopup";

const Recommendations = ({ ...props }) => {
  const [recommendationsPopular, setRecommendationsPopular] = useState([]);
  const [recommendationsHot, setRecommendationsHot] = useState([]);
  const [recommendationsFriend, setRecommendationsFriend] = useState("no-song");
  const [recommendationsFriendName, setRecommendationsFriendName] = useState("");
  const [selectedSongInfo, setSelectedSongInfo] = useState(null);

  const fetchRecommendations = async () => {
    const response = await RecommendationPopularApi(props.token);
    setRecommendationsPopular(response);
    const responseHot = await RecommendationHotApi(props.token, props.userId);
    setRecommendationsHot(responseHot);
    const responseFriend = await RecommendationFriendApi(props.token, props.userId);
    setRecommendationsFriend(responseFriend);
    setRecommendationsFriendName(responseFriend?.friendName);
  };

  useEffect(() => {
    fetchRecommendations();
  }, [props.userId, props.token]);

  const openSongInfoPopup = (songInfo) => {
    setSelectedSongInfo(songInfo);
  };

  const recommendationRender = (arr) => {
    let recommendationsRender = [];
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        recommendationsRender.push(
          <div
            className="item"
            key={arr[i].id} // Add a unique key for each recommendation item
            onClick={() => openSongInfoPopup(arr[i])}
          >
            <img src={arr[i].albumImageURL === null ? "https://i.pinimg.com/564x/47/99/fd/4799fdb80098968bf6ff4c311eed1110.jpg" : arr[i].albumImageURL} />
            <div className="play"></div>
            <h4>{arr[i].name}</h4>
            <p>{arr[i].artistsName}</p>
          </div>
        );
      }
    }
    return recommendationsRender;
  };

  return (
    <div className="recommendations-body">
      <div className="homepage-recom-content">
        <p> Most Populars</p>
        <div className="row">
          <div className="list">{recommendationRender(recommendationsPopular)}</div>
        </div>

        <p>Latest in Weezart</p>
        <div className="row">
          <div className="list">{recommendationRender(recommendationsHot)}</div>
        </div>

        

        {recommendationsFriend === "no-song" ? (
        <div>
            {/* Render empty div or any alternative content */}
          </div>
        ) : (
          <div>
          <p>According to friend {recommendationsFriendName}</p>
          <div className="row">
            <div className="list">{recommendationRender(recommendationsFriend?.friendSongs)}</div>
          </div>
          </div>
        )}




      </div>

      {selectedSongInfo && (
        <SongInfoPopup
          isOpen={true}
          onRequestClose={() => setSelectedSongInfo(null)}
          songInfo={selectedSongInfo}
          liked={"check with api"}
          rating={"check with api"}
          token={props.token}
          userId={props.userId}
        />
      )}
    </div>
  );
};

export default Recommendations;
