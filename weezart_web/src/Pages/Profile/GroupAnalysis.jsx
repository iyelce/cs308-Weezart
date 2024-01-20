import React from 'react';
import { useEffect, useState } from 'react';
import GroupAnalysisApi from '../../API/GroupAnalysisApi';
import { useParams } from "react-router-dom";
import { Leaderboard } from '@propeldata/react-leaderboard'







const GroupAnalysis= ({...props}) => {

    const {id} =useParams();



    const [userFormation, setUserFormation] = useState([]);
    const [apiResult, setApiResult] = useState();

    function userSetter(apiResult) {
        let userArray = [];
        let length_users = apiResult?.addList.length;
      
        for (let i = 0; i < length_users; i++) {
          userArray.push({
            add_cnt: apiResult?.addList[i],
            like_cnt: apiResult?.likeList[i],
            rated_cnt: apiResult?.avgList[i],
            user: apiResult?.userList[i],
          });
          console.log("userArray in page: ", userArray);
        }
      
        setUserFormation(userArray);
      }
      
      const fetchData = async () => {
        try {
          const response = await GroupAnalysisApi(props.token, id);
          console.log("response in page: ", response);
          setApiResult(response);
          userSetter(response);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, [props.token, props.userId]);
      
   
    const queryOptions = {
        metric: 'addList',
       
        rowLimit: 10,
        dimensions: [
          {
            columnName: 'addList'
          }
        ]
      }
       

    return( 
    <div>
        <h1>Group Analysis</h1>
        <Leaderboard query={queryOptions} />
    </div>)






}

export default GroupAnalysis;