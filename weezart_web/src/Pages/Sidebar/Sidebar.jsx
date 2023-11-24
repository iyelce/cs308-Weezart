import { useState } from "react";
import { Sidebar, Menu, MenuItem,SubMenu} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import InsightsIcon from '@mui/icons-material/Insights';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const LOGO = require('../../weezart-removebg-preview.png');


// username= {username} isLoggedin={isLoggedin} userId={userId} logoutFunc={logoutFunc}

const SideBar = ({...props}) => {

  const hideNavbar = !props.isLoggedin;

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
   <div hidden={hideNavbar}>
     <Container>
      <Box
        className="sideBar"
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <Sidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                  padding="0"
                  margin="0"
                >
                    <img src={LOGO} alt="" className="sidebar-logo" />
                  <Typography variant="h3" color={colors.grey[100]} fontSize={'30px'}>
                    Weezart
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}

                    sx={{ m: "10px 0 0 0" }}
                  >
                   {props.username}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Welcome
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>

              <MenuItem
                active={true}
                style={{
                  color: colors.grey[100],
                }}
                onClick={() => {
                  navigate("home")
                }}
                icon={<HomeOutlinedIcon />}
              >
                <Typography>{"Home"}</Typography>

              </MenuItem>


              <MenuItem
                active={true}
                style={{
                  color: colors.grey[100],
                }}
                onClick={() => {
                  navigate("search")
                }}
                icon={<SearchIcon />}
              >
                <Typography>{"Search"}</Typography>

              </MenuItem>


              {/* <SubMenu label='Library' icon={<LibraryMusicIcon/>}>
                <Item
                title="Songs"
                icon={<MusicNoteIcon/>}></Item>
                 <Item
                title="Album"
                icon={<AlbumIcon/>}></Item>
                 <Item
                title="Artist"
                icon={<MicIcon/>}></Item>

              </SubMenu> */}

              <MenuItem
                active={true}
                style={{
                  color: colors.grey[100],
                }}
                onClick={() => {
                  alert("clicked analyze")
                }}
                icon={<InsightsIcon />}
              >
                <Typography>{"Analyze"}</Typography>

              </MenuItem>


              <MenuItem
                active={true}
                style={{
                  color: colors.grey[100],
                }}
                onClick={() => {navigate("import")}}
                icon={<AddCircleOutlineIcon />}
              >
                <Typography>{"Add Song"}</Typography>

              </MenuItem>

              <MenuItem
                active={true}
                style={{
                  color: colors.grey[100],
                }}
                onClick={() => {alert("clicked on export")}}
                icon={<FileDownloadIcon />}
              >
                <Typography>{"Export Songs"}</Typography>

              </MenuItem>

              <MenuItem
                active={true}
                style={{
                  color: colors.grey[100],
                }}
                onClick={() =>  {
                  console.log("bastı")
                  props.logoutFunc();
                  navigate("/");
                } }
                icon={<LogoutIcon />}
              >
                <Typography>{"Logout"}</Typography>

              </MenuItem>


            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </Container>
   </div>
  );
};

export default SideBar;

const Container = styled.div`
  height: 100vh;
`;
