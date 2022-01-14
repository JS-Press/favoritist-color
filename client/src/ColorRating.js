import React, { useState, useEffect } from 'react';

function ColorRating({ user_id, color_id, score }){

    const[color, setColor] = useState('')

    useEffect(() => {
        fetch(`/colors/${color_id}`).then((r) => {
          if (r.ok) {
            r.json().then(data => {
              setColor(data)
            })}
          })
      }, [])

    const divStyle = {
        backgroundColor:`${color.name}`,
        height: 200,
        width:200,
        margin: 40,
        marginBottom: -220,
        borderRadius: 150
    }

    const deleteStyle = {
        position: 'relative',
        top: 0,
        fonstSize:15,
        backgroundColor:`black`,
        color: `${color.name}`,
        height: 28,
        width:70,
        borderRadius: 150,
        marginRight: -100,
    }

    const editStyle = {
        fonstSize:15,
        color:`black`,
        backgroundColor:`${color.name}`,
        height: 28,
        width:70,
        borderRadius: 150,
    }


    return (
        <>
        <div style={{backgroundColor: 'transparent', display:'flex', flexFlow: 'column'}}>
        <div style={divStyle}>
        </div>
        <h1 style={{ position: 'relative', left:0, top: 5, backgroundColor: 'transparent', fontSize: 90, color:'black'}}>{score}</h1>
        <div style={{display:'flex', flexFlow:'column', position: 'relative', top:25, backgroundColor: 'transparent'}}>
        <h1 style={{position: 'relative', left: 0, color:`${color.name}`, backgroundColor: 'transparent', fontSize: 18, marginBottom:-2}}>{color.name}</h1>
        <div style={{display:'flex', flexFlow:'row', backgroundColor: 'transparent', position: 'relative', left: 50}}>
        <button style={editStyle}>edit</button>
        <button style={deleteStyle}>delete</button>
        </div>
        </div>
        </div>
    
        </>
    );
}

export default ColorRating;
