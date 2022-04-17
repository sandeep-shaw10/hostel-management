import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const Rooms = (props) => {

  const navigate = useNavigate()
  const {roomId} = useParams()

  function getRoom(){
    if(props.state){
      return props.state.room.filter(x => x._id === roomId)[0]
    }
  }

  function getGender(){
    const block = props.state.room.filter(x => x._id === roomId)[0].block
    return props.state.static.block.filter(x => x.id === block)[0].type
  }

  //DEALLOT
  function deallot(roll){
    const auth_header = { 'auth-token': props.state.token }
    const url = 'http://127.0.0.1:8000'

    axios({ url: `${url}/api/allotment/remove/${roomId}/${roll}`, method: "GET", headers: auth_header })
      .then((res) => {

        props.setState({

          //without mutating other state
          ...props.state,

          //update student
          student: props.state.student.map(x => (x.roll === roll) ? 
          { ...x, status: 0 } :
          { ...x }
          ),

          //update room
          room: props.state.room.map(x => (x._id === roomId) ? 
              { ...x, status: [] } :
              { ...x }
            )  
        })

      })
      .catch((err) => {
        if(err.response.status === 400){
          localStorage.removeItem("state");
          navigate("/")
        }
      });
  }

  //ALLOT
  function allotRoom(roll){
    const auth_header = { 'auth-token': props.state.token }
    const url = 'http://127.0.0.1:8000'

    axios({ url: `${url}/api/allotment/${roomId}/${roll}`, method: "GET", headers: auth_header })
      .then((res) => {

        props.setState({

          //without mutating other state
          ...props.state,

          //update student
          student: props.state.student.map(x => (x.roll === roll) ? 
          { ...x, status: 1, join_end: Date.now() } :
          { ...x }
          ),

          //update room
          room: props.state.room.map(x => (x._id === roomId) ? 
              { ...x, status: [`${roll}`] } :
              { ...x }
            )  
        })

      })
      .catch((err) => {
        if(err.response.status === 400){
          localStorage.removeItem("state");
          navigate("/")
        }
      });
  }

  //DEALLOT: END
  function endHostel(roll){
    const auth_header = { 'auth-token': props.state.token }
    const url = 'http://127.0.0.1:8000'

    axios({ url: `${url}/api/allotment/${roll}/end`, method: "GET", headers: auth_header })
      .then((res) => {

        props.setState({

          //without mutating other state
          ...props.state,

          //update student
          student: props.state.student.map(x => (x.roll === roll) ? 
          { ...x, status: 0, end_date: Date.now() } :
          { ...x }
          ),

          //update room
          room: props.state.room.map(x => (x._id === roomId) ? 
              { ...x, status: [] } :
              { ...x }
            )  
        })

      })
      .catch((err) => {
        if(err.response.status === 400){
          localStorage.removeItem("state");
          navigate("/")
        }
      });
  }

  return (
    <div>

      <div className="container my-4">
        <div className="row">

        {props.state && 
          <>
            <h1>{getRoom().name}</h1>
            {
              (getRoom().status.length === 0) ?
              <h5><span className="badge btn-danger">Available</span></h5>:
              <h5><span className="badge btn-success">Already Ocuppied</span></h5>
            }
            
            <p><strong>Description: </strong>{getRoom().desc}</p>
          </>
        }

        

        {
          props.state && getRoom().status.length === 0 &&
          <>
            <h4 className="mt-4">Student Application</h4>

            {  (getRoom().status.length === 0) && props.state.student &&

            <div className="table-responsive">
              {}
              <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Roll</th>
                    <th scope="col">Course</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      props.state.student.filter(y => (y.sex === getGender() && y.status.toString() === "0" && y.end_date === null))
                      .map((x, index) => <tr key={x._id}>
                        <th scope="row">{index+1}</th>
                        <td> <Link to={`/dashboard/student/${x.roll}`}>{x.name}</Link> </td>
                        <td>{x.roll}</td>
                        <td>{x.course}</td>
                        <td>
                            <button onClick={() => allotRoom(x.roll)} className="btn btn-sm btn-success mx-1">ACCEPT</button>
                        </td>
                    </tr>)
                    }
                </tbody>
                </table>
            </div>
            } 
          </>
        }


        {
          props.state && getRoom().status.length !== 0 && 
          <>
            <h3>Occupied by</h3>
            <ul>
              { getRoom().status.map((x,index) => 
                <li key={index} x={x}>
                  <div>
                    <Link className="me-4" to={`/dashboard/student/${x}`}>{x}</Link>
                    <button onClick={() => deallot(x)}  className="btn btn-sm btn-danger me-4">Deallot</button>
                    <button onClick={() => endHostel(x)}  className="btn btn-sm btn-warning">End Hostel</button>
                  </div>
                </li>
              )}

            </ul>
          </>
        }

        </div>
      </div>
      <hr />
      <button class="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Rooms;
