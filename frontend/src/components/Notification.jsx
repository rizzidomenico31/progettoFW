import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import {Toast, ToastContainer, ToastBody, ToastHeader} from "react-bootstrap"
import {BellFill} from "react-bootstrap-icons";

function Notification({notifications}) {
    const [show, setShow] = useState(false);

    return (
        <>
            <div style={{ alignItems: "center"}} onClick={() => setShow(true)}>
                <BellFill/>
            </div>

            <ToastContainer position='top-end' className='p-3'>

                    {notifications.map((not, index) => (
                        <Toast
                            key={index}
                            show ={show}
                            delay={10000}
                            onClose={() => setShow(false)}
                            autohide
                        >
                            <Toast.Header><strong className="me-auto">{not.title || 'Notifica'}</strong></Toast.Header>
                            <Toast.Body><div>{not}</div></Toast.Body>

                        </Toast>
                    ))}
            </ToastContainer>
        </>
    );
}

export default Notification;
