import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import DataTable from "../../../components/admin/dataTable/DataTable";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import Add from "../../../components/admin/add/Add";
import '../users/users.scss';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import { API_BASE_URL } from "../../../paths";
import jwtDecode from "jwt-decode";
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/GetListUser`);
      const data = await response.json();
      this.setState({ ListUser: data.map((user, index) => ({ ...user, id: index })) });
    } catch (error) {
      console.error('Lỗi gọi API', error);
    }
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decodedToken = jwtDecode(token);

      if ((Number(decodedToken.roleid) !== 4) || localStorage.getItem("token") === '') {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
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
  UpdateActiveUser = async (userId, type) => {
    const hidePost = {
      userId: userId,
      isBan: type
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/User/ChangeIsBanUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hidePost),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        toast.error("Change status failed. Try Again!");
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error(error);
      // Xử lý lỗi nếu cần
    }
  }
  createNewUser = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Admin/AddNewUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // console.log(data);
      // .then((response) => {
      if (response.ok) {
        toast.success("Add new user successfull!")
        await this.getListUser();
        this.setState({
          isOpenModal: false
        });
        // window.location.href = "/users";
      }
      else if (!response.ok) {
        toast.error("Add new user failed. Try Again!")
        throw new Error('Failed to update');
      }

      // })
      // if (response.ok) {
      //   // alert('User added successfully');
      //   await this.getListUser();
      //   this.setState({
      //     isOpenModal: false
      //   });
      // } else {
      //   const errorData = await response.json();
      //   console.error('Failed to add user:', errorData);
      // }
    } catch (error) {
      console.error('Error occurred:', error);
      // alert('Error occurred. Check console for details.');
    }
  };

  render() {
    const { ListUser } = this.state;
    const columns = [
      { field: "userId", headerName: "ID", width: 80 },
      {
        field: "image",
        headerName: "Image",
        width: 100,
        renderCell: ({ value }) => (
          <img
            src={`${API_BASE_URL}/Photos/${value}`} // Assuming 'value' is the image filename or path
            alt=""
          />
          // renderCell: (params) => {
          //   return <img src={params.row.image || "/noavatar.png"} alt="" />;
          // },
        ),
      },
      {
        field: "fullName",
        headerName: "Full Name",
        width: 250,
      },
      {
        field: "email",
        headerName: "Email",
        width: 280,
      },

      {
        field: "phone",
        headerName: "Phone",
        width: 180,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>

              {params.row.status === "Active" &&
                <button onClick={() => this.UpdateActiveUser(params.row.userId, true)} >        {params.row.status}
                </button>
              }
              {params.row.status === "Ban" &&
                <button onClick={() => this.UpdateActiveUser(params.row.userId, false)} >        {params.row.status}
                </button>
              }


            </div>
          );
        },
      },
    ];
    // const CustomButton = ({ isActive, postId }) => (
    //   <div>
    //     <span></span>
    //     {isActive === "True" ? (
    //       <button>Đã Duyệt</button>
    //     ) : (
    //       <button onClick={() => this.UpdateActivePost(postId)}>Duyệt</button>
    //     )}
    //   </div>
    // );
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
            <div className="userLayout">
              <div className="users">
                <div className="infoHomes">
                  <div className="col-10">
                    <h1>Users</h1>
                  </div>
                  <div className=" mx-1">
                    <button className="btn btn-primary" onClick={() => { this.handleAddNewUser() }}>
                      Add New User</button>
                  </div>
                  <Add
                    isOpen={this.state.isOpenModal}
                    toggleModal={this.toggleModal}
                    createNewUser={this.createNewUser}
                  />
                </div>
                <div>
                  <DataTable slug="users" columns={columns} rows={ListUser} />
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
};

export default Users;
