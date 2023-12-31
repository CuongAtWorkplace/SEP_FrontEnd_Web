
import Table from "./Table";
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../paths";
const ListCourse = () => {
    const [pdfURL, setPdfURL] = useState('');

    const fetchPDF = () => {
      fetch(`${API_BASE_URL}/api/File/GetFileByNameInWeb?fileName=Quiz-4_PRU221m_SE1611%20%281%29.pdf`)
        .then(response => response.blob())
        .then(blob => {
          const pdfURL = URL.createObjectURL(blob);
          setPdfURL(pdfURL);
        })
        .catch(error => {
          console.error('Error fetching PDF:', error);
        });
    };
  
    return (
      <div>
        <button onClick={fetchPDF}>Fetch PDF</button>
      <iframe title="PDF Viewer" src={pdfURL} width="100%" height="967px" />
      </div>
    );
  };
  
export default ListCourse;