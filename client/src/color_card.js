import React from "react";

function Color_card({name, avgRating}){

    const divStyle = {
        backgroundColor:`${name}`,
        textColor: `${name}`,
        height: 200,
        width:200,
        margin: 20,
        borderRadius: 150

    }

return (
<>
<div style={divStyle} >
<h4 style={{color:`black`, padding:10, backgroundColor:`${name}`, borderRadius: 150 }}>{name}</h4>
<h6 style={{color:`${name}`, backgroundColor:`transparent`, marginTop:105}}>★★★★★</h6>
</div>
</>
)
}

export default Color_card;