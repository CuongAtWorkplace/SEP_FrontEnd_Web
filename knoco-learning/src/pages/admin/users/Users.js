import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import DataTable from "../../../components/admin/dataTable/DataTable";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import Add from "../../../components/admin/add/Add";
import '../users/users.scss';
import 'bootstrap/dist/css/bootstrap.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      ListUser: [],
    }
  }

  getListUser = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/Admin/GetListUser`);
      const data = await response.json();
      this.setState({ ListUser: data.map((user, index) => ({ ...user, id: index })) });
    } catch (error) {
      console.error('Lỗi gọi API', error);
    }
  }

  async componentDidMount() {
    await this.getListUser();
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    })
  }

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    })
  }

  createNewUser = async (data) => {
    try {
      const response = await fetch(`https://localhost:7169/api/Admin/AddNewUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(data);

      if (response.ok) {
        alert('User added successfully');
        await this.getListUser();
        this.setState({
          isOpenModal: false
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to add user:', errorData);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Error occurred. Check console for details.');
    }
  };

  render() {

    const { ListUser } = this.state;
    const columns = [
      { field: "userId", headerName: "ID", width: 90 },
      {
        field: "image",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => {
          if(params != null){
            return <img src={params.row.image} alt="" />;
          } else{
            return <img src={"/noavatar.png"} alt="" />;
          }
          // return <img src={params.row.image || "/noavatar.png"} alt="" />;
        },
      },
      {
        field: "fullName",
        headerName: "Full Name",
        width: 200,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 170,
      },
      {
        field: "address",
        headerName: "Address",
        width: 180,
      },
    ];

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
                  <div className="mx-1">
                    <button className="btn btn-primary" onClick={() => { this.handleAddNewUser() }}>
                      <i className="fas fa-plus"></i>Add New User</button>
                  </div>
                  <Add
                    isOpen={this.state.isOpenModal}
                    toggleModal={this.toggleModal}
                    createNewUser={this.createNewUser}
                  />
                </div>
                <DataTable slug="users" columns={columns} rows={ListUser} />
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
};

export default Users;
