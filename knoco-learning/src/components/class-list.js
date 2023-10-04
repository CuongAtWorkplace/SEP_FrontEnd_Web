import { memo } from "react";
//import { Link } from "react-router-dom";
//import logo from './featured.png';
import "./comp.css";
import * as React from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
];

const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];

const ClassList = () => {
    return (
        <>
            <h3 className="i-name">
                dashboard
            </h3>

            <div className="values">
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
            </div>

            <h3 className="i-name-2">
                List Class
            </h3>

            <div className="dg-class">
                <DataGrid columns={columns} rows={rows} />
            </div>
        </>
    );
};


export default memo(ClassList);