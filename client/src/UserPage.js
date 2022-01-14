import React, { useState, useEffect } from 'react';
import ColorRating from "./ColorRating"

function UserPage({u, fav}){



const [user, setUser] = useState({})
const [loading, setLoading] = useState(true)

useEffect(() => {
    fetch(`/users/${u.id}`).then((r) => {
      if (r.ok) {
        r.json().then(data => {
          setUser(data)
          setLoading(false)
        })}
      })
  }, [])

  console.log(u)
  console.log(user.ratings)

  const userColors = user.ratings.map(r => <ColorRating color_id={r.color_id} user_id={r.user_id} score={r.score} key={r.id} />)


    return (
        <>
            <h1 style={{color:`${fav}`, fontSize:40}}>{u.name}'s color ratings</h1>
            <div className='rate_grid' style={{display: 'relative', top:20}}>
                {loading === true ?<>
                <h1 style={{color:`${fav}`, fontSize:40}}>loading...</h1>
                </>
                : <>
                {userColors}
                </>}
            </div>
        </>
    );
}

export default UserPage;
