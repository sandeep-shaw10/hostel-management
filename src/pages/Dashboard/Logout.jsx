import React from 'react';
import { useNavigate } from "react-router-dom";

const Logout = (props) => {

    const navigate = useNavigate();

    const logOut = () => {
        props.setState()
        localStorage.removeItem('state')
        navigate("/")
    }

    return(
        <div className="container my-5">
            <div className="row text-white ">
                <div className="bg-info rounded col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1 className='pb-4'>LogOut</h1>
                    <div className="px-2">
                        <button onClick={logOut} className="btn btn-danger btn-sm mb-2">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout