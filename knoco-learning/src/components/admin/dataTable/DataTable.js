import { DataGrid } from "@mui/x-data-grid"
import "./dataTable.scss"
import { Link } from "react-router-dom"


const DataTable = props => {

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 80,
    renderCell: params => {
      return (
        <div className="cellAction">
          <Link to={`/${props.slug}/${params.row.userId}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
            {/* <GrView alt="" /> */}
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          // ...data.initialState,
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        pageSizeOptions={[10]}
        // pageSize={8}
        // rowsPerPageOptions={[8]}
      // checkboxSelection
      />
    </div>
  )
}

export default DataTable
