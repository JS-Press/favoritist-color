import React, { useState }  from "react";
import {useNavigate} from "react-router-dom"

function Login({ fav, onLogin }){
  
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);

  const loginStyle = {
      backgroundColor: `${fav}`, color: `black`, width: 100, fontSize: 20, borderColor: `${fav}`, borderRadius: 50, fontWeight: 'bold', textDecoration: 'none', padding: 8, outlineStyle: 'solid', margin: 10
    }
  const searchStyle = {
      backgroundColor: 'black', color: `${fav}`, borderColor: `${fav}`, borderRadius: 40, padding: 8, fontSize: 20,
    }
  const labelStyle = {
      display: 'flex', alignItems: 'center', backgroundColor: 'black', color: `${fav}`, fontSize: 20,
    }

  function handleChangeName(e){
  setName(e.target.value)
  }

  function handleChangePassword(e){
  setPassword(e.target.value)
  }

  function handleBack(){
    navigate('/')
  }

  function handleSubmit(){
    console.log('trying to log in ' + name)

    fetch("/login", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ name: name, password: password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate('/')
      } else {
        r.json().then((err) => setErrors(err.errors));
        console.log('login errors:' + errors)
      }
    });
    setName('')
    setPassword('')
    }

    return (
        <>
        <br></br>
        <button onClick={handleBack} style={{ width: 77, height: 44, padding: 8, fontSize: 16, fontWeight: 'bold',backgroundColor: `${fav}`, borderColor: `${fav}`, borderRadius:50, color: 'black', position: 'relative', top: -59, left: -50}} >BACK</button>
        <br></br>
        {/* <h3 style={{ color:`${fav}`, fontSize: 25 }}>login</h3> */}
        {/* <hr style={{ width: 100, borderColor: `${fav}`}}></hr> */}
        {/* <label style={labelStyle}>Welcome back!</label> */}
        <br></br>
        <input style = {searchStyle} type='text' onChange={handleChangeName} value={name} />
        <br></br>
        <br></br>
         <label style={labelStyle}>username</label>
         <br></br>
        <input style = {searchStyle} type="password" onChange={handleChangePassword} value={password} />
        <br></br>
        <br></br>
         <label style={labelStyle}>password</label>
         <br></br>
         <h3 style={{color:'white' }}>{errors}</h3>
         <br></br>
         <button style={loginStyle} onClick={handleSubmit} type="submit">login</button>
         <br></br>
         <br></br>
         <br></br>
        </>
    )
}

export default Login