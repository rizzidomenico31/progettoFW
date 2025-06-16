import CardTour from './CardTour.jsx'
import React, {useEffect, useState} from "react";
import axios from 'axios'
function Tours(){
    const [tours, setTours] = useState([]);
    const [message, setMessage] = useState();
    useEffect( ()=>{
        axios.get('http://localhost:5001/tours/alltours')
            .then(res => {
                if (res.status === 200){
                    setTours(res.data);
                }else setMessage(res.data.message);
            })
            .catch(err => console.log(err));
    })
    return (
       <>
           {message && <div className="alert alert-danger mt-5" role="alert"> {message}</div>}
          <div className="card-container">
           {tours.map(tour => (
               <CardTour key={tour._id} name={tour.name} description={tour.description} imageUrl={tour.imageUrl} />
           ))}
          </div>
       </>
    )
}

export default Tours;