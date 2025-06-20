import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTextArea} from "mdb-react-ui-kit";
import {useState , useEffect} from "react";
import {io} from "socket.io-client";
const API_URL = import.meta.env.VITE_API_URL;

function AddTour(){
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const socket = io(API_URL , {withCredentials: true});

    useEffect(() => {
        socket.on('tour-added' , (data) => {
            alert("Tour aggiunto con Successo! - " + data.name);
        })
    } , [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/tours/addtour`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            } ,
            body: JSON.stringify({
                name: name,
                description: description,
                imageUrl: imageUrl,
            })
        })
        const data = await res.json();
        if (res.ok) setMessage("Aggiunto Con Successo")
        else setMessage(data.message);
    }
    return(
        <MDBContainer className="mt-5">

            <form onSubmit={handleSubmit}>
                <MDBRow className="d-flex justify-content-center align-items-center h-100 ">

                    <MDBCol col="12">
                        {message && <div className="alert alert-success mt-5 w-50 mx-auto" role="alert"> {message}</div>}

                        <MDBCard className='bg-dark text-white my-5 mx-auto'
                                 style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                <h2 className="fw-bold mb-2 text-uppercase">Aggiungi Tour</h2>
                                <p className="text-white-50 mb-5">Inserisci i Dati Richiesti</p>

                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Nome Tour'
                                          id='formControlLg' type='text' className="text-white"
                                          size="lg"
                                          onChange={(e) => setName(e.target.value)} required = "true"/>
                                <MDBTextArea wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Descrizione'
                                          type='text' size="lg" className="text-white"
                                          onChange={(e) => setDescription(e.target.value)} required="true"/>
                                <MDBTextArea wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='imageUrl'
                                          type='text' size="lg" className="text-white"
                                          onChange={(e) => setImageUrl(e.target.value)} required="true"/>


                                <MDBBtn type='submit' className='mx-2 px-5' color='white' size='lg'>
                                    Aggiungi
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </form>
        </MDBContainer>
    );
}
export default AddTour;