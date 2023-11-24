
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './Sidebar/Sidebar';

const Layout = ({...props}) => {

	const navigate = useNavigate();
	const hideNavbar = !props.isLoggedin;

	return (
		<SideBar username={props.username} hideNavbar={hideNavbar}/>


	);
};

export default Layout;
