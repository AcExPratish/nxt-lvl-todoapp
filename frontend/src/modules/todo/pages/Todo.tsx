import { useEffect, useState } from "react";
import { callAxios } from "../../../plugins/axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

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

  const deleteActionHandler = async (id: string) => {
    let res = await callAxios({
      url: `todo/${id}`,
      method: "DELETE",
    });

    try {
      res?.data?.status === 1 ? loadData() : console.log("error");
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="d-grid">
        <Link to={"/todo/store"} className="d-flex w-20">
          Add new task
        </Link>
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
