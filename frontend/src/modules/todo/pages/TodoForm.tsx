import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorToast, successToast } from "../../../common/Toastify";
import { callAxios } from "../../../plugins/axios";

const TodoForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: "",
    title: "",
    content: "",
    status: false,
    due_date: "",
  });
  const onSubmitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      if (!params.id) {
        var res = await callAxios({
          url: "todo",
          method: "POST",
          data: data,
        });
      } else {
        var res = await callAxios({
          url: `todo/${params.id}`,
          method: "PUT",
          data: data,
        });
      }
      res?.data?.status === 1
        ? successToast(res?.data?.message) && navigate("/todo")
        : Object.values(res?.response.data.message).map((v: any) =>
            errorToast(v[0])
          ) ?? errorToast(res?.data?.error);
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

  const loadData = async () => {
    let res = await callAxios({
      url: `todo/${params.id}`,
      method: "GET",
    });
    try {
      setData(res?.data?.data);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  useEffect(() => {
    if (!!params.id) {
      loadData();
    }
  }, [params.id]);

  return (
    <>
      <form
        className="d-grid w-40 m-0-auto mt-p-1"
        onSubmit={(e: any) => onSubmitHandler(e)}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Your title here"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.title ?? null}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          cols={10}
          rows={10}
          onChange={(e: any) => onChangeHandler(e)}
          value={data.content ?? null}
          placeholder="Your content here"
        ></textarea>
        <label htmlFor="due_date">Due Date</label>
        <input
          type="date"
          name="due_date"
          placeholder="YYYY-MM-DD"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.due_date ?? null}
        />
        <label htmlFor="status">Status</label>
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={(e: any) => onChangeHandler(e)}
            name="status"
            value={"false"}
            checked={data?.status.toString() === "false" ?? null}
            className="mr-1"
          />
          <label htmlFor="true-checkbox">Pending</label>
          <br />
          <br />
          <input
            type="checkbox"
            onChange={(e: any) => onChangeHandler(e)}
            name="status"
            checked={data?.status.toString() == "true" ?? null}
            value={"true"}
            className="mr-1"
          />
          <label htmlFor="true-checkbox">Completed</label>
        </div>
        <div className="d-flex jc-center">
          <button type="submit" className="btn" style={{ width: "40%" }}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
