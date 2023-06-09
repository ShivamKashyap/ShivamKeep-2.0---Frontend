import React from "react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ModeContext from "../context/utility/ModeContext";

const Navbar = (props) => {

    const context = useContext(ModeContext);
    const { theam } = context;

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('tocken');
        navigate("/login")
    }

    return (
        <>
            <nav className={`navbar navbar-shadow-${theam === 'dark' ? 'dark' : 'light'} navbar-expand-lg px-4 navbar-${theam === 'light' ? 'light' : 'dark'} bg-${theam === 'light' ? 'light' : 'dark'}`} >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Shivam Keep+</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                        </ul>

                        <form className="d-flex">
                            {!localStorage.getItem('tocken') ?

                                <>
                                    <Link className={`btn btn-primary mx-1`} to="/login" role="button">Login</Link>
                                    <Link className={`btn btn-primary mx-1`} to="/signup" role="button">Signup</Link>
                                </>
                                :
                                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;