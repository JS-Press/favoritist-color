import React, { useEffect, useState } from "react";
import Color_card from "./color_card"
import crown from './crown.png'

function Home({ fav }){
    const [colors, setColors] = useState([])
    const [searchField, setSearchField] = useState('')
    const [ratingColor, setRatingColor] = useState(false)
    const [rColor, setRcolor] = useState("")

    // const css_colors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'WhiteSmoke', 'Yellow', 'YellowGreen']
    const shuffled_colors = shuffle(colors)

    const filteredColors = shuffled_colors.filter((c) => c.name.toUpperCase().includes(searchField.toUpperCase()))
    const color_cards = filteredColors.map( c => <Color_card name={c.name} avgRating={c.rating_average} key={c.name} setRatingColor={setRatingColor} setRcolor={setRcolor}/> )

    useEffect(() => {
    fetch('/colors').then((r) => {
      if (r.ok) {
        r.json().then(data => setColors(data))
      }
    })
  }, [])

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
      fontWeight: 'bold'
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

    function handleChangeSearch(e){
        setSearchField(e.target.value)
      }

    function handleBack(){
      setRatingColor(false)
    }

    return (
  <div>
  <img className="crown" src={crown} alt="crown" />
  <div className='favColor' style={favStyle}></div>
  <h3 style={{ color: `${fav}` }}>currently, the favoritist color is <em style={{ color: `${fav}` }}>{fav}</em></h3>
  
  { ratingColor === true? <>
  <br></br>
  <br></br>
  <div style={{borderStyle: 'solid', borderColor: `${rColor}`, borderWidth: 2, marginLeft:400, marginRight:400}}>
  <h1 style={{color:`${rColor}`, fontSize: 30}}>{rColor}</h1>
  <div style={rStyle}></div>
  <text style={numberStyle}>  1  </text><text style={numberStyle}>  2  </text><text style={numberStyle}>  3  </text><text style={numberStyle}>  4  </text><text style={numberStyle}>  5  </text>
  <br></br>
  <br></br>
  </div>
  <h3 onClick={handleBack} style={{color:`${rColor}`, fontSize: 20}}>BACK</h3>
  </>
  : <>
  <input style = {searchStyle} type='text' onChange={handleChangeSearch} value={searchField} />
  <br></br>
  <label style={labelStyle}>search for a color</label>
  <div className='Color_grid'>
  {color_cards}
  </div>
  <div>
  <h5 style={{ color: `${fav}` }}>A Website by Jarad Solomon</h5>
  </div>
  </>}
  </div>
    )
}

export default Home

