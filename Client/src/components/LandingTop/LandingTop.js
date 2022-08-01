// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import "./LandingTop.css";
// import { useLogout } from "../../hooks/useLogout";
// import { useAuthContext } from "../../hooks/useAuthContext";

// export default function LandingTop() {
//   const {logout} = useLogout()
//   const {user} = useAuthContext()

//   let navigate = useNavigate();

//   const showSettings=()=>{

//     if(document.getElementById('options').className === "options"){
//     document.getElementById('options').classList.add('optionsHidden');
//     document.getElementById('options').classList.remove('options');
//     }
//     else{
//     document.getElementById('options').classList.remove('optionsHidden');
//     document.getElementById('options').classList.add('options');
    
//     }
//   }

//   const handleClick = ()=>{
//     logout();
//   }

//   return (
//     <div className="LandingTop">
//       <div className="details">
//         {user &&
//         <div className="User" id="User"  onClick={() => showSettings()}>
//           <h5>
//             <i className="LandingIcon fa-solid fa-user"></i>
//             Welcome, {user.username}
//             <i className=" LandingIconDown fa-solid fa-caret-down"></i>
//           </h5>
//         </div> 
//         }
//         {user && 
//         <div className="optionsHidden" id="options">
//         <ul className="list-group list-group-flush">
//           <li className="list-group-item">Settings <i className=" optionsIcons fa-solid fa-gear"></i></li>
//           <li className="list-group-item">Profile <i className=" optionsIcons  fa-solid fa-user"></i></li>
          
//           <li className="list-group-item " onClick={handleClick} >Log Out <i className=" optionsIcons  fa-solid fa-arrow-right-from-bracket"></i></li>
          
//         </ul>
//       </div>
//         }
//         {!user &&
//           <div className="details">
//             <div className="Not-Logged_IN" >
//             <Link to="/login">Login</Link>
//             </div>
//           </div>
//           }
        
//       </div>
//     </div>
//   );
// }



import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const {logout} = useLogout();
  const {user } = useAuthContext();

  const handleClick = ()=>{
    logout();
  }
  return (
    <div className="LandingTop">
      <div className="LandingTopDiv">
      <h1><Link to="/"></Link>Muzix App</h1>
        <nav>
          {user && 
          <div className="User">
            <h5 className="username">{user.username}</h5>
            <div className="logout-btn" onClick={handleClick}>Logout</div>
          </div>
          }
          {!user &&
          <div className="login-register">
            <Link className="signup-btn" to="/register">Signup</Link>
            <Link className="login-btn" to="/login">Login</Link>
          </div>
          }
        </nav>
      </div>
    </div>
  )
}

export default Navbar