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
import {UserProvider} from "./components/UserCOntext";
import Tours from "./components/Tours.jsx";

function App() {
    return (
        <>
            <UserProvider>
            <Router>
            <MyNavBar>
            </MyNavBar>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/reset'} element={<ResetPassword/>}/>
                <Route path={'/change-password/:token'} element={<ChangePassword/>}/>
                <Route path={'/allTours'} element={<Tours/>}/>
            </Routes>
            </Router>
            </UserProvider>
        </>

    )
}

export default App;