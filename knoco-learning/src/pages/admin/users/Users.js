import DataTable from "../../../components/admin/dataTable/DataTable";
import "./users.scss";
import React, { Component } from "react";
import { useState , useEffect} from "react";
import Add from "../../../components/admin/add/Add";
import { userRows } from "../../../data";


const Users = () => {
  const [open, setOpen] = useState(false);
  const [userRows, setUserRows] = useState([]); // State để lưu trữ dữ liệu người dùng

  useEffect(() => {
    // Gọi API để lấy dữ liệu người dùng khi thành phần được tạo
    fetch('https://localhost:7169/api/Admin/GetListUser') // Thay đổi URL thành đường dẫn API thực tế
      .then((response) => response.json())
      .then((data) => {
        // Cập nhật state với dữ liệu người dùng từ phản hồi API
        setUserRows(data);
      })
      .catch((error) => {
        console.error('Lỗi gọi API:', error);
      });
  }, []);

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


  const columns = [
    { field: "id", headerName: "UserId", width: 90 },
    {
      field: "img",
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
      field: "createdAt",
      headerName: "Address",
      width: 180,
      type: "string",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      type: "string",
    },
  ];

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