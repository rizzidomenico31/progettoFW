import React, {useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
}
    from 'mdb-react-ui-kit';
import {useNavigate} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${API_URL}/auth/adduser`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                })
            })
            const data = await response.json()
            if (response.ok) {
               setMessage(data.message)
                setTimeout(() => navigate("/login") , 2000)
            }else setError(data.error);


        }catch (error) {
            console.log("Errore: " , error);
        }
    }


    return (
        <MDBContainer className="mt-5">
            {message && <div className="alert alert-success mt-5" role="alert"> {message}</div>}
            {error && <div className="alert alert-danger mt-5" role="alert"> {error}</div>}
        <form onSubmit={handleSubmit}>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col="12">



                <MDBCard className="bg-dark text-white my-4 mx-auto" style={{borderRadius: '1rem', maxWidth: '400px'}}>
                    <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                        <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                        <p className="text-white-50 mb-5">Registra un nuovo utente</p>


                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='First Name' size='lg' id='form1' type='text'
                                  labelClass='text-white' className="text-white"
                                  onChange={e => setFirstName(e.target.value)}
                                  required/>


                        <MDBInput wrapperClass='mb-4' label='Last Name' size="lg" id='form2' type='text'
                                  labelClass='text-white' className="text-white"
                                  onChange={e => setLastName(e.target.value)} required/>


                        <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form4' type='email'
                                  labelClass='text-white' className="text-white"
                                  onChange={e => setEmail(e.target.value)} required/>


                        <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form5' type='password'
                                  labelClass='text-white' className="text-white"
                                  onChange={e => setPassword(e.target.value)} required/>


                        <MDBBtn className='mb-4' size='lg' type="submit" color="white">Register</MDBBtn>
                        <p className="mb-0">Already registered? <a href="/login"
                                                                      className="text-white-50 fw-bold">Sign In</a>
                        </p>

                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>

        </MDBContainer>
    );
}

export default Register;