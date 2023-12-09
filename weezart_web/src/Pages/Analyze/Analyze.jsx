import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs, { Dayjs } from 'dayjs';
import {useState,useEffect} from "react";
import {Box,Typography} from '@mui/material';
import StatBox from './Statbox';
import { useTheme } from '@mui/material/styles';
import { tokens } from './theme';
import Select from 'react-select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AnalyzeApi from '../../API/AnalyzeApi';
import AnalyzeChartApi from '../../API/AnalyzeChartApi';



function isDateBeforeToday(date) {
  return date >= new Date();
}



 function Analyze({...props}) {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [analyzeType,setType]=useState("song");
  const [dateFilter,setDate]=useState('2023-01-01');

  //const response=AnalyzeApi(props.token,props.userId).then((response)=>{setData(response)}).catch((error)=>{console.log(error)});

  const fetchDataMetrics = async () => {
    try {
      const response = await AnalyzeApi(props.token,props.userId,analyzeType,dateFilter);
      console.log("+++ response return in page: ", response)
      setData(response);
      const responseChart = await AnalyzeChartApi(props.token,props.userId,analyzeType);
      console.log("+++ response return in page CHARTSS: ", responseChart)
      setChartData(responseChart);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  
  useEffect(() => {
    fetchDataMetrics();
  }, [props.token,props.userId,analyzeType,dateFilter]);

  


  const options=[
    {value:"song",label:"Song"},
    {value:"album",label:"Album"},
    {value:"artist",label:"Artist"}
  ];

  const styles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "4px",
      height:"50px"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      height:"100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3B0944" : "#ffffff",
      color: state.isSelected ? "white" : "#999999",
    }),
  };
  return (
    <div >
    <Box display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(24, 1fr)"
        gap="10px"
        height="100vh">
        <Box
        gridColumn="span 12"
        gridRow="span 1"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        paddingTop="10px"
        paddingLeft="10px"

        

        >
          
        <Box
          gridColumn="span 2"
          height="100%"
          padding="0">
          <Select options={options} defaultValue={{label:"Song",value:"song"}} styles={styles} onChange={(e)=>{setType(e.value)}}/>

   
          </Box>
          <Box
          gridColumn="span 3:5"
          marginLeft="100px"
          height="100%"
          padding="0">
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{height:"100%",
    padding:"0"}}>
      <DemoContainer components={['DatePicker']} sx={{height:"100%",
    padding:"0"}}>
        <DatePicker label="From" shouldDisableDate={isDateBeforeToday} defaultValue={dayjs('2023-01-01')} onChange={(e)=>setDate(e.toISOString().split('T')[0])} sx={{
          backgroundColor:"white",
          paddingTop:"0",
          marginTop:"0",
          marginRight:"100px",
          borderRadius:"4px",
          height:"50px",
          "& .Mui-focused": {
            color: "purple",


 // Change the color to purple on focus
          }
        }}/>
      </DemoContainer>
    </LocalizationProvider>
    

            </Box>
        </Box>
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={"#"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop="10px"
      

        >
          <StatBox
            title={data===undefined?"0":data[0]}
            subtitle="Added"
            progress="0.75"
            increase="+14%"
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={"#"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop="10px"
      
        >
          <StatBox
            title={data===undefined?"0":data[1]}
            subtitle="Liked"
            progress="0.50"
            increase="-21%"
            
              />
            
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={"#120719"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop="10px"
      
        >
          <StatBox
            title={data===undefined?"0":data[2]}
            subtitle="Rated"
            progress="0.30"
            increase="+5%"
              />
            
        
        </Box>
        
        <Box
          gridColumn="span 12"
          gridRow="span 6"
          backgroundColor={"#120719"}
          
         
        >
            <Typography fontSize={"20px"} >Adds</Typography>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10]  }]}
                series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            color:"#39FF14"
                        },
                        ]}
                        sx={{"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                            fill:"#332FD0",
                            fontSize:"3rem"
                           },
                           // change all labels fontFamily shown on both xAxis and yAxis
                           "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                               fontFamily: "Roboto",
                                 fontSize:"20px"
                            },
                            // change bottom label styles
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                                strokeWidth:"0.5",
                                fill:"#6528F7"
                             },
                              // bottomAxis Line Styles
                             "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                              stroke:"#6528F7",
                              strokeWidth:0.4
                             },
                             // leftAxis Line Styles
                             "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                              stroke:"#AED2FF",
                              strokeWidth:0.4
                             }}}
                             />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 6"
          backgroundColor={"#"}
        >
            <Typography fontSize={"20px"} color={"red"}>Likes</Typography>

            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10]  }]}
                series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            color:"#FF3131"
                        },
                        ]}
                        sx={{"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                            fill:"#332FD0",
                            fontSize:"3rem"
                           },
                           // change all labels fontFamily shown on both xAxis and yAxis
                           "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                               fontFamily: "Roboto",
                                 fontSize:"20px"
                            },
                            // change bottom label styles
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                                strokeWidth:"0.5",
                                fill:"#6528F7"
                             },
                              // bottomAxis Line Styles
                             "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                              stroke:"#6528F7",
                              strokeWidth:0.4
                             },
                             // leftAxis Line Styles
                             "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                              stroke:"#AED2FF",
                              strokeWidth:0.4
                             }}}
                             />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 6"
          backgroundColor={"#"}
       
        >
            <Typography fontSize={"20px"} color={"red"}>Rates</Typography>
            <LineChart
                margin={{ bottom: 40}}
                xAxis={[{ data: [1, 2, 3, 5, 8, 10]  }]}
                series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            color:"#FFF01F"

                        },

                        ]}
                        sx={{"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                            fill:"#332FD0",
                            fontSize:"3rem"
                           },
                           '& .MuiLineElement-root': {
                            strokeWidth: 2,
                          },
                           // change all labels fontFamily shown on both xAxis and yAxis
                           "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                               fontFamily: "Roboto",
                                 fontSize:"20px"
                            },
                            // change bottom label styles
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                                strokeWidth:"0.5",
                                fill:"#6528F7"
                             },
                              // bottomAxis Line Styles
                             "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                              stroke:"#6528F7",
                              strokeWidth:0.4
                             },
                             // leftAxis Line Styles
                             "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                              stroke:"#AED2FF",
                              strokeWidth:0.4
                             }}}
                             />
        </Box>
        


        </Box>
  </div>
  );
}

export default Analyze;