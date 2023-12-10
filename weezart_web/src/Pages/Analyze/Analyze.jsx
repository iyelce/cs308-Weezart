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
import AnalyzeTableApi from '../../API/AnalyzeTableApi';
import './Analyze.css';

import { ColorRing , Oval} from 'react-loader-spinner';




function isDateBeforeToday(date) {
  return date >= new Date();
}



 function Analyze({...props}) {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(undefined);
  const [tableData, setTableData] = useState(undefined);
  const [tableData1, setTableData1] = useState(undefined);
  const [tableData2, setTableData2] = useState(undefined);
  const [chartDataBool, setChartDataBool] = useState(false);
  const [chart1xAxis, setChart1xAxis] = useState([]);
  const [chart2xAxis, setChart2xAxis] = useState([]);
  const [chart3xAxis, setChart3xAxis] = useState([]);

  const [bgColor, setBgColor] = useState("#120719");

  const [analyzeType,setType]=useState("song");
  const [dateFilter,setDate]=useState('2023-01-01');

  function tableRender(arr){
    let table = [];
    if(arr!==undefined){
    for(let i=0; i<arr.length; i++) {
        table.push(
        <div class="item"  >
        <img src={arr[i].albumImageURL===null?"":arr[i].albumImageURL} />
        <div class="play">
        </div>
        <h4>{arr[i].name}</h4>
        <p>{arr[i].artistsName}</p>
        </div>);
    }
}
    return table;
}

const fetchChartMetrics = async () => {
  try {
    const response = await AnalyzeChartApi(props.token,props.userId,analyzeType);
    setChartData(response);
    if(response.length>0){
    setChartDataBool(true);
    setChart1xAxis(Object.keys(response[0]).map((key) => new Date(key)));
    setChart2xAxis(Object.keys(response[1]));
    setChart3xAxis(Object.keys(response[2]));
    }
}
   catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

const fetchTableMetrics = async () => {
  try {
    const response = await AnalyzeTableApi(props.token,props.userId,analyzeType);
    console.log("+++ response return in page TABLES: ", response)
    setTableData(response);
    if(response.length>0){
    setTableData1(response[0]);
    setTableData2(response[1]);
    }

  }
  catch(e){
    console.log(e);
  }
};


  const fetchDataMetrics = async () => {
    try {
      const response = await AnalyzeApi(props.token,props.userId,analyzeType,dateFilter);
      console.log("+++ response return in page: ", response)
      setData(response);
    }

     catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  
  useEffect(() => {
    fetchDataMetrics();
    fetchChartMetrics();
    fetchTableMetrics();
  }, [props.token,props.userId]);

  


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
      height:"100%",
      overflow:"auto"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3B0944" : "#ffffff",
      color: state.isSelected ? "white" : "#999999",
    }),
  };
  return (
    <div >


<Oval
  height={80}
  width={80}
  color="#451952"
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#FACBEA"
  strokeWidth={4} // Adjust the strokeWidth to make it thicker
  timeout={10000} // Adjust the timeout to control the animation speed (in milliseconds)
/>



    <Box display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(24, 1fr)"
        gap="10px"
        height="120vh">
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
          <Select options={options} defaultValue={{label:"Song",value:"song"}}  onChange={(e)=>{setType(e.value);fetchDataMetrics()}}/>

   
          </Box>
          <Box
          gridColumn="10/span 3"

          height="100%"
          padding="0"
          display="flex"
>
             <Typography color={"white"} display="flex"justifyContent="center" alignItems="center" marginRight="20px">FROM</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{height:"100%",
    padding:"0"}}>
      <DemoContainer components={['DatePicker']} sx={{height:"100%",
    padding:"0"}}>
        <DatePicker  shouldDisableDate={isDateBeforeToday} defaultValue={dayjs('2023-01-01')} onChange={(e)=>{setDate(e.toISOString().split('T')[0]);fetchDataMetrics()}} sx={{
          backgroundColor:"white",
          paddingTop:"0",
          marginTop:"0",
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
            <Typography marginLeft="20px" fontSize={"20px"} color={"orange"} >Adds</Typography>
            <LineChart
                xAxis={[{ scaleType:'band',data: (chartDataBool?chart1xAxis:[1,2,3])  }]}
                series={[
                        {
                            data: (chartDataBool?Object.values(chartData[0]):[1,2,3]),
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
            <Typography marginLeft="20px" fontSize={"20px"} color={"orange"}>Likes</Typography>

            <LineChart
                xAxis={[{scaleType:'band', data: (chartDataBool?chart2xAxis:[1,2,3])   }]}
                series={[
                        {
                            data: (chartDataBool?Object.values(chartData[1]):[1,2,3]),
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
            <Typography marginLeft="20px" fontSize={"20px"} color={"orange"}>Rates</Typography>
            <LineChart
                margin={{ bottom: 40}}
                xAxis={[{ scaleType:'band',data: (chartDataBool?chart3xAxis:[1,2,3])  }]}
                series={[
                        {
                            data: (chartDataBool?Object.values(chartData[2]):[1,2,3]),
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

        <Box
          gridColumn="span 12"
          gridRow="span 6"
          className="table-analyse"
          marginTop={"20px"}
>
<Typography marginLeft="20px" fontSize={"20px"} color={"orange"}>Top Rated {analyzeType[0].toUpperCase()+analyzeType.substring(1)+'s'}</Typography>
      <div className="list">

        {tableRender(tableData1)}
      </div>
<Typography marginLeft="20px" fontSize={"20px"} color={"orange"}>Last Added  {analyzeType[0].toUpperCase()+analyzeType.substring(1)+'s'}</Typography>
      <div className="list">

        {tableRender(tableData2)}
      </div>
</Box>


        </Box>
  </div>
  );
}

export default Analyze;