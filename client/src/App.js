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
  const [fav, setFav] = useState('CornflowerBlue')
  const [loggedIn, setLoggedIn] = useState(false)
  const [ratingColor, setRatingColor] = useState(false)
  const [user, setUser] = useState(null)
  const [averageScores, setAverageScores] = useState([])
  const [seeingRatings, setSeeingRatings] = useState(false)


  useEffect(() => {
    fetch('/colors').then((r) => {
      if (r.ok) {
        r.json().then(data => {
          setColors(data)
          setLoadingColors(false)
        })}
      })
      fetch(`/users/${user.id}`).then((r) => {
        if (r.ok) {
          r.json().then(data => {
            setUser(data)
          })}
        })
  }, [])

  
  const titleStyle = {
    color: `${fav}`, 
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 50,
    margin: 40
  }
  
  const logoutStyle = {
    color: `${fav}`, 
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: 50,
    padding: 2
  }

  const myColorsStyle = {
    backgroundColor: `${fav}`, 
    color:'black',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: 50,
    marginBottom:10,
    marginTop:20,
    padding: 6
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
  setLoggedIn(false)
  setRatingColor(false)
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
          <h1 style={{ fontSize: 20, marginBottom:0, color: `${fav}` }}>Hello {user.name} :)</h1>
          <button style={logoutStyle} onClick={handleLogout} >  logout  </button>
          <Link style={myColorsStyle} to={`/users/${user.id}`} >  see my ratings  </Link>
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
        <Route path="/" element={<Home setAverageScores={setAverageScores} averageScores={averageScores} fav={fav} loggedIn={loggedIn} colors={colors} loadingColors={loadingColors} shuffle={shuffle} ratingColor={ratingColor} setRatingColor={setRatingColor} user={user}/>}/>
        <Route path="/signup" element={<Signup fav={fav} onLogin={onLogin} colors={colors} loadingColors={loadingColors} shuffle={shuffle}/>}/>
        <Route path="/login" element={<Login fav={fav} onLogin={onLogin} />}/>
        <Route path="/users/:id" element={<UserPage user={user} fav={fav} onLogin={onLogin} setUser={setUser} />}/>
      </Routes>
    </div>
  </div>
   </Router>
   </>
  );
}

export default App;
