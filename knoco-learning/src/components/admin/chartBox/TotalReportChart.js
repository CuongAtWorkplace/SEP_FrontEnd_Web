import React, { useEffect, useState } from "react";
import { GoReport } from 'react-icons/go'
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../paths";

const TotalReport = () => {
    const [totalReports, setTotalReports] = useState([]);

    useEffect(() => {
        fetch(API_BASE_URL + `/api/Admin/GetTotal`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Data from API:", data);
                setTotalReports(data);
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <GoReport />
                    <span>Total Reports</span>
                </div>
                <h1>{totalReports.totalReport}</h1>
                <Link to="/report" style={{ color: 'teal'}}>
                    View all
                </Link>
            </div>
        </div>
    );
};

export default TotalReport;
