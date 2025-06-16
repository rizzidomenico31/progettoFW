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
import axios from "axios"

import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UserContext} from "./UserContext";
const API_URL = import.meta.env.VITE_API_URL;




function ChangePassword() {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const {token} = useParams()
    const navigate = useNavigate();
    //const {setUser} = useContext(UserContext);


    const handleSubmit =async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post(`${API_URL}/auth/reset-password/${token}`, {password});

            if (res.status === 200) {
                console.log(res.status)
                setMessage(res.data.message)
                setTimeout(()=>{
                    navigate("/login");
                } , 3000)
            }
        }catch(error){
            setMessage("Token Non valido o Scaduto!")
            console.log(error)
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

                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='New Password'
                                          id='formControlLg' type='password'
                                          size="lg"
                                          onChange={(e) => setPassword(e.target.value)}/>
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Retype New Password'
                                          id='formControlLg' type='password'
                                          size="lg"
                                          />


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

export default ChangePassword