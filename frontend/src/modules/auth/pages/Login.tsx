import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    if (res?.data?.status === 1) {
      sessionStorage.setItem("accessToken", res?.data?.data?.token);
      navigate("/todo");
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
      <form onSubmit={(e: any) => onSubmitHandler(e)} className="d-grid">
        <input
          type="email"
          required
          placeholder="Your email here"
          name="email"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.email}
        />
        <input
          type="text"
          required
          placeholder="Your password here"
          name="password"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.password}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
