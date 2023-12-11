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


const TableRequestClassManager = () => {
    const [listClassRequest, setListClassRequest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const response = await fetch(`${API_BASE_URL}/api/Class/ListRequestClassManager`);
        const data = await response.json();
        setListClassRequest(data);

    }
    const UpdateRequestClass = async (ClassId,UserId) => {

        const updateRequest = {
            classId: ClassId,
            teacherId: UserId,
        }
        fetch(`${API_BASE_URL}/api/Class/RequestClass`, {
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

    const CheckedRequestManager = async (classRequestId) => {
        const commentResponse = await fetch(`${API_BASE_URL}/api/Class/GetRequestClassManager?requestId=${classRequestId}`);
        const data = await commentResponse.json();
        
        const classR = {
            requestClassId: classRequestId,
            type: true
        }

        const response = await fetch(`${API_BASE_URL}ttps://localhost:7169/api/Class/UpdateTypeClassRequest`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classR)
        });

        if (response.ok) {
            toast.success("Successfull !!!")
            await UpdateRequestClass(Number(data.classId) ,Number(data.userId));
            fetchData();
        }
        else if (!response.ok) {
            toast.error("Failed. Try Again!!!")
            throw new Error('Failed to update');
        }


    }

    const RejectRequestManager = async (classRequestId) => {

        const classR = {
            requestClassId: classRequestId,
            type: false
        }

        fetch(`${API_BASE_URL}/api/Class/UpdateTypeClassRequest`, {
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
            accessor: 'teacherName',
            Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
            Header: 'Class Name',
            accessor: 'className',
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
                        <CustomButtonAccess requestClassId={row.original.requestClassId} />
                    </a>
                    <a>
                        <CustomButtonReject requestClassId={row.original.requestClassId} />
                    </a>

                </div>


            ),
        },
    ];

    const CustomButtonAccess = ({ requestClassId }) => (
        <div>
            <button onClick={() => CheckedRequestManager(requestClassId)}>
                <BsCheck2Circle size={30} />
            </button>

        </div>
    );
    const CustomButtonReject = ({ requestClassId }) => (
        <div>
            <button onClick={() => RejectRequestManager(requestClassId)}>
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