import { useEffect, useState } from "react";
import { callAxios } from "../../../plugins/axios";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
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
  const [sorting, setSorting] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const loadData = async () => {
    let res = await callAxios({
      url: "todo",
      method: "GET",
    });

    try {
      setData(res?.data?.data);
    } catch (error) {
      errorToast("Something went wrong");
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

  const onClickSortHandler = () => {
    sorting === true ? setSorting(false) : setSorting(true);
  };

  const onFilterStatusHandler = () => {
    statusFilter === "true"
      ? setStatusFilter("false")
      : statusFilter === "false"
      ? setStatusFilter("")
      : statusFilter === ""
      ? setStatusFilter("true")
      : setStatusFilter("");
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
        : Object.values(res?.response.data.message).map((v: any) =>
            errorToast(v[0])
          ) ?? errorToast(res?.data?.error);
    } catch (error) {
      errorToast("Something went wrong");
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
          onClick={() => {
            onFilterStatusHandler();
          }}
          className="d-flex w-20 btn jc-space-around"
        >
          {statusFilter === "true" ? (
            <>
              Completed
              <span className="mr-1"></span>
              <AiOutlineArrowDown size={16} />
            </>
          ) : statusFilter === "false" ? (
            <>
              Pending
              <span className="mr-1"></span>
              <AiOutlineArrowUp size={16} />
            </>
          ) : (
            <>
              Show All
              <span className="mr-1"></span>
              <GoThreeBars />
            </>
          )}
        </button>
        <button
          onClick={() => {
            onClickSortHandler();
          }}
          className="d-flex w-20 btn jc-space-around"
        >
          Sorting
          <span className="mr-1"></span>
          {sorting === true ? (
            <AiOutlineArrowDown size={16} />
          ) : (
            <AiOutlineArrowUp size={16} />
          )}
        </button>
        <button
          onClick={() => logoutActionHandler()}
          className="d-flex w-20 btn"
        >
          Logout
        </button>
      </div>
      <div className="mt-3 jc-center" style={{ overflowX: "scroll" }}>
        {!!data ? (
          <table>
            {tableHeader}
            {data
              .filter((data) =>
                statusFilter === ""
                  ? data.status.toString()
                  : data.status.toString() === statusFilter
              )
              .sort((a, b) =>
                sorting === true
                  ? a.due_date < b.due_date
                    ? -1
                    : 1
                  : a.due_date > b.due_date
                  ? -1
                  : 1
              )
              .map((data, index) => (
                <tr key={index}>
                  <td width={"5%"}>{index + 1}</td>
                  <td width={"15%"}>{data?.title}</td>
                  <td width={"40%"}>{data?.content}</td>
                  <td width={"10%"}>{data?.due_date ?? "-"}</td>
                  <td
                    width={"10%"}
                    className={
                      data?.status.toString() === "true"
                        ? "text-green"
                        : "text-red"
                    }
                  >
                    {data?.status.toString() === "true"
                      ? "Completed"
                      : "Pending" ?? "-"}
                  </td>
                  <td width={"2%"}>
                    <button
                      onClick={() => actionButtonHandler(data?.id.toString())}
                      className="border-none mr-2"
                    >
                      <AiFillEdit size={20} />
                    </button>
                    <button
                      onClick={() => deleteActionHandler(data?.id.toString())}
                      className="border-none"
                    >
                      <AiFillDelete size={20} className="bg-red" />
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        ) : (
          <div className="text-center">No data found</div>
        )}
      </div>
    </>
  );
};

export default Todo;
