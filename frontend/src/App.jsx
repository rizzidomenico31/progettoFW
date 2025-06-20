import MyNavBar from './components/Nav.jsx'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import {Button, Col} from "react-bootstrap";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import ResetPassword from "./components/Reset-Password.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import {UserProvider} from "./components/UserContext.jsx";
import Tours from "./components/Tours.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AddTour from "./components/AddTour.jsx";
import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";

function App() {
    const [notifications, setNotifications] = useState([]);
    const [serverStatus, setServerStatus] = useState("");
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(import.meta.env.VITE_API_URL);
        socketRef.current.on("connect", () => {
            console.log("Sono connesso al server Socket");
            setServerStatus("Connesso!");
        })
        socketRef.current.on("notification", (data) => {

                console.log("Ricevo i dati!" + data.message);
                setNotifications(preced => {
                    const update = [...preced , data.message]
                    return update.slice(-1);
                });

        })
        socketRef.current.on("disconnect", () => {
            console.log("Non Sono connesso!");
            setServerStatus("Disconnected");
        })
    } , [])
    return (
        <>
            <UserProvider>
            <Router>
            <MyNavBar notifications={notifications} />
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/reset'} element={<ResetPassword/>}/>
                <Route path={'/change-password/:token'} element={<ChangePassword/>}/>
                <Route path={'/allTours'} element={<Tours/>}/>

                {/*Route dedicate solo agli utenti admin*/}
                <Route path={'/addTour'} element={
                    <AdminRoute>
                        <AddTour/>
                    </AdminRoute>
                }/>

            </Routes>
            </Router>
            </UserProvider>
        </>

    )
}

export default App;