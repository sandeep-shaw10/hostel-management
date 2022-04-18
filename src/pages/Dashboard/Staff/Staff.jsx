import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Staff = (props) => {

  const navigate = useNavigate()
  const [disable, setDisable] = useState(false)

  function deleteStaff(id){
    setDisable(true)
    const auth_header = { 'auth-token': props.state.token??null }
    const url = props.apiLink

    axios({ url: `${url}/api/user/delete/${id}`, method: "GET", headers: auth_header })
      .then((res) => { 
        props.setState({
          ...props.state,
          staff: props.state.staff.filter(x => x._id !== id)
        })
      })
      .catch((err) => {
        console.log(err.message)
        if(err.response.status === 400){
          localStorage.removeItem("state");
          props.setState(null)
          navigate("/")
        }
      });
      setDisable(false)
  }

  
  return (
    <div>
      <h1>Staff</h1>

      <hr className="mx-4" />

      <div className="container">
        <div className="row">

        { props.state && props.state.staff &&
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Block Access</th>
                  <th scope="col">Role</th>
                  <th scope="col" className="center-head"><Link to="add" className="btn btn-sm btn-warning">Add Staff ➕ </Link></th>
                </tr>
              </thead>
              <tbody>
                {
                  props.state.staff.map((x, index) => <tr key={x._id}>
                      <th scope="row">{index+1}</th>
                      <td>{x.name}</td>
                      <td>{x.email}</td>
                      <td>{x.block.length}</td>
                      <td>
                        {x.role === "admin" && <h5><span className="badge btn-success">Admin</span></h5>}
                        {x.role === "staff" && <h5><span className="badge btn-info">Staff</span></h5>}
                      </td>
                      <td>
                            {(x.role === "admin")? '':
                              <button disabled={disable} onClick={() => deleteStaff(x._id)} data-bs-toggle="tooltip" data-bs-placement="right" title="Delete" className="btn btn-sm btn-outline-danger mx-1">🗑️</button>
                            }
                          
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
  );
};

export default Staff;
