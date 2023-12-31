import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import { DataGrid } from '@mui/x-data-grid';
import { API_BASE_URL } from '../../../paths';
import jwtDecode from "jwt-decode";
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListReport: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
        const decodedToken = jwtDecode(token);
       
        if ((Number(decodedToken.roleid) !== 4) || localStorage.getItem("token") === '') {
            window.location.href = "/";
        }
    }
    await this.getListReport();
  };

  getListReport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Admin/GetListReport`);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ListReport: data });
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  render() {
    const { ListReport } = this.state;
    const getRowId = (row) => row.reportUserId;
    const columns = [
      { field: "reportUserId", headerName: "ID", width: 60 },
      { field: "fromAccountName", headerName: "Form User", width: 200 },
      { field: "toAccountName", headerName: "To User", width: 200 },
      { field: "description", headerName: "Description", width: 280 },
      { field: "createDate", headerName: "Create Date", width: 150 },
      { field: "reason", headerName: "Reason", width: 200 },
      
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
            <div className="homeLayout">
              <div className="users">
                <div className="infoHomes">
                  <h1>Report</h1>
                </div>
                <div className="dataTable">
                  <DataGrid
                    className="dataGrid"
                    rows={ListReport}
                    columns={columns}
                    initialState={{
                      // ...data.initialState,
                      pagination: { paginationModel: { pageSize: 8 } },
                    }}
                    pageSizeOptions={[8]}
                    getRowId={getRowId}
                  // checkboxSelection
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
}

export default Report;
