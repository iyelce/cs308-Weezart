import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {Box,Typography} from '@mui/material';
import StatBox from './Statbox';
import { useTheme } from '@mui/material/styles';
import { tokens } from './theme';



export default function Analyze() {
  return (
    <div >
    <Box display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={"#"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="-21%"
            
              />
            
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={"#120719"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
              />
            
        
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={"#120719"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            
              />
            
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 2"
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
          gridRow="span 2"
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
          gridRow="span 2"
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