import ColorRating from "./ColorRating"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function UserPage({user, fav, onLogin, loggedIn}){

    const navigate = useNavigate()
    const [myRatings, setMyRatings] = useState(user.ratings)

    // const [logged, setLogged] = useState(loggedIn)

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
    console.log(user)
    console.log(loggedIn)

    if(loggedIn === true){


    function eraseRating(r){
        // const newRatings = myRatings.filter(rate => rate.id !== r )
        // setMyRatings(r)
        console.log('trying to delete : ' + r)
        onLogin(user)
    }

//   console.log(user.ratings)


function handleBack(){
    navigate('/')
  }
  console.log('mapping:')
  console.log(user)
  console.log(myRatings)
  console.log(user.ratings)
  console.log(':mapping')
  const userColors = user.ratings.map(r => <ColorRating color_id={r.color_id} user_id={r.user_id} score={r.score} key={r.id} ratingId={r.id} onLogin={onLogin} eraseRating={eraseRating} />)
  

    return (
        <>
            <button onClick={handleBack} style={{color:`${fav}`, fontSize: 20, borderRadius:50, borderStyle: 'solid', position: 'relative', top:10}}>BACK</button>
            <h1 style={{color:`${fav}`, fontSize:70, marginBottom:-80, marginTop:20}}>{user.name}'s color ratings</h1>
            <div className='rate_grid' style={{display: 'relative', top:20}}>
                {userColors}
            </div>
        </>
    );
  
    } else {
        return (
            <>
            <h1>loading...</h1>
            </>
        )
    }
}

export default UserPage;
