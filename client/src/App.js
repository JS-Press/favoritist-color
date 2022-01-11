import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Link} from "react-router-dom"
import Navbar from "./navbar"
import Home from "./home"
import Login from "./login"
import Signup from "./signup"
import './App.css';


function App() {

const [fav, setFav] = useState('CornflowerBlue')
const [user, setUser] = useState(null)
const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch('/users').then((r) => {
      if (r.ok) {
        r.json().then(data => console.log(data))
        
      }
    })
  }, [])

const titleStyle = {
  color: `${fav}`, 
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: 50,
  margin: 40
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
      <div className="nav" >
      <Navbar fav={fav} />
      <br></br>
      </div>
      <Routes>
        {/* <Route path="" element={}/> */}
        <Route path="/" element={<Home fav={fav} />}/>
        <Route path="/signup" element={<Signup fav={fav} />}/>
        <Route path="/login" element={<Login fav={fav} />}/>
      </Routes>
    </div>
  </div>
   </Router>
   </>
  );
}

export default App;
