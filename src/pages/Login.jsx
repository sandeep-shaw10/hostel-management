import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import login_classes from "./Login.module.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    const req_header = { "Content-Type": "application/json" };
    const req_body = { email: email, password: password };
    const url = props.apiLink;

    axios({
      url: `${url}/api/user/login`,
      method: "POST",
      headers: req_header,
      data: req_body,
    })
      .then((res) => {
        localStorage.setItem("state", JSON.stringify(res.data));
        props.setState(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

    setDisable(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };

  return (
    <>
      <div className="row text-white ">
        <div className="  col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
          <h1 className="pb-4">WELCOME</h1>

          <div className="px-2">
            <form onSubmit={handleSubmit} className="justify-content-center">
              <div className="form-group mb-2">
                <input
                  name="email"
                  type="email"
                  className={[login_classes.form_input, "form-control "].join(
                    " "
                  )}
                  placeholder="Email ID"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  name="password"
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-sm mb-2"
                disabled={disable}
              >
                {!disable && "Login"}
                {disable && (
                  <div className="spinner-grow text-light" role="status">
                    Loading...<span className="visually-hidden"></span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
