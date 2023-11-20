import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss"
import { GrView } from 'react-icons/gr'
import { Link } from "react-router-dom"

const DataTable = props => {

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: params => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.userId}`}>
            {/* <img src="/view.svg" alt="" /> */}
            <GrView alt="" />
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
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  )
}

export default DataTable
