import React, { useRef } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState, useEffect, useCallback } from "react";
import { formatCurrency } from "../../utils/formatCurrency.ts";
import ConfirmReturn from "../../pages/ReturnManagement/ConfirmReturn/index.tsx";
import CustomizedDialogs from "../ModalDialog/index.tsx";
import { Link, useLocation } from "react-router-dom";

type RowData = {
  id: number;
  [key: string]: any;
};
const toDate = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD

const Table = ({
  columns,
  data,
  onEdit,
  onDelete,
  onReturn,
  onRead,
  onAction,
  currentPage,
  setCurrentPage,
  totalPages,
  isButtonDisabled,
}) => {
  const location = useLocation();
  // const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  // const [currentPageData, setCurrentPageData] = useState<RowData[]>([]);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const handleChangePage = (page) => {
  //   if (page !== currentPage) {
  //     setLoading(true);
  //     setCurrentPage(page);
  //   }
  // };

  // const updateCurrentPageData = useCallback(() => {
  //   const slicedData = data.slice(startIndex, endIndex);
  //   setCurrentPageData(slicedData);
  //   setLoading(false);
  // }, [data, startIndex, endIndex]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //     updateCurrentPageData();
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, [updateCurrentPageData]);

  // const prevPageDataLengthRef = useRef(currentPageData.length);

  // useEffect(() => {
  //   if (prevPageDataLengthRef.current > 0 && currentPageData.length === 0 && currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  //   prevPageDataLengthRef.current = currentPageData.length;
  // }, [currentPageData]);

  // useEffect(() => {
  //   if (currentPageData.length === 0 && currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }, [currentPageData]);

  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell style={{ fontWeight: "bold" }} key={column.field}>
                {column.headerName}
              </TableCell>
            ))}
            {!onAction.includes("") && (
              <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          )}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  opacity: 0.6,
                  fontSize: 20,
                }}
              >
                No data
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) =>
                  column.field === "totalPrice" ? (
                    <React.Fragment>
                      {(Number(new Date(toDate)) -
                        Number(new Date(row.borrowDate))) /
                        (1000 * 60 * 60 * 24) >
                      0 ? (
                        <TableCell key={column.field}>
                          {formatCurrency(
                            row.price *
                              row.quantity *
                              ((Number(new Date(toDate)) -
                                Number(new Date(row.borrowDate))) /
                                (1000 * 60 * 60 * 24))
                          )}{" "}
                        </TableCell>
                      ) : (
                        <TableCell key={column.field}>
                          {formatCurrency(row.price * row.quantity)}{" "}
                        </TableCell>
                      )}
                    </React.Fragment>
                  ) : column.field === "price" ? (
                    <TableCell key={column.field}>
                      {formatCurrency(row[column.field])}{" "}
                    </TableCell>
                  ) : column.field === "imgBase64" ? (
                    <TableCell key={column.field}>
                      <img
                        width={150}
                        src={`data:image/png;base64,${row[column.field]}`}
                        alt="Base64"
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={column.field}>
                      {row[column.field]}
                    </TableCell>
                  )
                )}
                <TableCell>
                  {onAction.includes("Edit") && (
                    <IconButton onClick={() => onEdit(row.id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onAction.includes("Read") && (
                    <IconButton onClick={() => onRead(row.id)}>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  )}
                  {onAction.includes("Delete") && (
                    <IconButton
                      onClick={() => onDelete(row.id)}
                      disabled={isButtonDisabled}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {onAction.includes("Return") && (
                    <CustomizedDialogs
                      button="Return Book"
                      title="Confirm Return"
                      action="Save"
                      handleSave={() => onReturn(row)}
                      content={<ConfirmReturn ticket={row} />}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </MUITable>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        {Array.from({ length: totalPages }, (_, index) => (
          <>
            {/* <Button key={index} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Button> */}
            <Button
              key={index + 1}
              component={Link}
              to={`${location.pathname}?pageNumber=${index + 1}`}
              color={currentPage === index + 1 ? "primary" : "inherit"}
            >
              {index + 1}
            </Button>
          </>
        ))}
      </Box>
    </TableContainer>
  );
};

export default Table;
