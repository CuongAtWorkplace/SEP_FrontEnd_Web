import "./add.scss";
import { useState } from "react";

const Add = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isBan, setIsBan] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the data to be sent to the API based on the form inputs
    const userAdd = {
      fullName: fullName,
      email: email,
      phone: phone,
      address: address,
      status: isBan
    };

    // Send a POST request to the API
    try {
      const response = await fetch('https://localhost:7169/api/Admin/AddNewUser', {
        method: "POST",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAdd),
      });

      if (response.ok) {
        // Data added successfully, you can handle any success actions here
        console.log("Data added successfully");
      } else {
        // Handle errors if the request was not successful
        const errorResponse = await response.json();
        console.error("Error adding data. Server response:", errorResponse);
      }

      // Close the modal
      props.setOpen(false);
    } catch (error) {
      console.error("Error making the API request:", error);
    }

  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "image")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type || "text"} // Add a default type if not provided
                  name={column.field} // Set the name attribute to match the field name
                  placeholder={column.field}
                />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
