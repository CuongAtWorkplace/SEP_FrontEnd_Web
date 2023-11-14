import "./add.scss";
import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      role: '',
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
    const arrInput = ['fullName', 'email', 'password', 'phone', 'role', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        return false;
      }
    }
    return true;
  }

  handleAddNewUser = () => {
    if (this.checkValidInput()) {
      this.props.createNewUser(this.state);
    } else {
      // You might want to handle validation messages in a more user-friendly way
      alert('Please fill in all required fields.');
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
                <label>Full Name</label>
                <input type="text" className="form-control" placeholder="Enter Fullname" required
                  onChange={(event) => { this.handleOnChangeInput(event, "fullName") }} value={this.state.fullName} />
              </div>
              <div className="col-6 form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter Email" required
                  onChange={(event) => { this.handleOnChangeInput(event, "email") }} value={this.state.email} />
              </div>
              <div className="col-6 form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter Password" required
                  onChange={(event) => { this.handleOnChangeInput(event, "password") }} value={this.state.password} />
              </div>
              <div className="col-6 form-group">
                <label>Phone</label>
                <input type="text" className="form-control" placeholder="Enter phone" required maxLength={10}
                  onChange={(event) => { this.handleOnChangeInput(event, "phone") }} value={this.state.phone} />
              </div>
              <div className="col-6 form-group">
                <label>Role</label>
                <select className="form-control" required onChange={(event) => { this.handleOnChangeInput(event, "role") }} value={this.state.role}>
                  <option value="None">None</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Manager">Manager</option>
                </select>
                {/* <input type="text" className="form-control" placeholder="Enter Role" required
                  onChange={(event) => { this.handleOnChangeInput(event, "status") }} value={this.state.status} /> */}
              </div>
              <div className="col-12 form-group">
                <label>Address</label>
                <input type="text" className="form-control" placeholder="Enter address"
                  onChange={(event) => { this.handleOnChangeInput(event, "address") }} value={this.state.address} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { this.handleAddNewUser() }}>Add</Button>{' '}
          <Button color="secondary" onClick={() => { this.toggle() }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
};

export default Add;
