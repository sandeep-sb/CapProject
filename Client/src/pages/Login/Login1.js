import { useState } from "react";
import {useLogin} from "../../hooks/useLogin"
import "./Login1.css"
import { Link, useNavigate } from "react-router-dom";


const Login1 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isLoading, error} = useLogin()
  const navigate = useNavigate();
  const [errField, setErrField] = useState({
    passwordErr: "",
    emailErr: ""
  })

  const validForm = ()=>{
    let FormIsValid = true
    setErrField({
      passwordErr: "",
      emailErr: ""
    })
    if(email === ""){
      FormIsValid = false;
      setErrField(prevState=>({
        ...prevState, emailErr: "Email cannot be left blank"
      }))
    }
    if(password === ""){
      FormIsValid = false;
      setErrField(prevState=>({
        ...prevState, passwordErr: "Password cannot be left blank"
      }))
    }
    return FormIsValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password);
    // navigate("/");
  }

  return (
    <div className="login-container">
      <Link className="muzix-link" to="/">Muzix App</Link>
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="heading">To continue, log in to Muzix App.</h3>
      
      <div className="form-element">
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
      </div>
      <div className="form-element">
      <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </div>

      <div>
        <Link className="forgot-password-link" to="/forgot-password" >Forgot your password?</Link>
      </div>

      <button className="login-form-btn" disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Login1