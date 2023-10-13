import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import DataTable from "../../../components/admin/dataTable/DataTable";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import Add from "../../../components/admin/add/Add";

const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7169/api/Admin/GetListUser');
      const data = await response.json();
      setListUser(data.map((user, index) => ({ ...user, id: index }))); // Add unique id
    } catch (error) {
      console.error('Lỗi gọi API:', error);
    }
  };

  const columns = [
    { field: 'userId', headerName: 'ID', width: 90 },
    { field: 'image', headerName: 'Image', width: 100 },
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 180 },
    { field: 'address', headerName: 'Address', width: 180 },
    { field: 'isBan', headerName: 'Status', width: 100 },
  ];

  const generateRowId = (row) => row.id;

  const handleRowClick = (row) => {
    alert(`Clicked on user with ID: ${row.userId}`);
    setSelectedRow(row); // Optionally, you can set the selected row state if needed
  };
  

  return (
    <div>
      <div className="body_page">
        <section id="menu">
          <div className="logo">
            <FontAwesomeIcon className="logo-icon" icon={faBook} />
            <h1>Knoco</h1>
          </div>

          <nav>
            <SideBar />
          </nav>
        </section>

        <section id="interface">
          <header>
            <Header />
          </header>
          <div className="TableLayout">
            <div className="users">
              <div className="info">
                <h1>Users</h1>
                <button onClick={() => setOpen(true)}>Add New User</button>
              </div>
              <div className="dataTable">
                <DataGrid
                  rows={listUser}
                  columns={columns}
                  getRowId={generateRowId}
                  onRowClick={(params) => handleRowClick(params.row)}
                  selectionModel={[selectedRow]}
                />

              </div>
            </div>
          </div>

          <footer>
            <Footer />
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Users;
