import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../common/Toastify";
import { callAxios } from "../../../plugins/axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    let res = await callAxios({
      url: "auth/login",
      method: "POST",
      data: data,
    });

    try {
      sessionStorage.setItem("accessToken", res.data.data.token);
      res?.data?.status === 1
        ? successToast(res?.data?.message) && navigate("/todo")
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
      >
        <img
          src="https://imgs.search.brave.com/83HboQzSatpZnFBKKB6XQDVnIgl0FWIz5ef5ATYo2Fc/rs:fit:938:980:1/g:ce/aHR0cHM6Ly93d3cu/cGluY2xpcGFydC5j/b20vcGljZGlyL2Jp/Zy81OC01ODczNjhf/c3BhZGUtc3ZnLXBu/Zy1pY29uLWZyZWUt/ZG93bmxvYWQtMTM3/NjgwLW1lZGljYWwu/cG5n"
          alt="logo"
          width={"120px"}
          className="m-0-auto"
        />
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <input
          type="email"
          required
          placeholder="Your email here"
          name="email"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.email}
        />
        <label htmlFor="password">Password</label>
        <input
          className=""
          type="password"
          required
          placeholder="Your password here"
          name="password"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.password}
        />
        <div className="w-100 d-flex ac-center jc-center">
          <button type="submit" className="btn" style={{ width: "40%" }}>
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
