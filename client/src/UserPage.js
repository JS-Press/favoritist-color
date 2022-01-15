import ColorRating from "./ColorRating"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function UserPage({user, setUser, fav, onLogin, loggedIn}){

    const navigate = useNavigate()

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

function handleBack(){
    navigate('/')
  }



if(user){
  
  const userColors = user.ratings.map(r => <ColorRating setUser={setUser} color_id={r.color_id} user_id={r.user_id} score={r.score} key={r.id} ratingId={r.id} onLogin={onLogin} />)
  


    return (
        <>
            <button onClick={handleBack} style={{color:`${fav}`, fontSize: 20, borderRadius:50, borderStyle: 'solid', position: 'relative', top:10}}>BACK</button>
            <h1 style={{color:`${fav}`, fontSize:70, marginBottom:-80, marginTop:20}}>{user.name}'s color ratings</h1>
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
