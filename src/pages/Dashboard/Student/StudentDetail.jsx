import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


const StudentDetail = (props) => {

  const navigate = useNavigate()
  const {studentRoll} = useParams()
  
  function getYear(time){
    const d = new Date(time);
    return d.getFullYear();
  }

  function applicationStatus(join, end, status){
    if(status.toString() !== "0") return ['success', 'Application Accepted']
    if(end === null) return ['danger', 'Application in Review']
    return ['warning', 'Hostel life completed']
  }

  let studentDetail = null
  if(props.state){ studentDetail = props.state.student.filter(x => x.roll === studentRoll)[0] }

  return (
    <div>

      <div className="container my-4">
        <div className="row">

        {studentDetail && 
          <>
            <h1>{studentDetail.name}</h1>
            <ul>
                <li><strong>Roll: </strong>{studentDetail.roll}</li>
                <li><strong>Email: </strong>{studentDetail.email}</li>
                <li><strong>Branch: </strong>{studentDetail.branch}</li>
                <li><strong>Course: </strong>{studentDetail.course}</li>
                <li><strong>Batch: </strong>{getYear(studentDetail.year)}</li>
                <li><strong>Gender: </strong>{(studentDetail.sex==="Boys")?'Male':'Female'}</li>
                <li><strong>Status: </strong>
                    {
                      <h5>
                          <span className={`badge btn-${applicationStatus(studentDetail.join_date, studentDetail.end_date, studentDetail.status)[0]}`}>
                              {applicationStatus(studentDetail.join_date, studentDetail.end_date, studentDetail.status)[1]}
                          </span>
                      </h5>
                    }
                    {
                      applicationStatus(studentDetail.join_date, studentDetail.end_date, studentDetail.status)[0] === 'success' &&
                      <>
                        <ul>
                          <li>Joined On: {studentDetail.join_date}</li>
                          <li><Link className="btn btn-sm btn-info" to={`/dashboard/room/${studentDetail.status}`}>Visit Room</Link></li>
                        </ul>
                      </>
                    }
                </li>
            </ul>
          </>
        }
        </div>
      </div>
      <hr />
      <button className="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default StudentDetail;
