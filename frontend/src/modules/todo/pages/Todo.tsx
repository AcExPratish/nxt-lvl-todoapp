import { useEffect, useState } from "react";
import { callAxios } from "../../../plugins/axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../../common/Toastify";

const Todo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: "",
      title: "",
      content: "",
      status: "",
      due_date: "",
    },
  ]);

  const loadData = async () => {
    let res = await callAxios({
      url: "todo",
      method: "GET",
    });

    try {
      setData(res?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const tableHeader = (
    <tr>
      <th>S.N</th>
      <th>Title</th>
      <th>Content</th>
      <th>Due Date</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  );

  const actionButtonHandler = (id: string) => {
    navigate(`/todo/${id}`);
  };

  const logoutActionHandler = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/auth");
  };

  const deleteActionHandler = async (id: string) => {
    let res = await callAxios({
      url: `todo/${id}`,
      method: "DELETE",
    });

    try {
      res?.data?.status === 1
        ? successToast(res?.data?.message) && loadData()
        : errorToast(res?.data?.message) ?? errorToast(res?.data?.error);
    } catch (error) {
      errorToast(res?.data?.error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="d-flex w-100 jc-space-around">
        <button
          onClick={() => {
            navigate("/todo/store");
          }}
          className="d-flex w-20 btn"
        >
          Add new task
        </button>
        <button
          onClick={() => logoutActionHandler()}
          className="d-flex w-20 btn"
        >
          Logout
        </button>
      </div>
      <div className="d-grid mt-3">
        {!!data ? (
          <table>
            {tableHeader}
            {data.map((data, index) => (
              <tr key={index}>
                <td width={"5%"}>{index + 1}</td>
                <td width={"15%"}>{data?.title}</td>
                <td width={"40%"}>{data?.content}</td>
                <td width={"10%"}>{data?.due_date ?? "-"}</td>
                <td width={"10%"}>{data?.status.toString() ?? "-"}</td>
                <td width={"10%"}>
                  <button
                    onClick={() => actionButtonHandler(data?.id.toString())}
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteActionHandler(data?.id.toString())}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          "no data found"
        )}
      </div>
    </>
  );
};

export default Todo;
