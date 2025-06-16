import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from "mdb-react-ui-kit"
import { useState} from "react";
import axios from "axios"
//import {useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext";
const API_URL = import.meta.env.VITE_API_URL;




function ResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    //const navigate = useNavigate();
    //const {setUser} = useContext(UserContext);


    const handleSubmit =async (e) => {
        e.preventDefault()
        const res = await axios.post(`${API_URL}/auth/reset-password`, {email})
        if (res.status === 200) {
            setMessage(res.data.message)
        }
    }

    return (

        <MDBContainer className="mt-5">

            <form onSubmit={handleSubmit}>
                <MDBRow className="d-flex justify-content-center align-items-center h-100 ">

                    <MDBCol col="12">
                        {message && <div className="alert alert-success mt-5 w-50 mx-auto" role="alert"> {message}</div>}

                        <MDBCard className='bg-dark text-white my-5 mx-auto'
                                 style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                <h2 className="fw-bold mb-2 text-uppercase">Reset Password</h2>
                                <p className="text-white-50 mb-5">Inserisci la mail associata al tuo account!</p>

                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email'
                                          id='formControlLg' type='email'
                                          size="lg"
                                          onChange={(e) => setEmail(e.target.value)}/>


                                <MDBBtn type='submit' className='mx-2 px-5' color='white' size='lg'>
                                    Reset
                                </MDBBtn>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </form>
        </MDBContainer>
    )
}

export default ResetPassword