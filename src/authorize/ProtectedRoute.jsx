import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = (props) => {

    if(props.status){

        if(props.status === 'loggedOut'){
            if(props.state) return <Navigate to="/"/> 
            else return <Outlet /> 
        }

        if(props.status === 'loggedIn'){
            if(props.state){
                if(props.state.token) return <Outlet />
                return <Navigate to="/login"/>
            }
            else{
                return <Navigate to="/login"/>
            }
        }
    }

    return <Navigate to="/"/>

}


export default ProtectedRoute