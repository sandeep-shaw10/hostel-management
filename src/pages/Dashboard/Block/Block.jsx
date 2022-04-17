import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Block = (props) => {

  const navigate = useNavigate()

  return (
    <div>
      <h1>Blocks</h1>

      <div className="container">
        <div className="row">

            {
                props.state && props.state.static && props.state.static.block.map( x => 
                    <div key={x.id} className="col-md-6 my-2 ">
                        <div class="card shadow rounded">
                            <h5 class="card-header">{x.name}</h5>
                            <div class="card-body">
                                <h5 class="card-title">{x.type} Hostel</h5>
                                <p class="card-text">{x.desc}</p>
                                <Link to={x.id} class="btn btn-primary">Check Rooms</Link>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
      </div>

      <hr />
      <button class="btn btn-danger" onClick={() => navigate(-1)}>Back</button>

    </div>
  );
};

export default Block;
