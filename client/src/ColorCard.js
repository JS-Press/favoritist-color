import React, { useState } from "react";

function ColorCard({name, setRatingColor, setRcolor, loggedIn, rates, setFavColor, setFavColorId, colorId, ratings}){

    const [isShown, setIsShown] = useState(false);

    let scores = [.01]
    let scoreTotal = 1
    ratings.map(r => scores.push(r.score))
    // console.log(name + ' scores:' + scores)
    for(let i = 0; i < scores.length; i++) {
        scoreTotal += scores[i]
    }
    // console.log(name + ' score total:' + scoreTotal)
    let averageScore = Math.round(scoreTotal / scores.length)
    console.log(name + ' average score:' + averageScore)

    const divStyle = {
        backgroundColor:`${name}`,
        textColor: `${name}`,
        height: 200,
        width:200,
        margin: 20,
        borderRadius: 150
    }

    const labelStyle = {
        position: 'relative',
        top: -55,
        marginTop:0,
        backgroundColor:`black`,
        color: `${name}`,
        fontWeight: 'bold',
        fontSize: 16
    }

    function handleRateClick(e){
    if(loggedIn){
    setRatingColor(true)
    setRcolor(name)}
    }

    function handleColorClick(e){
        if(rates === 'false'){
        setFavColor(name)
        setFavColorId(colorId)}
    }

return (
<>
<div style={divStyle} onClick={handleColorClick}>
<h4 style={{color:`black`, padding:10, backgroundColor:`${name}`, borderRadius: 150 }}>{name}</h4>
{rates === 'true'? <> 
<h6 onClick={handleRateClick} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} style={{color:`${name}`, backgroundColor:`black`, marginTop:104, fontSize: 15 }}>~ {averageScore}/5 stars</h6>
{isShown && loggedIn && (
        <>
          <label style={labelStyle} onClick={handleRateClick} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} >add rating</label>
        </>
      )}
</> 
: <>

</>}
</div>
</>
)
}

export default ColorCard;