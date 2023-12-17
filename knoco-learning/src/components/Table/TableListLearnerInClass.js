import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";
import CardLearner from "../detail/learnerDetail/CardLearner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { toast} from 'react-toastify';
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

const TableListLearnerInClass = (props) => {
  //const { classId } = props;
  const [data, setData] = useState([]);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isLearnerDetailPopupVisible, setLearnerDetailPopupVisible] = useState(null);
  const params = useParams();
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fetchData();
    fetchDataFile();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/User/GetListStudentInClass/${params.classId}`); // Thay thế URL bằng API thực tế
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const fetchDataFile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/File/GetAllFiles?classId=${params.classId}`);
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
  const validateForm = () => {
    const selectedFile = document.querySelector('.file').files[0];
  if (!selectedFile) {
    alert('Please select a file');
    return false;
  }
    const pdf = ".pdf";
    const check = "";
    const fileName = selectedFile.name;
    if (!fileName.endsWith('.pdf') || !fileName.endsWith("")) {
      alert('Please upload a PDF file');
      return false;
    }
    return true; 
};
  const handleUpload = async () => {
    if(validateForm()){
      if (!selectedFile) {
        console.log('Vui lòng chọn tệp.');
        return;
      }
  
      const formData = new FormData();
      formData.append('files', selectedFile);
  
  
      try {
        const response = await fetch(`${API_BASE_URL}/api/File/UploadFiles?classId=${params.classId}`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('Tải lên thành công!');
          toast.success("Successfull !!!")
          fetchDataFile();
        } else {
          throw new Error('Failed to upload file.');
        }
      } catch (error) {
        toast.error("Failed. Try Again!!!")
        console.error('Lỗi khi tải lên:', error);
      }
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
      Cell: ({ value }) => (
        <img
            src={`${API_BASE_URL}/Photos/${value}`} // Assuming 'value' is the image filename or path
            alt="Course Image"
            style={{ width: '50px', height: '50px' }} // Adjust the size as needed
        />
    ),
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
      <div className="box-file">
        <div className="box-upload">
          <input className="file" type="file" onChange={handleFileChange} />
          <button className="btn-item" onClick={handleUpload}>Upload</button>
        </div>
        {files.map((file, index) => (
          <li key={index}>
            <a className="" href={`${API_BASE_URL}/api/File/GetFileByName?fileName=${file.fileName}`}>
              <FontAwesomeIcon icon={faFile} /> {file.fileName}
            </a>
          </li>
        ))}
      </div>
      {isLearnerDetailPopupVisible && (
        <div className="popup">
          <CardLearner learner={isLearnerDetailPopupVisible} onBackClick={closeLearnerDetailPopup} />
        </div>
      )}
    </div>

  );
}

export default TableListLearnerInClass;