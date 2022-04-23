import React from "react";
import { Link } from "react-router-dom";
import dashboard_classes from "./Dashboard.module.css";
import student from "../../images/student.png";
import staff from "../../images/staff.png";
import room from "../../images/room.png";

const Dashboard = (props) => {
  function getBlock(id) {
    return props.state.static.block.filter((x) => x.id === id)[0];
  }

  return (
    <div>
      <h1 className={dashboard_classes.welcome}>
        WELCOME {props.state.self.name}
      </h1>
      {/*
      <ul>
        <li>Name: {props.state && props.state.self.name}</li>
        <li>Role: {props.state && props.state.self.role}</li>
        <li>EmailID: {props.state && props.state.self.email}</li>
  </ul>*/}

      <hr />
      <div className={dashboard_classes.grid_container}>
        <div className={dashboard_classes.grid_item}>
          <img src={student} alt="student" />

          <Link
            to="student"
            className={[dashboard_classes.grid_button, "mx-2 my-1"].join(" ")}
          >
            STUDENT
          </Link>
        </div>
        <div className={dashboard_classes.grid_item}>
          <img src={room} alt="room" />

          <Link
            to="room"
            className={[dashboard_classes.grid_button, "mx-2 my-1"].join(" ")}
          >
            ROOM STATUS
          </Link>
        </div>
        <div className={dashboard_classes.grid_item}>
          <img src={staff} alt="staff" />

          <Link
            to="staff"
            className={[dashboard_classes.grid_button, "mx-2 my-1"].join(" ")}
          >
            STAFF
          </Link>
        </div>
      </div>

      <hr />

      <Link
        to="block"
        className={[dashboard_classes.grid_button, "mx-2 my-1"].join(" ")}
      >
        Block View
      </Link>
      <h4>
        {props.state && props.state.block_access.length === 0 ? (
          <span className="badge bg-danger">No access</span>
        ) : (
          props.state.block_access.map((x, index) => (
            <span key={index}>
              <Link
                to={`block/${x}`}
                className={[dashboard_classes.button, "mx-2"].join(" ")}
              >
                {getBlock(x).name}
              </Link>
            </span>
          ))
        )}
      </h4>

      <hr />
    </div>
  );
};

export default Dashboard;
