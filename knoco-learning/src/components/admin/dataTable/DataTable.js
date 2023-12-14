import { DataGrid } from "@mui/x-data-grid"
import "./dataTable.scss"
import { Link } from "react-router-dom"
import {
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

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
        //   initialState={{
        //     // ...data.initialState,
        //     pagination: { paginationModel: { pageSize: 8 } },
        //   }}
        //   pageSizeOptions={[8]}
        //   // pageSize={8}
        //   // rowsPerPageOptions={[8]}
        // // checkboxSelection
        // disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  )
}

export default DataTable
