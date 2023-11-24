
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({...props}) => {

	const navigate = useNavigate();
	const hideNavbar = !props.isLoggedin;

	return (
		<nav className='navbar navbar-expand navbar bg mb-5'>

			<div className="row-xs-6 col-md-1"></div>

			<div className='container-fluid' 
            hidden={hideNavbar}
            >
			<div>
        <p>{props.username}</p>
        <p>{props.userId}</p>
				<button
					onClick={() => navigate("home")}
					className='button_nav'
				>
					Home
				</button>
				
				<button
					onClick={() => navigate("search")}
					className='button_nav'
				>
					Search
				</button>

        <button
					onClick={() => navigate("import")}
					className='button_nav'
				>
					Import
				</button>
			</div>
				
			<div>
				<button
					onClick={() =>  {
            props.logoutFunc();
						navigate("/");
					}
					}
					className='button_nav'
				>
					Logout 
				</button>
				
			</div>


			</div>
		</nav>


	);
};

export default Layout;
