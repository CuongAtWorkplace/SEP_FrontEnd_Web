import { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//import { Link } from "react-router-dom";
//import logo from './featured.png';
import "./comp.css";
import * as React from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'ClassName', name: 'ClassName' },
    { key: 'TeacherName', name: 'TeacherName' },
    { key: 'CourseName', name: 'CourseName' },
    { key: 'NumberStudent', name: 'NumberStudent' },
    { key: 'Topic', name: 'Topic' },
    { key: 'Quizze', name: 'Quizze' },
    { key: 'Schedule', name: 'Schedule' },
    { key: 'Fee', name: 'Fee' },
    { key: 'NumberOfWeek', name: 'NumberOfWeek' },
    { key: 'NumberPhone', name: 'NumberPhone' },
    { key: 'Description', name: 'Description' },
    { key: 'CreateDate', name: 'CreateDate' },
    { key: 'StartDate', name: 'StartDate' },
    { key: 'EndDate', name: 'EndDate' },
    { key: 'Status', name: 'Status' },
    { key: 'IsDelete', name: 'IsDelete' },
    { key: 'TokenClass', name: 'TokenClass' }


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


            <div className="n1">
                <h3 className="i-name-2">
                    List Class
                </h3>
                <div className="search">
                    <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
                    <input type="text" placeholder="Search" />
                </div>
            </div>


            <div className="dg-class">
                <DataGrid columns={columns} rows={rows} />
            </div>
        </>
    );
};


export default memo(ClassList);