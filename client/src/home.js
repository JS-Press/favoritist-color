import React, { useEffect, useState } from "react";
import crown from './crown.png'
import ColorCard from "./ColorCard"

function Home({ fav, loggedIn, colors, loadingColors, shuffle, ratingColor, setRatingColor, user }){
    
    const [searchField, setSearchField] = useState('')
    const [rColor, setRcolor] = useState("")
    const [numberRating, setNumberRating] = useState(null)
    const [errors, setErrors] = useState([]);

    // colors.map(color => console.log(color.ratings))

    const shuffled_colors = shuffle(colors)

    const filteredColors = shuffled_colors.filter((c) => c.name.toUpperCase().includes(searchField.toUpperCase()))
    const color_cards = filteredColors.map( c => <ColorCard name={c.name} ratings={c.ratings} key={c.name} setRatingColor={setRatingColor} setRcolor={setRcolor} loggedIn={loggedIn} colorId={c.id} rates='true' /> )


  const searchStyle = {
      backgroundColor: 'black',
      color: `${fav}`,
      borderColor: `${fav}`,
      borderRadius: 40,
      padding: 8
    }

  const labelStyle = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'black',
      color: `${fav}`,
    }

  const rStyle = {
    backgroundColor:`${rColor}`,
      height: 200,
      width:200,
      margin: 20,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 150
  }

  const numberStyle ={
    color:`${rColor}`,
    fontSize: 25,
    fontWeight: 'bold',
    borderRadius: 50,
    padding: 5,
    width: 40
  }
  
  const favStyle = {
      backgroundColor:`${fav}`,
      height: 200,
      width:200,
      margin: 20,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 150
    }


    function handleChangeSearch(e){
        setSearchField(e.target.value)
      }

    function handleBack(){
      setRatingColor(false)
      setNumberRating(null)
    }

    function handleRateClick(e){
    console.log(Number(e.target.value))
    setNumberRating(e.target.value)
    }

    function handleRatingSubmit(){
        setErrors([]);
        fetch("/ratings", {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({
            user_id: user.id,
            color: rColor,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setRatingColor(false));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
    }


    return (
  <div>
  <img className="crown" src={crown} alt="crown" />
  <div className='favColor' style={favStyle}></div>
  <h3 style={{ color: `${fav}` }}>currently, the favoritist color is <em style={{ color: `${fav}` }}>{fav}</em></h3>
  
  { ratingColor === true? <>
  <br></br>
  <br></br>
  <div style={{borderStyle: 'solid', borderColor: `${rColor}`, borderWidth: 2, width:380, marginLeft:'auto', marginRight:'auto'}}>
  <h1 style={{color:`${rColor}`, fontSize: 30}}>{rColor}</h1>
  <div style={rStyle}></div>
  { numberRating? <>
  <h1 style={{color:`black`, fontSize: 80, position: 'relative', top: -200, backgroundColor: 'transparent', marginBottom: -128}}>{numberRating}</h1>
  </>
  : <>
  </>}
  <button style={numberStyle} value='1' onClick={handleRateClick}>  1  </button>
  <button style={numberStyle} value='2' onClick={handleRateClick}>  2  </button>
  <button style={numberStyle} value='3' onClick={handleRateClick}>  3  </button>
  <button style={numberStyle} value='4' onClick={handleRateClick}>  4  </button>
  <button style={numberStyle} value='5' onClick={handleRateClick}>  5  </button>
  <h3 style={{color:`${rColor}`, fontSize: 15, marginTop:-10, marginBottom:-10}}>(choose your rating)</h3>
  <br></br>
  <br></br>
  </div>
  <button onClick={handleBack} style={{color:`${rColor}`, fontSize: 20, borderStyle: 'none'}}>BACK</button>
  {numberRating? <>
    <button onClick={handleRatingSubmit} style={{ backgroundColor:`${rColor}`, color:'black', borderRadius: 50, fontSize:20, width: 100, height: 40 }} > SUBMIT</button>
    </>
  :<>
  </>}
  </>
  : <>
  <input style = {searchStyle} type='text' onChange={handleChangeSearch} value={searchField} />
  <br></br>
  <label style={labelStyle}>search for a color</label>
  <div className='Color_grid'>
  {loadingColors === true?<><h1 style={{display:'flex', position:'relative', alignSelf:'center', color: `${fav}`}}>loading colors...thanks for your patience...</h1></> : <>
  {color_cards}</>}
  </div>
  <div>
  <h5 style={{ color: `${fav}` }}>A Website by Jarad Solomon</h5>
  </div>
  </>}
  </div>
    )
}

export default Home

