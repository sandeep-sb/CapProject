import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import axios from "axios"
import "./ResetPassword.css"

export default function ResetPassword(props) {
  const [inputField, setInputField] = useState({
    otpCode:"",
    newPassword:"",
    cPassword: ""
  })
  const naviagte = useNavigate();

  const [errField, setErrField] = useState({
    passwordErr: "",
    cPasswordErr: "",
    otpCodeErr: ""
  })

  const validForm = ()=>{
    let FormIsValid = true
    setErrField({
      passwordErr: "",
      cPasswordErr: "",
      otpCodeErr: ""
    })
    if(inputField.otpCode === ""){
      FormIsValid = false;
      setErrField(prevState=>({
        ...prevState, otpCodeErr: "please enter OTP"
      }))
    }
    if(inputField.newPassword === ""){
      FormIsValid = false;
      setErrField(prevState=>({
        ...prevState, passwordErr: "please enter new password"
      }))
    }
    if(inputField.cPassword === "" || inputField.newPassword !== inputField.cPassword){
      FormIsValid = false;
      setErrField(prevState=>({
        ...prevState, cPasswordErr: "please enter confirm password"
      }))
    }
    return FormIsValid
  }

  const handleChange = (e)=>{
      console.log(e.target);
      console.log(e.target.name)
      setInputField({ ...inputField, [e.target.name]: e.target.value})
  }

  const UpdatePassword = async (e)=>{
    if(validForm()){
      console.log(inputField)
      Object.assign(inputField, props)
      const url = "http://localhost:8000/api/resetpassword"
      let options = {
        method: 'POST',
        url: url,
        data: inputField
      }
      try {
        let res = await axios(options)
        const data = await res.data;
        if(data.status === 200){
          window.alert("Password updated successfully");
          naviagte("/login")
        }
        else{
          window.alert("Incorrect Email");
        }
      } catch (error) {
        window.alert("Something went wrong");
      }
    }


  }

  return (
    <div className='resetpassword'>
        <div className='text-container'>
            Password Reset
        </div>
        <div className='input-container'>
            <form method='POST'>
                <label>Enter OTP Code</label>
                <input 
                    id='otpcode' 
                    key="otpcode" 
                    name='otpcode' 
                    placeholder='Enter OTP Code' 
                    type="text"
                    maxLength="4"
                    value={inputField.otpCode}
                    onChange={handleChange}
                    required/>
                {errField.otpCodeErr.length > 0 && <div className='error' >{errField.otpCodeErr}</div>}
            
                <label>Enter new password</label>
                <input 
                    id='newpassword' 
                    key="newpassword" 
                    name='newpassword' 
                    placeholder='Enter new password' 
                    type="password"
                    value={inputField.newPassword}
                    onChange={handleChange}
                    required/>
                {errField.passwordErr.length > 0 && <div className='error' >{errField.passwordErr}</div>}

            
                <label>Confirm new password</label>
                <input 
                    id='cpassword' 
                    key="cpassword" 
                    name='cpassword' 
                    placeholder='Confirm new password' 
                    type="password"
                    value={inputField.cPassword}
                    onChange={handleChange}
                    required/>
                {errField.cPasswordErr.length > 0 && <div className='error' >{errField.cPasswordErr}</div>}
            </form>
            <button type='button' onClick={UpdatePassword} >Submit</button>
        </div>
    </div>
  )
}
