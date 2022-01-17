import React, { useState, useEffect } from "react";

function ColorCard({name, setRatingColor, setRcolor, loggedIn, rates, setFavColor, setFavColorId, colorId, ratings }){

    const [isShown, setIsShown] = useState(false);
    const [avgScore, setAvgScore] = useState('');

    const divStyle = {
        backgroundColor:`${name}`, textColor: `${name}`, height: 200, width:200, margin: 32, borderRadius: 150
    }
    const labelStyle = {
        position: 'relative', top: -53, marginTop:0, backgroundColor:`black`, color: `${name}`, fontWeight: 'bold', fontSize: 20
    }
  
    useEffect(() => {
        fetch(`/average/${colorId}`).then((r) => {
            if (r.ok) {
            r.json().then(data => {
                setAvgScore(data)
            })}
            })
        }, [])

    function handleRateClick(e){
    if(loggedIn){
    setRatingColor(true)
    setRcolor(name)}
    }

    function handleColorClick(e){
        if(rates === 'false'){
        setFavColor(name)
        setFavColorId(colorId)}
        if(loggedIn){
    setRatingColor(true)
    setRcolor(name)}
    }

return (
<>
<div style={divStyle} onClick={handleColorClick} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} >
<h4 style={{color:`black`, padding:10, backgroundColor:`${name}`, borderRadius: 150 }}>{name}</h4>
{rates === 'true'? <> 
<h6 onClick={handleRateClick} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} style={{color:`${name}`, backgroundColor:`black`, marginTop:104, fontSize: 15 }}>~ {Math.round(avgScore)}/5 average</h6>
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