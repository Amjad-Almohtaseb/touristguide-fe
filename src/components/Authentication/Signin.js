import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { signin } from "../../store/actions/authActions";
import { fetchUsers } from "../../store/actions/userActions";

const Signin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const users = useSelector((state) => state.users.users);
  const userLoading = useSelector((state) => state.users.loading);
  if (userLoading) return <Spinner />;

  const onSubmit = (data) => {
    const user = users.find((user) => user.username === data.username);
    let userType;
    if (user) userType = user.type;
    if (userType === "user") data.type = "user";
    else data.type = "guide";
    dispatch(signin(data, history));
  };
  return (
    <>
      <center>
        <form className=" w-96 mt-24" onSubmit={handleSubmit(onSubmit)}>
          <img
            className="w-16 h-16 mb-4 "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwTjoR2VIWLrwQywsGICEPAZpd1AR4T6PWUG6h2OdX1ZiZcBq7Lgdy5hJHpXyUut6r6BY&usqp=CAU"
            alt="logo"
          />
          <h4 className="text-color">Signin</h4>

          <input
            placeholder="enter your username"
            id="username"
            type="text"
            className="form-control my-2 h-12 "
            {...register("username", { required: true })}
          />
          {errors.username && errors.username.type === "required" && (
            <span role="alert">username is required</span>
          )}

          <input
            placeholder="********"
            id="password"
            // type={password ? "password" : "text"}
            type="password"
            className="form-control h-12"
            {...register("password", { required: true })}
          />

          {errors.password && errors.password.type === "required" && (
            <span role="alert"> password is required</span>
          )}
          <br />
          <button className="btn button-color w-96 mb-2" type="submit">
            ‏ SIGN IN
          </button>
          <p>
            <Link
              style={{ color: "#14213d" }}
              className="link text-sm"
              to={{ pathname: "/signup", state: { type: "user", counter: -2 } }}
            >
              &nbsp; Don't have an account? signup
            </Link>
          </p>
        </form>
      </center>
    </>
  );
};

export default Signin;
