import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import "../Table/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import jwtDecode from "jwt-decode";
import '../../style/Teacher/Tag.css';
import CardAddClass from "../add/CardAddClass";
import Table from "../Table/Table";
import { API_BASE_URL } from "../../paths";
const ColumnFilter = ({ column }) => {
    const { setFilter } = column;
    return (
        <input
            type="text"
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Filter ${column.Header}`}
        />
    );
};

const ViewAllClass = ({ children, ...props }) => {
    const UserID = 4;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [isAddClassPopupVisible, setAddClassPopupVisible] = useState(false);
    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            if (Number(decodedToken.roleid) === 4 || localStorage.getItem("token") === '') {

            } else if (Number(decodedToken.roleid) === 3) {
                setIsManager(true);
            } else {
                navigate(`/`);
            }
        } else {
            navigate(`/`);
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);

        try {
            const response = await fetch(`${API_BASE_URL}/api/Class/GetAllClassManage`);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const openAddClassPopup = () => {
        setAddClassPopupVisible(true);
    }

    const closeAddClassPopup = () => {
        setAddClassPopupVisible(false);
    }

    function formatAPIDate(apiDate) {
        return new Date(apiDate).toLocaleDateString('en-US');
    }

    const [columns, setColumns] = useState([
        {
            Header: 'Class name',
            accessor: 'className',
            Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
            Header: 'Teacher name',
            accessor: 'teacherName',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Course name',
            accessor: 'courseName',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Number student',
            accessor: 'numberStudent',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Topic',
            accessor: 'topic',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Schedule',
            accessor: 'schedule',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Fee',
            accessor: 'fee',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Number in week',
            accessor: 'numberOfWeek',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Create date',
            accessor: 'createDate',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ row }) => (
                <div>
                    {formatAPIDate(row.original.createDate)}
                </div>
            ),
        },
        {
            Header: 'Start date',
            accessor: 'startDate',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ row }) => (
                <div>
                    {formatAPIDate(row.original.startDate)}
                </div>
            ),
        },
        {
            Header: 'End date',
            accessor: 'endDate',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ row }) => (
                <div>
                    {formatAPIDate(row.original.endDate)}
                </div>
            ),
        },
        {
            Header: 'Status',
            accessor: 'status',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ row }) => (
                <CustomButton isActive={row.original.status} />
            ),
        },
    ]);
    const CustomButton = ({ isActive }) => (
        <div>
            <span></span>
            {isActive === 1 ? (
                <button>Active</button>
            ) : (
                <button>Close</button>
            )}
        </div>
    );
    const handleRowClick = (row) => {
        console.log('Clicked row data:', row);
    };

    return (
        <div className="body_page" {...props}>
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

                <div className="children">
                    <div>
                        {
                            isManager == true &&
                            <button className="btn-add" onClick={openAddClassPopup}><FontAwesomeIcon icon={faSquarePlus} /> New class</button>
                        }

                        <Table columns={columns} data={data} onRowClick={handleRowClick} />
                        {
                            isAddClassPopupVisible && (
                                <div className="popup">
                                    <CardAddClass closePopup={closeAddClassPopup} />
                                </div>
                            )
                        }
                    </div>
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>

    );
};

export default memo(ViewAllClass);