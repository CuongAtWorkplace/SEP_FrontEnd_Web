import React from "react";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { async } from "q";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import jwtDecode from "jwt-decode";
import { BsCheck2Circle } from "react-icons/bs";
import { display } from "@mui/system";
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


const TableRequestClassManager = () => {
    const [listClassRequest, setListClassRequest] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const response = await fetch(`https://localhost:7169/api/Class/ListRequestClassManager`);
        const data = await response.json();
        setListClassRequest(data);

    }
    const UpdateRequestClass = (classID, userID) => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);

            const updateRequest = {
                classId: classID,
                teacherId: userID
            }
            fetch('https://localhost:7169/api/Class/RequestClass', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateRequest),
            })
                .then((response) => {
                    if (response.ok) {
                        // window.confirm("Are you sure you want to teach this class?") ? navigate(`/classdetail/${classId}`) : window.close();
                        toast.success("Successfull !!!");
                    }
                    else if (!response.ok) {
                        toast.error("Failed. Try Again!!!")
                        throw new Error('Failed to update');
                    }

                })

        }
    }

    const CheckedRequestManager = async (classRequestId,classId, userId) => {

    
        const classR = {
            requestClassId: classRequestId,
            type: true
        }

        fetch(`https://localhost:7169/api/Class/UpdateTypeClassRequest`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classR)
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Successfull !!!")
                     UpdateRequestClass(classId, userId);
                     fetchData();
                }
                else if (!response.ok) {
                    toast.error("Failed. Try Again!!!")
                    throw new Error('Failed to update');
                }

            })
    }

    const RejectRequestManager = async (classRequestId,classId, userId) => {

    
        const classR = {
            requestClassId: classRequestId,
            type: false
        }

        fetch(`https://localhost:7169/api/Class/UpdateTypeClassRequest`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classR)
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Successfull !!!")
                     fetchData();
                }
                else if (!response.ok) {
                    toast.error("Failed. Try Again!!!")
                    throw new Error('Failed to update');
                }

            })
    }
    const columns = [
        {
            Header: 'Request Id',
            accessor: 'requestClassId',
            Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
            Header: 'User Name',
            accessor: 'userId',
            Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
            Header: 'Class Name',
            accessor: 'classId',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Chi Tiết',
            accessor: '',
            Filter: ColumnFilter, // Custom filter component for courseId column
            disableFilters: true, // Vô hiệu hóa bộ lọc cho cột Button

            Cell: ({ row }) => (
                <div >
                    <a>
                          <CustomButtonAccess classId ={row.original.classId} userId={row.original.userId} requestClassId={row.original.requestClassId} />
                    </a>
                    <a>
                          <CustomButtonReject classId ={row.original.classId} userId={row.original.userId} requestClassId={row.original.requestClassId} />
                    </a>          

                </div>
               

            ),
        },
    ];

    const CustomButtonAccess = ({ classId, userId, requestClassId }) => (
        <div>
            <button onClick={() => CheckedRequestManager(requestClassId,classId,userId,)}>
                <BsCheck2Circle size={30} />
            </button>

        </div>
    );
    const CustomButtonReject = ({ classId, userId, requestClassId }) => (
        <div>
            <button onClick={() => RejectRequestManager(requestClassId,classId,userId,)}>
                <BsCheck2Circle size={30} />
            </button>

        </div>
    );
    const handleRowClick = (row) => {
        console.log('Clicked row data:', row);
        const postId = row.chatRoomId
        // navigate(`/viewpostdetailmanager/${postId}`);
    };
    return (
        <div>
            <Table columns={columns} data={listClassRequest} onRowClick={handleRowClick} />
        </div>
    )
}

export default TableRequestClassManager;