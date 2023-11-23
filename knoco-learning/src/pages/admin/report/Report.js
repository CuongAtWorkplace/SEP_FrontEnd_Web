import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListReport: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  async componentDidMount() {
    await this.getListReport();
  };

  getListReport = async () => {
    try {
      const response = await fetch('https://localhost:7169/api/Admin/GetListReport');
      if (response.ok) {
        const data = await response.json();
        this.setState({ ListReport: data });
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0,
    });
  };


  render() {
    const { ListReport, page, rowsPerPage } = this.state;

    const columns = [
      { id: 'reportUserId', label: 'ID', minWidth: 50 },
      { id: 'fromAccountName', label: 'Form User', minWidth: 150 },
      {
        id: 'toAccountName',
        label: 'To User',
        minWidth: 170,
      },
      {
        id: 'description',
        label: 'Description',
        minWidth: 200,
      },
      {
        id: 'createDate',
        label: 'Create Date',
        minWidth: 250,
        format: (value) => {
          const date = new Date(value); // Chuyển giá trị thành đối tượng Date
          const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (lưu ý rằng tháng trong JavaScript bắt đầu từ 0)
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        },
      },
      {
        id: 'reason',
        label: 'Reason',
        minWidth: 200,
      },
      {
        id: 'isChecked',
        label: 'Status',
        minWidth: 170,
      },
    ];

    return (
      <div>
        <div className="body_page">
          <section id="menu">
            <div className="logo">
              <FontAwesomeIcon className="logo-icon" icon={faBook} />
              <h1>Knoco</h1>
            </div>

            <nav>
              <SideBar />
            </nav>
          </section>

          <section id="interface">
            <header>
              <Header />
            </header>
            <div className="tableLayout">
              <div className="users">
                <div className="info">
                  <h1>Report</h1>
                </div>

                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ListReport
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.reportUserId}>
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={ListReport.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />
                </Paper>

              </div>
            </div>

            <footer>
              <Footer />
            </footer>
          </section>
        </div>
      </div>
    );
  };
}

export default Report;
