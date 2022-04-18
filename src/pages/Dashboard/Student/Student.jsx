import React, {useContext, useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';


const Student = (props) => {

    const navigate = useNavigate();
    const [disable, setDisable] = useState(false)

    function applicationStatus(join, end, status){
        if(status.toString() !== "0") return ['success', 'Application Accepted']
        if(end === null) return ['danger', 'Application in Review']
        return ['warning', 'Hostel life completed']
      }

    function deleteStudent(roll){
        setDisable(true)
        const auth_header = { 'auth-token': props.state.token??null }
        const url = props.apiLink
    
        axios({ url: `${url}/api/student/delete/${roll}`, method: "GET", headers: auth_header })
          .then((res) => { 
            props.setState({
                ...props.state,
                student: props.state.student.filter(x => x.roll !== roll),
                room: props.state.room.map(x => (x.status.length > 0 && x.status[0] === roll)?
                    { ...x, status: []}:
                    { ...x }
                )
            })
          })
          .catch((err) => {
              console.log(err)
            // if(err.response.status === 400){
            //   localStorage.removeItem("auth-token");
            //   navigate("/")
            // }
          });
          setDisable(false)
      }

    return(
        <div>
            <h1>Student</h1>

            <div className="container">
                <div className="row">
                { props.state.student &&
                    <div className="table-responsive">
                        <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Roll</th>
                            <th scope="col">Course</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="center-head"><Link to="add" className="btn btn-sm btn-warning">Add Student ➕ </Link></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            props.state.student.map((x, index) => <tr key={x._id}>
                                <th scope="row">{index+1}</th>
                                <td> <Link to={x.roll}>{x.name}</Link> </td>
                                <td>{x.roll}</td>
                                <td>{x.course}</td>
                                <td>
                                    {
                                        <h5>
                                            <span className={`badge btn-${applicationStatus(x.join_date, x.end_date, x.status)[0]}`}>
                                                {applicationStatus(x.join_date, x.end_date, x.status)[1]}
                                            </span>
                                        </h5>
                                    }
                                </td>
                                <td>
                                    <button disabled={disable} onClick={() => deleteStudent(x.roll)} data-bs-toggle="tooltip" data-bs-placement="right" title="Delete" className="btn btn-sm btn-outline-danger mx-1">🗑️</button>
                                    <button disabled={disable} className="btn btn-sm btn-outline-primary mx-1 " data-bs-toggle="tooltip" data-bs-placement="right" title="Update">⚙️</button>
                                </td>
                            </tr>)
                            }
                        </tbody>
                        </table>
                    </div>
                }

                </div>
            </div>

            <hr />
            <button className="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default Student