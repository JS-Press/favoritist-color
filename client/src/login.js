import React, { useState }  from "react";

function Login({ fav }){

const [formData, setFormData] = useState({
  username: "",
  password: ""
})

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

     function handleChange(e){
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
      }

      function handleSubmit(){

      }

    return (
        <>
        <br></br>
        <br></br>
        {/* <h3 style={{ color:`${fav}`, fontSize: 25 }}>login</h3> */}
        <hr style={{ width: 100, borderColor: `${fav}`}}></hr>
        <br></br>
        <form onSubmit={handleSubmit}>
        <input style = {searchStyle} type='text' name="username" id="username" onChange={handleChange} value={formData.username} />
        <br></br>
         <label style={labelStyle}>username</label>
         <br></br>
        <input style = {searchStyle} type="password" name="password" id="password" onChange={handleChange} value={formData.password} />
        <br></br>
         <label style={labelStyle}>password</label>
         <br></br>
         <button style={loginStyle} type="submit">login</button>
         </form>
         <br></br>
         <br></br>
        </>
    )
}

export default Login