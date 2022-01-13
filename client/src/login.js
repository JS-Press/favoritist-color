import React, { useState }  from "react";
import {useNavigate} from "react-router-dom"

function Login({ fav, onLogin }){
  
  const loginStyle = {
      backgroundColor: `${fav}`,
      color: `black`,
      width: 100,
      fontSize: 20,
      borderColor: `${fav}`,
      borderRadius: 50,
      fontWeight: 'bold',
      textDecoration: 'none',
      padding: 8,
      outlineStyle: 'solid',
      margin: 10
    }
  
  const searchStyle = {
      backgroundColor: 'black',
      color: `${fav}`,
      borderColor: `${fav}`,
      borderRadius: 40,
      padding: 8,
      fontSize: 20,
    }
  
  const labelStyle = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'black',
      color: `${fav}`,
      fontSize: 20,
    }


    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    function handleChangeName(e){
    setName(e.target.value)
    }

    function handleChangePassword(e){
    setPassword(e.target.value)
    }

      function handleSubmit(e){
        e.preventDefault()
        console.log('trying to log in ' + name)
        onLogin({name: name, password_digest: password, color_id: 2 })
        setName('')
        setPassword('')
      }

    return (
        <>
        <br></br>
        <br></br>
        {/* <h3 style={{ color:`${fav}`, fontSize: 25 }}>login</h3> */}
        <hr style={{ width: 100, borderColor: `${fav}`}}></hr>
        <br></br>
        <input style = {searchStyle} type='text' onChange={handleChangeName} value={name} />
        <br></br>
         <label style={labelStyle}>username</label>
         <br></br>
        <input style = {searchStyle} type="password" onChange={handleChangePassword} value={password} />
        <br></br>
         <label style={labelStyle}>password</label>
         <br></br>
         <button style={loginStyle} onClick={handleSubmit} type="submit">login</button>
         <br></br>
         <br></br>
        </>
    )
}

export default Login