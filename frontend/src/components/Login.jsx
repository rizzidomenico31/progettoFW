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
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);


    const handleSubmit =async (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
        }
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(user)

            })

            const data = await response.json()
            if (response.ok){
                const userRes = await fetch(`${API_URL}/auth/user`, {
                    credentials: 'include'
                });
                const data2 = await userRes.json();
                if (data2.loggedIn) {
                    setUser(data2.user)
                    setMessage(data.message)
                    setTimeout(()=>{
                        navigate("/")
                    } , 4000)
                }

            }
            else setMessage(data.message)
        }catch (error) {
            console.log(error);
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

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Inserisci email e password!</p>

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email'
                                      id='formControlLg' type='email' className="text-white"
                                      size="lg"
                                      onChange={(e) => setEmail(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password'
                                      type='password' size="lg" className="text-white"
                                      onChange={(e) => setPassword(e.target.value)}/>

                            <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="/reset">Forgot password?</a>
                            </p>
                            <MDBBtn type='submit' className='mx-2 px-5' color='white' size='lg'>
                                Login
                            </MDBBtn>

                            <div className='d-flex flex-row mt-3 mb-5'>

                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <a href="/register"
                                                                              className="text-white-50 fw-bold">Sign Up</a>
                                </p>

                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBRow>
        </form>
    </MDBContainer>
)
}

export default Login