import React from 'react';
import { useEffect, useState } from 'react';
import GroupAnalysisApi from '../../API/GroupAnalysisApi';
import { useParams } from "react-router-dom";
import { BarChart } from '@mui/x-charts/BarChart';








const GroupAnalysis= ({...props}) => {

    const {id} =useParams();



    const [userFormation, setUserFormation] = useState([]);
    const [apiResult, setApiResult] = useState();
    const[userNamesChart,setUsernamesChart]=useState();
    const[addsChart,setAddsChart]=useState([{'username':'user1','value':[10]},{username:'user2',value:[10]},{'username':'user3','value':[10]}]);
    const[likesChart,setLikesChart]=useState([{username:'user1',value:[10]},{username:'user2',value:[10]},{'username':'user3','value':[10]}]);
    const[ratingsChart,setRatingsChart]=useState([{username:'user1',value:[10]},{username:'user2',value:[10]},{'username':'user3','value':[10]}]);

    function userSetter(apiResult) {
        let userArray = [];
        let userNames = [];
        let adds = [];
        let likes = [];
        let ratings = [];
        let length_users = apiResult?.addList.length;
        if(length_users>0){
        for (let i = 0; i < length_users; i++) {
          userArray.push({
            add_cnt: apiResult?.addList[i],
            like_cnt: apiResult?.likeList[i],
            rated_cnt: apiResult?.avgList[i],
            user: apiResult?.userList[i],
          });
          userNames.push(userArray[i].user.username);
        adds.push({'username':userArray[i].user.username,'value':[userArray[i].add_cnt]});
        likes.push({'username':userArray[i].user.username,'value':[userArray[i].like_cnt]});
        ratings.push({'username':userArray[i].user.username,'value':[userArray[i].rated_cnt]});

        }
      
        setUserFormation(userArray);
        setUsernamesChart(userNames);
        setAddsChart(adds);
        setLikesChart(likes);
        setRatingsChart(ratings);
    }
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
      

       
    return( 
        <div>
            <h1 style={{color:'purple'}}>Group Analysis</h1>
    <div>
        <h1 style={{textAlign:'center',color:'white'}}>Adds</h1>
        <BarChart
        dataset={addsChart}
      xAxis={[{ scaleType: 'band', dataKey: 'username' }]}
      series={[{dataKey: 'value', color:'purple'}]}
      sx={{ "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
        fill:"#332FD0",
        fontSize:"3rem"
       },"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
        strokeWidth:"0.5",
        fill:"#6528F7"
     }, "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
        stroke:"#6528F7",
        strokeWidth:0.4
       },
       // leftAxis Line Styles
       "& .MuiChartsAxis-left .MuiChartsAxis-line":{
        stroke:"#AED2FF",
        fill:"#AED2FF",
        strokeWidth:0.4
       }}}
      width={1000}
      height={300}

    />
    </div>


    <div>
        <h1 style={{color:'white',textAlign:'center'}}>Likes</h1>
        <BarChart
        dataset={likesChart}
      xAxis={[{ scaleType: 'band', dataKey: 'username' }]}
      series={[{dataKey: 'value', color:'#FF3131'}]}
      sx={{ "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
        fill:"#332FD0",
        fontSize:"3rem"
       },"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
        strokeWidth:"0.5",
        fill:"#6528F7"
     }, "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
        stroke:"#6528F7",
        strokeWidth:0.4
       },
       // leftAxis Line Styles
       "& .MuiChartsAxis-left .MuiChartsAxis-line":{
        stroke:"#AED2FF",
        fill:"#AED2FF",
        strokeWidth:0.4
       }}}
      width={1000}
      height={300}

    />
    </div>


    <div >
        <h1 style={{textAlign:'center',color:'white'}}>Ratings</h1>
        <BarChart
        dataset={ratingsChart}
      xAxis={[{ scaleType: 'band', dataKey: 'username' }]}
      series={[{dataKey: 'value',color:'#FFF01F'}]}
      sx={{ "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
        fill:"#332FD0",
        fontSize:"3rem"
       },"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
        strokeWidth:"0.5",
        fill:"#6528F7"
     }, "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
        stroke:"#6528F7",
        strokeWidth:0.4
       },
       // leftAxis Line Styles
       "& .MuiChartsAxis-left .MuiChartsAxis-line":{
        stroke:"#AED2FF",
        fill:"#AED2FF",
        strokeWidth:0.4
       }}}
      width={1000}
      height={300}

    />
    </div>
    </div>
    
    
    )






}

export default GroupAnalysis;