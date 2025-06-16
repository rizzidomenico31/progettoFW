import {
    MDBCarousel,
    MDBCarouselItem,
    MDBCarouselCaption
} from "mdb-react-ui-kit";
import carosello1 from "../assets/carosello1.jpg";
import carosello2 from "../assets/carosello2.jpg";
import carosello3 from "../assets/carosello3.jpg";

import React from "react";
function Home(){
    return(
        <MDBCarousel showIndicators showControls fade>
            <MDBCarouselItem itemId={1}>
                <img src={carosello1} className='d-block w-100 carousel-img ' alt='...' />
                <MDBCarouselCaption>
                    <h5>Polignano a Mare</h5>
                    <p>Un'esperienza unica a strapiombo sul mare.</p>
                </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={2}>
                <img src={carosello2} className='d-block w-100 carousel-img' alt='...'/>
                <MDBCarouselCaption>
                    <h5>Monopoli</h5>
                    <p>Viaggio tra le calette più famose d'Italia.</p>
                </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={3}>
                <img src={carosello3} className='d-block w-100 carousel-img' alt='...' />
                <MDBCarouselCaption>
                    <h5>Alberobello</h5>
                    <p>Passeggiata tra i trulli patrimonio unesco.</p>
                </MDBCarouselCaption>
            </MDBCarouselItem>
        </MDBCarousel>

    )
}

export default Home;