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
import ShareIcon from '@mui/icons-material/Share';

import html2canvas from 'html2canvas';




function isDateBeforeToday(date) {
  return date >= new Date();
}



 function Analyze({...props}) {


  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(undefined);
  const [tableData, setTableData] = useState(undefined);
  const [tableData1, setTableData1] = useState(undefined);
  const [tableData2, setTableData2] = useState(undefined);
  const [tableData3, setTableData3] = useState(undefined);
  const [tableData4, setTableData4] = useState(undefined);
  const [chartDataBool, setChartDataBool] = useState(false);
  const [chart1xAxis, setChart1xAxis] = useState([0]);
  const [chart2xAxis, setChart2xAxis] = useState([0]);
  const [chart3xAxis, setChart3xAxis] = useState([0]);

  const [analyzeType,setType]=useState("song");
  const [dateFilter,setDate]=useState('2023-01-01');

  //--------------------------------------

  const handleShareClick = () => {
    const elementToCapture = document.getElementById('analysis-to-capture');

    if (elementToCapture) {
      html2canvas(elementToCapture).then((canvas) => {
        // Convert canvas to PNG image data
        const imageData = canvas.toDataURL('image/png');

        // Now you can save or share the image data as needed
        shareImage(imageData);
      });
    }
  };


  const shareImage = (imageData) => {
    // Create a link element
    const downloadLink = document.createElement('a');
  
    // Set the href attribute to the image data
    downloadLink.href = imageData;
  
    // Set the download attribute to specify the filename
    downloadLink.download = 'myWeezartAnalysis.png';
  
    // Append the link to the document body
    document.body.appendChild(downloadLink);
  
    // Trigger a click on the link to initiate the download
    downloadLink.click();
  
    // Remove the link from the document
    document.body.removeChild(downloadLink);
  };
  


  //-----------------------------------------

  function sortArraysTogether(arrA, arrB) {
    const combinedArray = arrA.map((date, index) => ({ date, value: arrB[index] }));

    // Custom comparator function for sorting based on dates
    const compareDates = (a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    };
    
    // Sort the combined array based on dates
    combinedArray.sort(compareDates);
    
    // Extract the sorted values array
    const sortedValuesArray = combinedArray.map(item => item.value);
    
    console.log("Sorted Dates Array:", combinedArray.map(item => item.date));
    console.log("Sorted Values Array:", sortedValuesArray);
    return [combinedArray.map(item => item.date),sortedValuesArray];
  }

    

  function tableRender(arr){
    let table = [];
    if(arr!==undefined){
    for(let i=0; i<arr.length; i++) {
        table.push(
        <div class="item"  >
        <img src={analyzeType=="song"?(arr[i].albumImageURL===undefined?"":arr[i].albumImageURL):(arr[i].imageUrl)} />
        <div class="play">
        </div>
        <h4>{arr[i].name}</h4>
        <p>{analyzeType=="artist"?arr[i].name:arr[i].artistsName.join(', ')}</p>
        </div>);
    }
}
    return table;
}

const fetchChartMetrics = async () => {
  try {
    setChartDataBool(false);
    const response = await AnalyzeChartApi(props.token,props.userId,analyzeType);
    setChartData(response);
    if(response.length>0){
    setChartDataBool(true);
    console.log("DEBUG!!!!!!",Object.keys(response[1]).length==0);
    if(Object.keys(response[0]).length>0){
      let temp=sortArraysTogether(Object.keys(response[0]),Object.values(response[0]));
      console.log("SORTING!!!! ",temp[0]);
    setChart1xAxis(temp[0]);
    }
    if(Object.keys(response[1]).length>0){
    let temp1=sortArraysTogether(Object.keys(response[1]),Object.values(response[1]));
    setChart2xAxis(temp1[0]);
    }
    if(Object.keys(response[2]).length>0){
    let temp2=sortArraysTogether(Object.keys(response[2]),Object.values(response[2]));
    setChart3xAxis(temp2[0]);
    }
    
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
    console.log("TABLE CHECK!!!!");
    setTableData2(response[1]);
    setTableData3(response[2]);
    setTableData4(response[3]);
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
  }, [props.token,props.userId,analyzeType,dateFilter]);

  useEffect(() => {
    fetchChartMetrics();
  }, [props.token,props.userId,analyzeType]);

  useEffect(() => {
    fetchTableMetrics();
  }, [props.token,props.userId,analyzeType]);


  const options=[
    {value:"song",label:"Song"},
    {value:"album",label:"Album"},
    {value:"artist",label:"Artist"}
  ];

  const styles = {
    control: (provided) => ({
      ...provided,
 
      height:"50px"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3B0944" : "#ffffff",
      color: state.isSelected ? "white" : "black",
    }),
  };
  return (
    <div  id="analysis-to-capture"   >

    <Box display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(24, 1fr)"
        gap="10px"
        height="140vh">
        <Box
        gridColumn="span 12"
        gridRow="span 1"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(1, 1fr)"
        paddingTop="10px"
        paddingLeft="10px"
        >
          
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          height="100%"
          padding="0">
          <Select options={options} styles={styles} defaultValue={{label:"Song",value:"song"}}  onChange={(e)=>{setType(e.value)}}/>

   
          </Box>
          <Box
            gridColumn={"9/span 1"}
            display={"flex"}
            justifyContent={"end"}
            marginRight={"20px"}
            height={"30px"}
            onClick={handleShareClick}
            >

            <ShareIcon sx={{color:"white",marginTop:"10px",marginLeft:"10px",height:"30px", top:"0"}}/>
            </Box>
          <Box
          gridColumn="10/span 3"
          gridRow="span 1"

          height="100%"
          padding="0"
          display="flex"
>
             <Typography color={"white"} display="flex"justifyContent="center" alignItems="center" marginRight="20px">FROM</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{height:"100%",
    padding:"0"}}>
      <DemoContainer components={['DatePicker']} sx={{height:"100%",
    padding:"0"}}>
        <DatePicker  shouldDisableDate={isDateBeforeToday} defaultValue={dayjs('2023-01-01')} onChange={(e)=>{setDate(e.toISOString().split('T')[0]);}} sx={{
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
            increase=""
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
            increase=""
            
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
            increase=""
              />
            
        
        </Box>
        
        <Box
          gridColumn="span 12"
          gridRow="span 6"
          backgroundColor={"#120719"}
          
         
        >
            <Typography marginLeft="20px" fontSize={"20px"} color={"orange"} >Daily Adds</Typography>
            <LineChart
                xAxis={[{ scaleType:'band',data: (chartDataBool?chart1xAxis:[0])  }]}
                series={[
                        {
                            data: (chartDataBool&&Object.values(chartData[0]).length>0?Object.values(chartData[0]):[0]),
                            color:"purple"
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
            <Typography marginLeft="20px" fontSize={"20px"} color={"orange"}>Daily Likes</Typography>

            <LineChart
                xAxis={[{scaleType:'band', data: (chartDataBool?chart2xAxis:[0])   }]}
                series={[
                        {
                            data: (chartDataBool&&Object.values(chartData[1]).length>0?Object.values(chartData[1]):[0]),
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
            <Typography marginLeft="20px" fontSize={"20px"} color={"orange"}>Daily Average Rating</Typography>
            <LineChart
                margin={{ bottom: 40}}
                xAxis={[{ scaleType:'band',data: (chartDataBool?chart3xAxis:[0])  }]}
                series={[
                        {
                            data: (chartDataBool&&Object.values(chartData[2]).length>0?Object.values(chartData[2]):[0]),
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
<Typography marginLeft="20px" marginBottom={"20px"} fontSize={"20px"} color={"orange"} display={tableData1===undefined?"none":"flex"}>Top Rated {analyzeType[0].toUpperCase()+analyzeType.substring(1)+'s'}</Typography>
      <div className="list">

        {tableRender(tableData1)}
      </div>
<Typography marginLeft="20px" marginBottom={"20px"} marginTop={"20px"} fontSize={"20px"} color={"orange"} visibility={tableData2===undefined?"hidden":""}>Last Liked   {analyzeType[0].toUpperCase()+analyzeType.substring(1)+'s'}</Typography>
      <div className="list">

        {tableRender(tableData2)}
      </div>
<Typography marginLeft="20px" marginBottom={"20px"} marginTop={"20px"} fontSize={"20px"} color={"orange"} display={tableData3===undefined?"none":""}>Top Rated {analyzeType[0].toUpperCase()+analyzeType.substring(1)+'s'} From Pop Genre  </Typography>
      <div className="list">
          
          {tableRender(tableData3)}
      </div>
      <Typography marginLeft="20px" marginBottom={"20px"} marginTop={"20px"} fontSize={"20px"} color={"orange"} display={tableData4===undefined?"none":""}>Top Rated {analyzeType[0].toUpperCase()+analyzeType.substring(1)+'s'} From 2010's </Typography>
      <div className="list">
          
          {tableRender(tableData4)}
      </div>
</Box>


        </Box>
  </div>
  );
}

export default Analyze;