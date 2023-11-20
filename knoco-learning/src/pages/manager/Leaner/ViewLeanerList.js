import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import DataTable from "../../../components/admin/dataTable/DataTable";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";

class ViewLeanerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListLeaner: [],
        }
    }

    getListUser = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetListLeaner/GetListLeaner`);
            const data = await response.json();
            this.setState({ ListLeaner: data.map((user, index) => ({ ...user, id: index })) });
        } catch (error) {
            console.error('Lỗi gọi API', error);
        }
    }

    async componentDidMount() {
        await this.getListUser();
    };

    render() {

        const { ListLeaner } = this.state;
        const columns = [
            { field: "userId", headerName: "ID", width: 90 },
            {
                field: "image",
                headerName: "Avatar",
                width: 100,
                renderCell: (params) => {
                    return <img src={params.row.image || "/noavatar.png"} alt="" />;
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
                width: 180,
            },
            {
                field: "address",
                headerName: "Address",
                width: 180,
            },
            // {
            //     field: "status",
            //     headerName: "Status",
            //     width: 100,
            // },
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
                                    <h1>Leaner List</h1>
                                </div>
                                <DataTable slug="users" columns={columns} rows={ListLeaner} />
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

export default ViewLeanerList;