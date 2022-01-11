import React, { useState }  from "react";

function Signup({ fav }){

const [name, setName] = useState('')
const [password, setPassword] = useState('')

const SignUpStyle = {
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

      function handleChangeName(e){
      setName(e.target.value)
      }

      function handleChangePassword(e){
      setPassword(e.target.value)
      }

      function handleSubmit(){
        
        fetch(`http://localhost:3000/users`, {  method: "POST",  
        headers: {    "Content-type": "application/json"  },  
        body: JSON.stringify({    
        username: name,
        password_digest: password   
        })})
            .then(r => r.json())
                .then(d=>{
                console.log(d)
                setName('')
                setPassword('')
    })
      }

    return (
        <>
        <br></br>
        <br></br>
        {/* <h3 style={{ color:`${fav}`, fontSize: 25 }}>set up your profile</h3> */}
        <hr style={{ width: 100, borderColor: `${fav}`}}></hr>
        <br></br>
        <input style = {searchStyle} type='text' onChange={handleChangeName} value={name} />
        <br></br>
         <label style={labelStyle}>choose a username</label>
         <br></br>
        <input style = {searchStyle} type='text' onChange={handleChangePassword} value={password} />
        <br></br>
         <label style={labelStyle}>create a password</label>
         <br></br>
         <button style ={SignUpStyle} onClick={handleSubmit} >signup</button>
         <br></br>
         <br></br>
        </>
    )
}

export default Signup