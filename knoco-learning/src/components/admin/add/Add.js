import "./add.scss";
import React, { Component } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      roleName: 'None',
      address: ''
    };
  }

  toggle = () => {
    this.props.toggleModal();
  }

  handleOnChangeInput = (event, id) => {
    this.setState({
      [id]: event.target.value
    });
  }

  checkValidInput = () => {
    const arrInput = ['fullName', 'email', 'password', 'phone', 'roleName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        return false;
      }
    }
    return true;
  }

  handleAddNewUser = () => {
    //console.log('data', this.state)
    if (this.checkValidInput()) {
      this.props.createNewUser(this.state);
    } else {
      // You might want to handle validation messages in a more user-friendly way
      // alert('Please fill in all required fields.');
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user'} size="lg" >
        <ModalHeader style={{ color: 'white', backgroundColor: 'blueviolet' }} toggle={() => { this.toggle() }} >Add new</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label className="textInput">Full Name: <span className="errmsg">*</span></label>
                <TextField type="text" className="form-control" required
                  onChange={(event) => { this.handleOnChangeInput(event, "fullName") }} value={this.state.fullName} />
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Email: <span className="errmsg">*</span></label>
                <TextField type="email" className="form-control" required
                  onChange={(event) => { this.handleOnChangeInput(event, "email") }} value={this.state.email} />
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Password: <span className="errmsg">*</span></label>
                <TextField type="password" className="form-control" required
                  onChange={(event) => { this.handleOnChangeInput(event, "password") }} value={this.state.password} />
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Phone: <span className="errmsg">*</span></label>
                <TextField type="text" className="form-control" required maxLength={10}
                  onChange={(event) => { this.handleOnChangeInput(event, "phone") }} value={this.state.phone} />
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Role: <span className="errmsg">*</span></label>
                <Select className="form-control" required onChange={(event) => { this.handleOnChangeInput(event, "roleName") }} value={this.state.roleName}>
                  {/* <option></option>
                  <option value="Teacher">Teacher</option>
                  <option value="Manager">Manager</option> */}
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  {/* <MenuItem value="None">None</MenuItem> */}
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </div>
              <div className="col-12 form-group">
                <label className="textInput">Address: <span className="errmsg">*</span></label>
                <textarea type="text" className="form-control"
                  onChange={(event) => { this.handleOnChangeInput(event, "address") }} value={this.state.address} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="success" onClick={() => { this.handleAddNewUser() }}>Add</Button>{' '}
          <Button variant="contained" color="error" onClick={() => { this.toggle() }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
};

export default Add;
