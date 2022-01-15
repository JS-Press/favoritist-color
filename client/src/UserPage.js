import ColorRating from "./ColorRating"
import { useEffect } from "react"

function UserPage({user, setUser, fav, onLogin, loggedIn}){

    // useEffect(() => {
    //     fetch(`/me`).then((r) => {
    //       if (r.ok) {
    //         r.json().then(data => {
    //             console.log('set ME')
    //             console.log(data)
    //           setUser(data)
    //         })}
    //       })
    //     }, [])

//   console.log(u)
//   console.log(user.ratings)
if(user){
  
  const userColors = user.ratings.map(r => <ColorRating setUser={setUser} color_id={r.color_id} user_id={r.user_id} score={r.score} key={r.id} ratingId={r.id} onLogin={onLogin} />)
  


    return (
        <>
            <h1 style={{color:`${fav}`, fontSize:70, marginBottom:-50}}>{user.name}'s color ratings</h1>
            <div className='rate_grid' style={{display: 'relative', top:20}}>
                {userColors}
            </div>
        </>
    );
} else{
    return (
        <>
            <h1 style={{color:`${fav}`, fontSize:70, marginBottom:-50}}>Loading color ratings...</h1>
        </>
    );
}
}

export default UserPage;
