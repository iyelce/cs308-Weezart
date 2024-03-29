import { useEffect, useState } from "react";
import RecommendationPopularApi from "../../API/RecommendationPopularApi";

// import RecommendationHotApi from "../../API/RecommendationHotApi";

import RecommendationFriendApi from "../../API/RecommendationFriend";
import SongInfoPopup from "../Popups/SongInfoPopup";
import RecommendationGenreArtistApi from "../../API/RecommendationGenreArtistApi";
import RecomReleaseDateApi from "../../API/RecomReleaseDateApi";

const Recommendations = ({ ...props }) => {
  const [recommendationsPopular, setRecommendationsPopular] = useState([]);
  // const [recommendationsHot, setRecommendationsHot] = useState([]);
  const [recommendationsFriend, setRecommendationsFriend] = useState("no-song");
  const [recommendationsFriendName, setRecommendationsFriendName] = useState("");
  const [selectedSongInfo, setSelectedSongInfo] = useState(null);

  const [artistRecom, setArtistRecom] = useState("no-song");
  const [albumRecom, setAlbumRecom] = useState("no-song");



  const popularFetch = async () => {
    const response = await RecommendationPopularApi(props.token);
    setRecommendationsPopular(response);
  }

  const friendFetch = async () => {
    const responseFriend = await RecommendationFriendApi(props.token, props.userId);
    setRecommendationsFriend(responseFriend);
    setRecommendationsFriendName(responseFriend?.friendName);
  }

  const artistFetch = async () => {
    const responseArtist = await RecommendationGenreArtistApi(props.token, props.userId);
    setArtistRecom(responseArtist);
  }

  const albumFetch = async () => {
    const responseAlbum = await RecomReleaseDateApi(props.token, props.userId);
    setAlbumRecom(responseAlbum);
  }

  useEffect(() => {
    popularFetch();
  }, [props.userId, props.token]);

  useEffect(() => {
    friendFetch();
  }, [props.userId, props.token]);

  useEffect(() => {
    artistFetch();
  }, [props.userId, props.token]);

  useEffect(() => {
    albumFetch();
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

  const recommendationRenderArtist = (arr) => {

    // followerCount:36625984
    // genres:['pop', 'r&b']
    // id:"6vWDO969PvNqNYHIOW5v0m"
    // imageUrl:"https://i.scdn.co/image/ab6761610000e5eb12e3f20d05a8d6cfde988715"
    // name:"Beyoncé"
    
    let recommendationsRender = [];
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        recommendationsRender.push(
          <div
            className="item"
            key={arr[i].id} // Add a unique key for each recommendation item
            // onClick={() => openSongInfoPopup(arr[i])}
          >
            <img src={arr[i].imageUrl === null ? "https://i.pinimg.com/564x/47/99/fd/4799fdb80098968bf6ff4c311eed1110.jpg" : arr[i].imageUrl} />
            <div className="play"></div>
            <h4>{arr[i].name}</h4>
            <p>Followers: {arr[i].followerCount}</p>
          </div>
        );
      }
    }
    return recommendationsRender;
  };

  const recommendationRenderAlbum = (arr) => {

// artistsId:['5sBBS3CQNPDzmuTJjYwnpa']
// artistsName:['Cloudy June']
// id:"1Hefm7MGT5MeV0bvdDjZHc"
// imageUrl:"https://i.scdn.co/image/ab67616d0000b273d9bbdcc5ae06f9ab4bb6ace6"
// name:"Red Flag"
// numberOfTracks: 1
// releaseDate:"2023-10-13"
   
    let recommendationsRender = [];
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        recommendationsRender.push(
          <div
            className="item"
            key={arr[i].id} // Add a unique key for each recommendation item
            // onClick={() => openSongInfoPopup(arr[i])}
          >
            <img src={arr[i].imageUrl === null ? "https://i.pinimg.com/564x/47/99/fd/4799fdb80098968bf6ff4c311eed1110.jpg" : arr[i].imageUrl} />
            <div className="play"></div>
            <h4>{arr[i].name}</h4>
            <p>{arr[i].artistsName.join(", ")}</p>
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

        {/* <p>Latest in Weezart</p>
        <div className="row">
          <div className="list">{recommendationRender(recommendationsHot)}</div>
        </div> */}

        

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

        {artistRecom === "no-song" ? (
        <div>
            {/* Render empty div or any alternative content */}
          </div>
        ) : (
          <div>
          <p>Artists You May Like </p>
          <div className="row">
            <div className="list">{recommendationRenderArtist(artistRecom)}</div>
          </div>
          </div>
        )}

      {albumRecom === "no-song" ? (
        <div>
            {/* Render empty div or any alternative content */}
          </div>
        ) : (
          <div>
          <p>Albums You May Like </p>
          <div className="row">
            <div className="list">{recommendationRenderAlbum(albumRecom)}</div>
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
