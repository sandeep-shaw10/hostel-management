import React, {useContext, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const Rooms = (props) => {

  const navigate = useNavigate()
  const [disable, setDisable] = useState(false)

  function getBlock(id){
    return props.state.static.block.filter(x => x.id === id)[0]
  }

  function deleteRoom(id){
    setDisable(true)
    const auth_header = { 'auth-token': props.state.token??null }
    const url = props.apiLink

    axios({ url: `${url}/api/room/delete/${id}`, method: "GET", headers: auth_header })
      .then((res) => { 
        props.setState({
          ...props.state,
          room: props.state.room.filter(x => x._id !== id),
          student: props.state.student.map(x => (x.status === id)?
            { ...x, status:0, join_date:null }:
            { ...x }
          )
        })
      })
      .catch((err) => {
          console.log(err.response)
      });
      setDisable(false)
  }

  return (
    <div>
      <h1>Rooms</h1>
      <div className="container my-4">
        <div className="row">

          { props.state && props.state.room && props.state.room.length !== 0 &&
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Room Number</th>
                    <th scope="col">Block</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="center-head"><Link to="add" className="btn btn-sm btn-warning">Add Room ➕ </Link></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    props.state.room.map((x, index) => <tr key={x._id}>
                        <th scope="row">{index+1}</th>
                        <td> <Link to={x._id} >{x.room_no}</Link> </td>
                        <td>{getBlock(x.block).name}</td>
                        <td>
                          {
                            x.status && x.status.length === 0 ?
                            <h5><span className="badge bg-success">Available</span></h5>:
                            <h5><span className="badge bg-danger">Unavailable</span>{console.log(x.status)}</h5>
                          }
                        </td>
                        <td>
                          <button disabled={disable} onClick={() => deleteRoom(x._id)} data-bs-toggle="tooltip" data-bs-placement="right" title="Delete" className="btn btn-sm btn-danger mx-1">🗑️</button>
                          <button disabled={disable} className="btn btn-sm btn-primary mx-1 " data-bs-toggle="tooltip" data-bs-placement="right" title="Update">⚙️</button>
                        </td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          }

          {
            props.state && props.state.room && props.state.room.length === 0 &&
            
            <>
              <h2>No rooms Added</h2>
            </>

          }

        </div>
      </div>
      <hr />
      <button className="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Rooms;
