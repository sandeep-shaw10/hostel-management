import React from 'react';
import { Link } from 'react-router-dom'

const Dashboard = (props) => {

    function getBlock(id){
        return props.state.static.block.filter(x => x.id === id)[0]
    }

    return(
        <div>
            
            <h1>Dashboard</h1>
            <ul>
                <li>Name: { props.state && props.state.self.name }</li>
                <li>Role: { props.state && props.state.self.role }</li>
                <li>EmailID: { props.state && props.state.self.email }</li>
            </ul>

            <hr />
            
            <h4>
                Block Access: { props.state && (props.state.block_access.length === 0)?<span className="badge bg-danger">No access</span>:
                    props.state.block_access.map((x, index) => <span key={index}><Link to={`block/${x}`} className="btn btn-primary me-2" >{getBlock(x).name}</Link></span>)
                }
            </h4>

            <hr />
            <h4> Room Access</h4>
                <Link to="room" className="btn btn-info mx-2 my-1">Room View</Link>
            <hr />
            <h4>Staff Access</h4>
                <Link to="staff" className="btn btn-info mx-2 my-1">Manage Staff</Link>
            <hr />
            <h4>Student Access</h4>
            <Link to="student" className="btn btn-info mx-2 my-1">Student View</Link>
            <hr />
            <h4>Block Access</h4>
            <Link to="block" className="btn btn-info mx-2 my-1">Block View</Link>

        </div>
    )
}

export default Dashboard