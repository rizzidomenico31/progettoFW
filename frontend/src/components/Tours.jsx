import CardTour from './CardTour.jsx'
import React, {useEffect, useState} from "react";
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

function Tours(){
    const [tours, setTours] = useState([]);
    const [message, setMessage] = useState();

    useEffect( ()=>{
        axios.get(`${API_URL}/tours/alltours`)
            .then(res => {
                if (res.status === 200){
                    setTours(res.data);
                }else setMessage(res.data.message);
            } )
            .catch(err => console.log(err));
    } , [])
    return (
       <>
           {message && <div className="alert alert-danger mt-5" role="alert"> {message}</div>}
          <div className="card-container">
           {tours.map(tour => (
               <div className="card-item" key={tour.id}>
               <CardTour key={tour._id} name={tour.name} description={tour.description} imageUrl={tour.imageUrl} />
                 </div>
           ))}
          </div>
       </>
    )
}

export default Tours;