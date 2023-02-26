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
    status: "",
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
        className="d-grid w-60 m-0-auto"
        onSubmit={(e: any) => onSubmitHandler(e)}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter your title"
          onChange={(e: any) => onChangeHandler(e)}
          value={data.title ?? null}
        />
        <div className="d-flex">
          <input
            type="text"
            name="due_date"
            className="w-50"
            placeholder="YYYY-MM-DD"
            onChange={(e: any) => onChangeHandler(e)}
            value={data.due_date ?? null}
          />
          <select
            name="status"
            className="w-50"
            placeholder="YYYY-MM-DD"
            onChange={(e: any) => onChangeHandler(e)}
            value={data.status ?? null}
          >
            <option value={0}>Pending</option>
            <option value={1}>Completed</option>
          </select>
        </div>
        <textarea
          name="content"
          cols={10}
          rows={10}
          onChange={(e: any) => onChangeHandler(e)}
          value={data.content ?? null}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default TodoForm;
