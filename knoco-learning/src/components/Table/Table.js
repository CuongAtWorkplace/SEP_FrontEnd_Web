import React from "react";
import { useTable, useSortBy, useFilters  } from "react-table";
import './Table.css'

const Table = ({columns, data, onRowClick})=>{
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
              <tr {...row.getRowProps()} 
                onClick={() => onRowClick(row.original)} // Handle row click event here
                key={i}
                className="row-clickable" // Add a CSS class for cursor pointer
                >
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