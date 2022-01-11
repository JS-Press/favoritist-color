import React, { useEffect, useState } from "react";
import Color_card from "./color_card"
import crown from './crown.png'

function Home({ fav }){
    const [colors, setColors] = useState([])
    const [searchField, setSearchField] = useState('')

    const css_colors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'WhiteSmoke', 'Yellow', 'YellowGreen']
    const shuffled_colors = shuffle(css_colors)

    const filteredColors = colors.filter((c) => c.toUpperCase().includes(searchField.toUpperCase()))
    const color_cards = filteredColors.map( c => <Color_card name={c} avgRating='5' key={c}/> )

    useEffect( () => {
        setColors(shuffled_colors)
        // console.log(colors)
      }, [])

    useEffect(() => {
    fetch('/colors').then((r) => {
      if (r.ok) {
        r.json().then(data => console.log(data))
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

    return (
  <div>
  <img className="crown" src={crown} alt="crown" />
  <div className='favColor' style={favStyle}></div>
  <h3 style={{ color: `${fav}` }}>currently, the favoritist color is <em style={{ color: `${fav}` }}>{fav}</em></h3>
  <input style = {searchStyle} type='text' onChange={handleChangeSearch} value={searchField} />
  <br></br>
  <label style={labelStyle}>search for a color</label>
  <div className='Color_grid'>
  {color_cards}
  </div>
  <div>
  <h5 style={{ color: `${fav}` }}>A Website by Jarad Solomon</h5>
  </div>
  </div>
    )
}

export default Home

