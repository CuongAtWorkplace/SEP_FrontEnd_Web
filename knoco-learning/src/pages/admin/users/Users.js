import DataTable from "../../../components/admin/dataTable/DataTable";
import "./users.scss";
import React from "react";
import { useState , useEffect} from "react";
import Add from "../../../components/admin/add/Add";
// import { userRows } from "../../../data";


const Users = () => {
  const [open, setOpen] = useState(false);
  const [userRows, setUserRows] = useState([]); // State để lưu trữ dữ liệu người dùng

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7169/api/Admin/GetListUser'); // Thay thế URL bằng API thực tế
      const data = await response.json();
      setUserRows(data);
    } catch (error) {
      console.error('Lỗi gọi API:', error);
    }
  };

  const columns = [
    { field: "userId", headerName: "UserId", width: 90 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "fullName",
      type: "string",
      headerName: "FullName",
      width: 150,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      type: "string",
      headerName: "Phone",
      width: 180,
    },
    {
      field: "address",
      headerName: "Address",
      width: 180,
      type: "string",
    },
    {
      field: "isBan",
      headerName: "Status",
      width: 100,
      type: "string",
    },
  ];

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};


  // const Users = () => {
  //   const [open, setOpen] = useState(false);

  //   return (
  //     <div className="users">
  //       <div className="info">
  //         <h1>Users</h1>
  //         <button onClick={() => setOpen(true)}>Add New User</button>
  //       </div>
  //       <DataTable slug="users" columns={columns} rows={userRows} />
  //       {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
  //     </div>
  //   );
  // };

export default Users;