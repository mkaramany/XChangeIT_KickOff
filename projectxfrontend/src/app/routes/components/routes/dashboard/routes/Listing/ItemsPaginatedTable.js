import { Table, TableBody, TableFooter, TablePagination, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import ItemCardDetails from "./ItemCardDetails";

const ItemsPaginatedTable = (props) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    console.log("handleChangeRowsPerPage", event.target.value);
    setRowsPerPage(event.target.value);
  };

  return (

            <Table>
              <TableBody>
                {props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) =>
                  <TableRow>
                    <ItemCardDetails key={index} item={item} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={props.items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
  );
}

export default ItemsPaginatedTable;
