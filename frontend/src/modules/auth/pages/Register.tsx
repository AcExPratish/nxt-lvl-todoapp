import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../common/Toastify";
import { callAxios } from "../../../plugins/axios";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    let res = await callAxios({
      url: "auth/register",
      method: "POST",
      data: data,
    });
    console.log(res);

    try {
      res?.data?.status === 1
        ? successToast(res?.data?.message) && navigate("/")
        : errorToast(res?.data?.error);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  const onChangeHandler = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form
        onSubmit={(e: any) => onSubmitHandler(e)}
        className="d-grid w-40 pa-login-center"
        style={{ top: "18%" }}
      >
        <img
          src="https://imgs.search.brave.com/83HboQzSatpZnFBKKB6XQDVnIgl0FWIz5ef5ATYo2Fc/rs:fit:938:980:1/g:ce/aHR0cHM6Ly93d3cu/cGluY2xpcGFydC5j/b20vcGljZGlyL2Jp/Zy81OC01ODczNjhf/c3BhZGUtc3ZnLXBu/Zy1pY29uLWZyZWUt/ZG93bmxvYWQtMTM3/NjgwLW1lZGljYWwu/cG5n"
          alt="logo"
          width={"120px"}
          className="m-0-auto"
        />
        <label htmlFor="full_name" className="mt-2">
          Full Name
        </label>
        <input
          type="text"
          required
          placeholder="Full Name"
          name="full_name"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.full_name}
        />
        <label htmlFor="username" className="mt-2">
          Username
        </label>
        <input
          type="text"
          required
          placeholder="Username"
          name="username"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.username}
        />
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <input
          type="email"
          required
          placeholder="Email"
          name="email"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          placeholder="Password"
          name="password"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.password}
        />
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input
          type="password"
          required
          placeholder="Confirm Password"
          name="password_confirmation"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.password_confirmation}
        />
        <div className="w-100 d-flex ac-center jc-center">
          <button type="submit" className="btn" style={{ width: "40%" }}>
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
