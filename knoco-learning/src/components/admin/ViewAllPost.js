import React, { useState, useEffect } from "react";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import "../../pages/manager/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import TableListPostManager from "../../components/Table/TableListPostManager";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { async } from "q";
import { BsFillPencilFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { BsCheck2Circle } from "react-icons/bs";
import Table from "../manager/Table";

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
const ViewAllPost = ({ children, ...props }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [checkActive, setCheckActive] = useState();
    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);

            // if (Number(decodedToken.roleid) !== 3 || localStorage.getItem("token") === '') {
            //     navigate(`/`);
            // }
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Post/GetAllPostALL`);
            const responseData = await response.json();
            setData(responseData);

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const columns = [
        {
            Header: 'Post Id',
            accessor: 'postId',
            Filter: ColumnFilter, // Custom filter component for courseName column

        },
        {
            Header: 'Topic',
            accessor: 'title',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Question',
            accessor: 'description',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'ContentPost',
            accessor: 'contentPost',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },

        {
            Header: 'Image',
            accessor: 'image',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ value }) => (
                <img
                    src={`https://localhost:7169/Photos/${value}`} // Assuming 'value' is the image filename or path
                    alt="Course Image"
                    style={{ width: '100px', height: '100px' }} // Adjust the size as needed
                />
            ),
        },
    ];

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
                        <Table columns={columns} data={data} />
                    </div>
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(ViewAllPost);