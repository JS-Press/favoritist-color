import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Link } from "react-router-dom"
import Navbar from "./Navbar"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import UserPage from "./UserPage"
import './App.css';


function App() {

  const [colors, setColors] = useState([])
  const [loadingColors, setLoadingColors] = useState(true)
  const [fav, setFav] = useState('gray')
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [ratingColor, setRatingColor] = useState(false)
  
  console.log('current user: ' + user.name)
  console.log('loggedIn: ' +loggedIn)
  console.log(user)

  useEffect(() => {
    fetch(`/favorite`).then((r) => {
      if (r.ok) {
        r.json().then(data => {
          setFav(data.name)
        })}
      })
    }, [])

  useEffect(() => {
  fetch(`/me`).then((r) => {
    if (r.ok) {
      r.json().then(data => {
        setUser(data)
        setLoggedIn(true)
      })}
    })
  }, [])

  useEffect(() => {
    fetch('/colors').then((r) => {
      if (r.ok) {
        r.json().then(data => {
          setColors(data)
          setLoadingColors(false)
        })}
      })
  }, [])

  const titleStyle = {
    color: `${fav}`,  textDecoration: 'none', fontWeight: 'bold', fontSize: 50, margin: 40
  }
  const logoutStyle = {
    color: `${fav}`,  textDecoration: 'none', position: 'relative', top:20, fontWeight: 'bold', borderRadius: 50, marginBottom:50, padding: 2
  }
  const myColorsStyle = {
    backgroundColor: `${fav}`, color:'black', textDecoration: 'none', fontWeight: 'bold', borderRadius: 50, marginBottom:10, marginTop:20, padding: 6
  }

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function handleLogout(){
  console.log('logOUT')
  fetch(`/logout`, {
            method: "DELETE"
          }).then((r) => {
            if (r.ok) {
            console.log('successful logout!')
            setUser({})
            setLoggedIn(false)
            setRatingColor(false)
          }else {
            console.log('unsuccessful logout :(')
        }});
}

function onLogin(u){
  console.log('trigger login with ' + u.name)
  fetch(`/users/${u.id}`).then((r) => {
    if (r.ok) {
      r.json().then(data => {
        setUser(data)
        setLoggedIn(true)
      })}
    })
    console.log('done logging in')
}

  return (
  <>
  <Router>
  <div className= 'App' >
    <div id='border' style={{ color: `${fav}` }}>
    <br></br>
      <Link to="/" style={titleStyle}>Favoritist Color</Link>
      <br></br>
      <br></br>
      {loggedIn && (
        <>
        <div style={{ marginBottom: 20, marginTop: -5}}>
          <h1 style={{ fontSize: 20, marginBottom:22, marginTop:20 , color: `${fav}` }}>Hello {user.name} :)</h1>
          {/* <button style={logoutStyle} onClick={handleLogout} >  logout  </button> */}
          <Link style={myColorsStyle} to={`/users/${user.id}`} >  see my ratings  </Link>
          <br></br>
          <Link style={logoutStyle} to="/" onClick={handleLogout} >  logout  </Link>
        </div>
        </>
      )}
      {!loggedIn && (
        <>
          <div className="nav" >
          <Navbar fav={fav} />
          <br></br>
          </div>
        </>
      )}
      <Routes>
        {/* <Route path="" element={}/> */}
        <Route path="/" element={<Home user={user} fav={fav} onLogin={onLogin} loggedIn={loggedIn} colors={colors} loadingColors={loadingColors} shuffle={shuffle} ratingColor={ratingColor} setRatingColor={setRatingColor}/>}/>
        <Route path="/signup" element={<Signup fav={fav} onLogin={onLogin} colors={colors} loadingColors={loadingColors} shuffle={shuffle}/>}/>
        <Route path="/login" element={<Login fav={fav} onLogin={onLogin} />}/>
        <Route path="/users/:id" element={<UserPage user={user} fav={fav} onLogin={onLogin} loggedIn={loggedIn} />}/>
      </Routes>
    </div>
  </div>
   </Router>
   </>
  );
}

export default App;
