import React, { useState, useEffect } from 'react';

function ColorRating({ user_id, color_id, score, ratingId, onLogin, setUser }){

    const [color, setColor] = useState('')
    const [editing, setEditing] = useState(false)
    const [newNumberRating, setNewNumberRating] = useState(null)
    const [rating, setRating] = useState(score)

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
        fontSize:16,
        backgroundColor:`black`,
        color: `${color.name}`,
        height: 25,
        width: 65,
        borderRadius: 150,
        marginRight: -100,
    }

    const editStyle = {
        fontSize:16,
        color:`black`,
        backgroundColor:`${color.name}`,
        height: 25,
        width:65,
        borderRadius: 150,
    }

    const numberStyle ={
        color:`${color.name}`,
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 50,
        padding: 0,
        width: 28,
        height: 28,
        margin: 5
      }

    function handleEditing(){
        console.log('editing ' + color.name + " rating")
        setEditing(true)
    }

    function handleEditCancel(){
        setEditing(false)
        setNewNumberRating(null)
    }

    function handleDelete(){
        console.log('deleting ' + color.name + " rating")
        console.log(ratingId)
        fetch(`/ratings/${ratingId}`, {
            method: "DELETE"
          }).then((r) => {
            if (r.ok) {
            console.log('successful delete!')
          }else {
            console.log('unsuccessful delete :(')
        }});
    }

    function handleSave(){
        console.log('saving ' + color.name + " rating of " + newNumberRating)
        fetch(`/ratings/${ratingId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
              score: newNumberRating
            }),
          }).then((r) => {
            if (r.ok) {r.json().then((rate) => {
                // console.log(rate)
                // setRating(newNumberRating)
                setEditing(false)
                setNewNumberRating(null)
                })
            } else {
                console.log('unsuccessful patch :(')
            }
          });
    }

    function handleRateClick(e){
        setNewNumberRating(e.target.value)
    }


    return (
        <>
        <div style={{backgroundColor: 'transparent', display:'flex', flexFlow: 'column', marginBottom:30 }}>
        <div style={divStyle}>
        </div>
        { newNumberRating === null ? <h1 style={{ position: 'relative', left:0, top: 5, backgroundColor: 'transparent', fontSize: 90, color:'black'}}>{rating}</h1>
        : <h1 style={{ position: 'relative', left:0, top: 5, backgroundColor: 'transparent', fontSize: 90, color:'black'}}>{newNumberRating}</h1>}
        <div style={{display:'flex', flexFlow:'column', position: 'relative', top:25, backgroundColor: 'transparent'}}>
        <h1 style={{position: 'relative', left: 0, color:`${color.name}`, backgroundColor: 'transparent', fontSize: 18, marginBottom:-5}}>{color.name}</h1>
        <div style={{display:'flex', flexFlow:'row', backgroundColor: 'transparent', position: 'relative', left: 55}}>
        { editing === false?   <button style={editStyle} onClick={handleEditing} >edit</button> 
        : <button style={editStyle} onClick={handleEditCancel} >cancel</button> }
        { editing === false? <button style={deleteStyle} onClick={handleDelete} >delete</button>
        : <button style={deleteStyle} onClick={handleSave} >save</button>}
            { editing === true? <div style={{ position: 'relative', top: 37, left:-70, backgroundColor: 'transparent'}}>
            <button style={numberStyle} value='1' onClick={handleRateClick}>  1  </button>
            <button style={numberStyle} value='2' onClick={handleRateClick}>  2  </button>
            <button style={numberStyle} value='3' onClick={handleRateClick}>  3  </button>
            <button style={numberStyle} value='4' onClick={handleRateClick}>  4  </button>
            <button style={numberStyle} value='5' onClick={handleRateClick}>  5  </button>
            </div>
            : <>
            </>}
        </div>
        </div>
        </div>
    
        </>
    );
}

export default ColorRating;
