import React from 'react';
import { Link } from 'react-router-dom'


const Navbar = (props) => {

    return(
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-info">
                <div className="container-fluid px-4 py-2">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        {props.state && props.state.token &&
                            <>
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </>
                        }
                        {!props.state && <Link className="nav-link" to="/login">Login</Link>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar