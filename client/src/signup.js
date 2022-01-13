import React, { useState, useEffect }  from "react";
import ColorCard from "./ColorCard"
import { useNavigate } from "react-router-dom";

function Signup({ fav, onLogin, colors, loadingColors, shuffle }){
  
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [favColor, setFavColor] = useState('')
  const [favColorId, setFavColorId] = useState('')
  const [errors, setErrors] = useState([]);
  
 const navigate = useNavigate()

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
      const favColorStyle = {
        color:`${favColor}`,
        fontSize: 35
      }


  const shuffled_colors = shuffle(colors)
  const color_cards = shuffled_colors.map( c => <ColorCard name={c.name} key={c.id} avgRating={c.rating_average} rates='false' setFavColor={setFavColor} setFavColorId={setFavColorId} colorId={c.id} ratings={c.ratings} /> )


      function handleChangeName(e){
      setName(e.target.value)
      }

      function handleChangePassword(e){
      setPassword(e.target.value)
      }

      function handleSubmit(e){
        e.preventDefault();
        setErrors([]);
        fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            
            name: name,
            password: password,
            color_id: favColorId,
          
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => onLogin(user));
            setName('')
            setPassword('')
            setFavColor('')
            navigate('/')
            
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

    return (
        <>
        <br></br>
        <br></br>
        {/* <h3 style={{ color:`${fav}`, fontSize: 25 }}>set up your profile</h3> */}
        <hr style={{ width: 100, borderColor: `${fav}`}}></hr>
        <br></br>
          <label style={labelStyle}>choose a username</label>
        <br></br>
        <input style = {searchStyle} type='text' onChange={handleChangeName} value={name} />
          <br></br>
          <br></br>
          <label style={labelStyle}>create a password</label>
        <br></br>
        <input style = {searchStyle} type='password' onChange={handleChangePassword} value={password} />
         <br></br>
         <br></br>
         <label style={labelStyle}>what's your favorite color?</label>
         <h1 style={favColorStyle} >{favColor}</h1>
         {favColor === ''? <>
         </>
         : <>
         <button style={SignUpStyle} onClick={handleSubmit} >signup</button>
         </>}
         <div className='Color_grid'>
          {color_cards}
         </div>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
        </>
    )
}

export default Signup