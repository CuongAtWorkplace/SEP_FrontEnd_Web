import React from "react";
import { useTable, useSortBy, useFilters  } from "react-table";
import './Table.css'

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
const Table = ({columns, data})=>{
    const{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { filters, sortBy },
    } = useTable({
        columns, 
        data,
        initialState: {
            sortBy: [{ id: "courseName", desc: false }], // Default sorting column and order
          },
        },
        useFilters, // Use filters hook
        useSortBy
        )
    return(
        <div className="board">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()} key={cell.column.id}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    );
}

export default Table;