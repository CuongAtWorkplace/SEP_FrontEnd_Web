import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";
import CardLearner from "../detail/learnerDetail/CardLearner";

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

const TableListLearnerInClass = (props) => {
  //const { classId } = props;
  const [data, setData] = useState([]);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isLearnerDetailPopupVisible, setLearnerDetailPopupVisible] = useState(null);
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [fileUpload, setfileUpload] = useState(null);
  const [classId, setClassId] = useState(1);
  useEffect(() => {
    fetchData();
    fetchDataFile();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/User/GetListStudentInClass/${params.classId}`); // Thay thế URL bằng API thực tế
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const fetchDataFile = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/File/GetAllFiles?classId=${params.classId}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data); // Thiết lập danh sách file từ API
      } else {
        console.error('Failed to fetch files.');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('Vui lòng chọn tệp.');
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedFile);
  

    try {
      const response = await fetch(`https://localhost:7169/api/File/UploadFiles?classId=${params.classId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Tải lên thành công!');
      fetchDataFile();
      } else {
        throw new Error('Failed to upload file.');
      }
    } catch (error) {
      console.error('Lỗi khi tải lên:', error);
    }
  };

  const handleRowClick = (learner) => {
    console.log(selectedLearner);
    setSelectedLearner(learner);
    //console.log(selectedLearner.userId);
  };
  const handleBackButtonClick = () => {
    setSelectedLearner(null); 
  };

  const openLearnerDetailPopup = (learner) => {
    setLearnerDetailPopupVisible(learner);
  }
  const closeLearnerDetailPopup = () => {
    setLearnerDetailPopupVisible(null);
  }
  const columns = [
    {
      Header: 'Full Name',
      accessor: 'fullName',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'Email',
      accessor: 'email',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Image',
      accessor: 'image',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Address',
      accessor: 'address',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
  ];

  return (
    <div>
      <Table columns={columns} data={data} onRowClick={openLearnerDetailPopup} />
      {/* <input type="file" onChange={handleFileChange} /><button onClick={handleUploadClick}>Submit</button> */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Tải lên</button>
      {files.map((file, index) => (
          <li key={index}>
            <a href={`https://localhost:7169/api/File/GetFileByName?fileName=${file.fileName}`}>
              {file.fileName}
            </a>
          </li>
        ))}
      {isLearnerDetailPopupVisible && (
        <div className="popup">
          <CardLearner learner={isLearnerDetailPopupVisible} onBackClick={closeLearnerDetailPopup} />
        </div>
      )}
    </div>

  );
}

export default TableListLearnerInClass;