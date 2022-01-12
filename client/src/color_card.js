import React, { useState } from "react";

function Color_card({name, avgRating, setRatingColor, setRcolor}){

    const [isShown, setIsShown] = useState(false);

    const starRating = avgRating

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
        top: -40,
        backgroundColor:`transparent`,
        color: `${name}`,
        fontSize: 15
    }

    function handleRateClick(e){
setRatingColor(true)
setRcolor(name)
    }

return (
<>
<div style={divStyle} >
<h4 style={{color:`black`, padding:10, backgroundColor:`${name}`, borderRadius: 150 }}>{name}</h4>
<h6 onClick={handleRateClick} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} style={{color:`${name}`, backgroundColor:`black`, marginTop:104, fontSize: 15 }}>{avgRating}/5</h6>
{isShown && (
        <>
          <label style={labelStyle} >add rating</label>
        </>
      )}
</div>
</>
)
}

export default Color_card;