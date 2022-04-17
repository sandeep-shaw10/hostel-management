import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";


const RoomBlock = (props) => {

  const {blockId} = useParams()
  const navigate = useNavigate()

  function getBlock(id){
    return props.state.static.block.filter(x => x.id === id)[0]
  }

  function getRoom(){
    return props.state.room.filter(x => x.block === blockId)
  }

  return (
    <div>

      { props.state && props.state.static &&
        <>
          <div class="card">
            <div class="card-header"> <h1>{getBlock(blockId).name}</h1> </div>
            <div class="card-body">
              <h5 class="card-title">{getBlock(blockId).type} Hostel</h5>
              <p class="card-text"> <strong>Description:</strong> {getBlock(blockId).desc} </p>
            </div>
          </div>
        </>
      }

      <div className="container my-4">
        <div className="row">

          { props.state && props.state.room &&
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Room Number</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getRoom().map((x, index) => <tr key={x._id}>
                        <th scope="row">{index+1}</th>
                        <td><Link to={`/dashboard/room/${x._id}`}>{x.room_no}</Link></td>
                        <td>{x.desc}</td>
                        <td>
                          {x.status.length === 0 && <h5><span class="badge bg-success">Available</span></h5>}
                          {x.status.length > 0 && <h5><span class="badge bg-danger">Unavailable</span></h5>}
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
      <button class="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default RoomBlock;
