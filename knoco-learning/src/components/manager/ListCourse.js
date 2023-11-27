
import Table from "./Table";
import React, { useState, useEffect } from 'react';

const ListCourse = () => {
    const [pdfURL, setPdfURL] = useState('');

    const fetchPDF = () => {
      fetch('https://localhost:7169/api/File/GetFileByNameInWeb?fileName=undefined%20%285%29.txt')
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