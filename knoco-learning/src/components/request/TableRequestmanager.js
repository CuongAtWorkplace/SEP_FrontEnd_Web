import React from "react";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { async } from "q";
import { useEffect } from "react";
import { useState } from "react";
import { toast} from 'react-toastify';
import { BsCheck2Circle } from "react-icons/bs";
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


const TableRequestmanager = () => {
  const navigate = useNavigate();
  const [listChatRoom, setListChatRoom] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const response = await fetch(`${API_BASE_URL}/api/RequestManager/GetChatRoomByisManagerChat?check=false`);
    const data = await response.json();
    setListChatRoom(data);

  }

  const CheckedRequestManager = async (ChatRoomId) => {

    // const response = await fetch(`https://localhost:7169/api/RequestManager/GetChatRoomById/${ChatRoomId}`);
    // const data = await response.json();
    
    // const checked = {
    //   chatRoomId: data.chatRoomId,
    //   chatRoomName: data.chatRoomName,
    //   description: data.description,
    //   isManagerChat: true,
    //   classId: data.classId
    // }

    fetch(`${API_BASE_URL}/api/RequestManager/ChangeStatus/ChangeStatus/${ChatRoomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Successfull !!!")
          navigate(`/chat/${ChatRoomId}`)
        }
        else if (!response.ok) {
          toast.error("Failed. Try Again!!!")
          throw new Error('Failed to update');
        }

      })
  }
  const columns = [
    {
      Header: 'chat Room Id',
      accessor: 'chatRoomId',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'Room Name',
      accessor: 'chatRoomName',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'description',
      accessor: 'description',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'classId',
      accessor: 'classId',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Chi Tiết',
      accessor: '',
      Filter: ColumnFilter, // Custom filter component for courseId column
      disableFilters: true, // Vô hiệu hóa bộ lọc cho cột Button
      
      Cell: ({ row }) => (
       <CustomButton chatRoomId={row.original.chatRoomId} />
          

      ),
    },
  ];

  const CustomButton = ({ chatRoomId }) => (
    <div>
      <button onClick={() => CheckedRequestManager(chatRoomId)}>
         <BsCheck2Circle size={30}  />
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
      <Table columns={columns} data={listChatRoom} onRowClick={handleRowClick} />
    </div>
  )
}

export default TableRequestmanager;