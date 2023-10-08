import React, { useState, useEffect } from "react";
import './style.css'

const CardClass = (props) => {
    const { classId } = props;
    const [classDt, setClassDt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetClassDetailById/ClassDetail/${1}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    return (
        <div className="container">
          {classDt ? (
            <div className="classDetail">
              <h2>Class Name: {classDt.className}</h2>
              <p>Teacher Name: {classDt.teacherName}</p>
              <p>Course Name: {classDt.courseName}</p>
              <p>Number Student: {classDt.numberStudent}</p>
              <p>Topic: {classDt.topic}</p>
              <p>Quizze Name: {classDt.quizzeName}</p>
              <p>Schedule: {classDt.schedule}</p>
              <p>Fee: {classDt.fee}</p>
              <p>Number Of Week: {classDt.numberOfWeek}</p>
              <p>Number Phone: {classDt.numberPhone}</p>
              <p>Description: {classDt.description}</p>
              <p>Create Date: {classDt.createDate}</p>
              <p>Start date: {classDt.startDate}</p>
              <p>End date: {classDt.endDate}</p>
            </div>
          ) : (
            <p>Loading class information...</p>
          )}
        </div>
      );
}

export default CardClass;