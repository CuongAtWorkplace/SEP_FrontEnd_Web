import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import { DataGrid } from '@mui/x-data-grid';
import { API_BASE_URL } from '../../../paths';
import jwtDecode from "jwt-decode";
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListReport: [],
        };
    }

    async componentDidMount() {
        const token = localStorage.getItem("token");
        console.log(token)
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
            const response = await fetch(`${API_BASE_URL}/api/Admin/GetListPaymentHistory`);
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
        const getRowId = (row) => row.id;
        const columns = [
            { field: "id", headerName: "ID", width: 60 },
            { field: "fromUser", headerName: "Form User", width: 200 },
            { field: "toUser", headerName: "To User", width: 200 },
            { field: "totalMoney", headerName: "Total Money", width: 280 },
            { field: "createDate", headerName: "Create Date", width: 150 },
            {
                field: "type",
                headerName: "Type",
                width: 200,
                renderCell: (params) => {
                    const { type } = params.row;

                    let displayType;
                    if (type === true) {
                        displayType = <span style={{ color: "green" }}>Cộng tiền</span>;
                    } else if (type === false) {
                        displayType = <span style={{ color: "blue" }}>Trừ tiền</span>;
                    } 
                    return <div>{displayType}</div>;
                },
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
                        <div className="homeLayout">
                            <div className="users">
                                <div className="infoHomes">
                                    <h1>Payment History</h1>
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

export default Payment;
