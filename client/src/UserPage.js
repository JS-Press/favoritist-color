import ColorRating from "./ColorRating"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function UserPage({user, fav, onLogin, loggedIn}){

    useEffect(() => {
    onLogin(user)
    },[])

    // useEffect(() => {
    //     fetch(`/me`).then((r) => {
    //       if (r.ok) {
    //         r.json().then(data => {
    //           setUser(data)
    //           setLoggedIn(true)
    //         })}
    //       })
    //     }, [])

    const navigate = useNavigate()

    const [myRatings, setMyRatings] = useState(user.ratings)

    function eraseRating(r){
        const newRatings = myRatings.filter(rate => rate.id !== r )
        setMyRatings(newRatings)
    }

//   console.log(user.ratings)

console.log(user)

function handleBack(){
    navigate('/')
  }

  const userColors = myRatings.map(r => <ColorRating color_id={r.color_id} user_id={r.user_id} score={r.score} key={r.id} ratingId={r.id} onLogin={onLogin} eraseRating={eraseRating} />)
  

    return (
        <>
            <button onClick={handleBack} style={{color:`${fav}`, fontSize: 20, borderRadius:50, borderStyle: 'solid', position: 'relative', top:10}}>BACK</button>
            <h1 style={{color:`${fav}`, fontSize:70, marginBottom:-80, marginTop:20}}>{user.name}'s color ratings</h1>
            <div className='rate_grid' style={{display: 'relative', top:20}}>
                {userColors}
            </div>
        </>
    );


}

export default UserPage;
