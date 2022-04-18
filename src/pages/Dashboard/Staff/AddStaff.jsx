import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStaff = (props) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [re_password, setRePassword] = useState()
    const [name, setName] = useState()
    const [role, setRole] = useState('staff')
    const [block, setBlock] = useState()
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setDisable(true)

        if(password !== re_password) return {"error": "Password Not Matching"}

        const auth_header = { 'auth-token': props.state.token??null }
        const url = props.apiLink
        const req_body = { email: email, password: password, name: name, role: role, block: block }

        axios({ url: `${url}/api/user/register`, method: "POST", headers: auth_header, data: req_body })
          .then((res) => {
              let response = {
                "_id": res.data.user,
                "role": role,
                "name": name,
                "email": email,
                "block": block,
                "__v": 0,
                "password": '__uncached__',
                "date": Date.now()
              }
              console.log(response)
              props.setState({
                  ...props.state,
                  staff: [ ...props.state.staff, response]
              })
              navigate(-1)
           })
          .catch((err) => {
              console.log(err.error)
            if(err.response.status === 400){
                localStorage.removeItem("state");
                navigate("/")
            }

            setDisable(false)
          });

    }

    const handleChange = (e) => {
        if(e.target.name === 'email') setEmail(e.target.value)
        if(e.target.name === 'password') setPassword(e.target.value)
        if(e.target.name === 'name') setName(e.target.value) 
        if(e.target.name === 'role') setRole(e.target.value) 
        if(e.target.name === 're-password') setRePassword(e.target.value)
        if(e.target.name === 'block') setBlock(e.target.value.replace(/ /g,'').split(',')) 
    }

    return(
        <div className="container my-5">
            <div className="row text-white ">
                <div className="bg-info rounded col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1 className='pb-4'>Add Staff</h1>
                    
                    <div className="px-2">

                        <form onSubmit={handleSubmit} className="justify-content-center">
                            <div className="form-group mb-2">
                                <input name="name" type="name" className="form-control" placeholder="Name" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="email" type="email" className="form-control" placeholder="Email ID" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="password" type="text" className="form-control" placeholder="Password" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="re-password" type="text" className="form-control" placeholder="Re-type Password" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="block" type="text" className="form-control" placeholder="Block Permission: 1,2,3 ... " required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <select name="role" className="form-select" onChange={ (e) => handleChange(e)}>
                                <option value="staff">Staff</option>
                                <option value="admin" disabled>Admin</option>
                            </select>
                            <button type="submit" className="btn btn-primary btn-sm m-2" disabled={disable}>
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

export default AddStaff