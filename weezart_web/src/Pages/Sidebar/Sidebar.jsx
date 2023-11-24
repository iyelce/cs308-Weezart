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
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicIcon from '@mui/icons-material/Mic';
import AlbumIcon from '@mui/icons-material/Album';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const LOGO = require('../../weezart-removebg-preview.png');

const Item = ({ title, to, icon, selected, setSelected }) => {
const navigate=useNavigate();
const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>

    </MenuItem>
  );
};

const SideBar = (...props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
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
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> */}
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}

                    sx={{ m: "10px 0 0 0" }}
                  >
                   {props[0].username}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Welcome
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

         
              <Item
                title="Home"
                to="/HomePage"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
              <Item
                title="Search"
                icon={<SearchIcon />}
                selected={selected}
                setSelected={setSelected}
                onclick={()=>navigate('search')}
              />
              <SubMenu label='Library' icon={<LibraryMusicIcon/>}>
                <Item
                title="Songs"
                icon={<MusicNoteIcon/>}></Item>
                 <Item
                title="Album"
                icon={<AlbumIcon/>}></Item>
                 <Item
                title="Artist"
                icon={<MicIcon/>}></Item>

              </SubMenu>
              
              
              <Item
                title="Analyze"
                to="/form"
                icon={<InsightsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Add Song"
                to="/calendar"
                icon={<AddCircleOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Export Songs"
                to="/faq"
                icon={<FileDownloadIcon />}
                selected={selected}
                setSelected={setSelected}
              />
               <Item
                title="Logout"
                to="/faq"
                icon={<LogoutIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            
            

              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
              {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  height: 100vh;
`;
