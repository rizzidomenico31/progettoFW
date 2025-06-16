import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';


function CardTour({name , description , imageUrl}) {
   function handlePrenota(){
       alert('Attenzione Funzionalità in fase di sviluppo!');
   }
    return (
        <MDBCard className="w-25 card-item ">
            <MDBCardImage src={imageUrl} position='top' alt={name} className="image-card" />
            <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                <MDBCardText>
                    {description}
                </MDBCardText>
                <MDBBtn onClick={handlePrenota}>Prenota</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
}

export default CardTour