import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRoom = (props) => {

    const [number, setNumber] = useState()
    const [desc, setDesc] = useState()
    const [block, setBlock] = useState(props.state.block_access[0])
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setDisable(true)

        const auth_header = { 'auth-token': props.state.token??null }
        const url = props.apiLink
        const req_body = { block: block, desc: desc, room_no: number }

        axios({ url: `${url}/api/room/add/${block}`, method: "POST", headers: auth_header, data: req_body })
          .then((res) => {
              let response = {
                "_id": res.data.room,
                "block": block,
                "desc": desc,
                "room_no": number,
                "status": [],
                "__v": 0,
                "date": Date.now()
              }
              
               props.setState({
                   ...props.state,
                   room: [...props.state.room, response]
               })

              navigate(-1)
           })
          .catch((err) => {
            if(err.response.status === 400 || err.response.status === 401){
                localStorage.removeItem("state");
                navigate("/")
            }

            setDisable(false)
          });
    }

    const handleChange = (e) => {
        if(e.target.name === 'number') setNumber(e.target.value)
        if(e.target.name === 'block') setBlock(e.target.value)
        if(e.target.name === 'desc') setDesc(e.target.value) 
    }

    return(
        <div className="container my-5">
            <div className="row text-white ">
                <div className="bg-info rounded col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1 className='pb-4'>Add Room</h1>
                    
                    <div className="px-2">

                        <form onSubmit={handleSubmit} className="justify-content-center">
                            <div className="form-group mb-2">
                                <input name="number" type="text" className="form-control" placeholder="Room no" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="desc" type="text" className="form-control" placeholder="Description" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <select name="block" className="form-select" onChange={ (e) => handleChange(e)}>
                                { props.state && props.state.static.block.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
                            </select>
                            <button type="submit" disabled={disable} className="btn btn-primary btn-sm m-2">
                            { !disable && "Add"}
                                { disable &&
                                    <div className="spinner-grow text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </button>
                        </form>
                        
                    </div>

                </div>
            </div>

            <hr />
      <button className="btn btn-danger" onClick={() => navigate(-1)}>Back</button>

        </div>
    )
}

export default AddRoom