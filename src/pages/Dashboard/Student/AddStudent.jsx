import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddStudent = (props) => {

    const [email, setEmail] = useState()
    const [roll, setRoll] = useState()
    const [name, setName] = useState()
    const [year, setYear] = useState()
    const [branch, setBranch] = useState('Ceramic Technology')
    const [course, setCourse] = useState('B.Tech')
    const [sex, setSex] = useState('Boys')
    const navigate = useNavigate();
    const [disable, setDisable] = useState(false)
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        setDisable(true)

        console.log(name,roll,email,year,branch,course,sex)
        const auth_header = { 'auth-token': props.state.token }
        const url = 'http://127.0.0.1:8000'
        const req_body = {
            name: name,
            roll: roll,
            year: year,
            email: email,
            sex: sex,
            course: course,
            branch: branch,
            status: "0"
        }

        axios({ url: `${url}/api/student/add`, method: "POST", headers: auth_header, data: req_body })
          .then((res) => {
              let response = {
                "_id": res.data.student,
                "name": name,
                "roll": roll,
                "year": year,
                "email": email,
                "branch": branch,
                "course": course,
                "sex": sex,
                "join_date": null,
                "end_date": null,
                "status": "0",
                "__v": 0,
                "fee": []
              }
              props.setState({
                ...props.state,
                student: [...props.state.student, response] 
            })
              navigate(-1)
           })
          .catch((err) => {
            console.log(err.response)
          });
        
          setDisable(false)
    }

    const handleChange = (e) => {
        if(e.target.name === 'email') setEmail(e.target.value)
        if(e.target.name === 'name') setName(e.target.value)
        if(e.target.name === 'roll') setRoll(e.target.value)
        if(e.target.name === 'year') setYear(e.target.value) 
        if(e.target.name === 'branch') setBranch(e.target.value)
        if(e.target.name === 'course') setCourse(e.target.value) 
        if(e.target.name === 'sex') setSex(e.target.value)
    }

    return(
        <div className="container my-5">
            <div className="row text-white ">
                <div className="bg-info rounded col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1 className='pb-4'>Add Student</h1>
                    
                    <div className="px-2">

                        <form onSubmit={handleSubmit} className="justify-content-center">
                            <div className="form-group mb-2">
                                <input name="name" type="text" className="form-control" placeholder="Name" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="roll" type="text" className="form-control" placeholder="Roll" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="email" type="email" className="form-control" placeholder="Email ID" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input name="year" type="date" className="form-control" placeholder="Password" required
                                    onChange={ (e) => handleChange(e) }
                                />
                            </div>

                            <select name="branch" className="form-select" onChange={ (e) => handleChange(e)}>
                                <option value="">---</option>
                                { props.state && Object.keys(props.state.static.branch).map((item, i) => 
                                    <option key={i} value={props.state.static.branch[item]} >{props.state.static.branch[item]}</option>
                                )}
                            </select>

                            <select name="course" className="form-select mt-2" onChange={ (e) => handleChange(e)}>
                                <option value="">---</option>
                                { props.state && Object.keys(props.state.static.course).map((item, i) => 
                                    <option key={i} value={props.state.static.course[item]}>{props.state.static.course[item]}</option>
                                )}
                            </select>

                            <select name="sex" className="form-select mt-2" onChange={ (e) => handleChange(e)}>
                                <option value="">---</option>
                                { props.state && Object.keys(props.state.static.gender).map((item, i) => 
                                    <option key={i} value={props.state.static.gender[item]}>{props.state.static.gender[item]}</option>
                                )}
                            </select>

                            <button type="submit" className="btn btn-primary m-2" disabled={disable}>
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

export default AddStudent