import React, { useState, useEffect } from "react";
import "./styles.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TextField from "@mui/material/TextField";
import axios from "axios";
import { io } from "socket.io-client";
import {
  HugeiconsTextSmallcaps,
  MajesticonsUsers,
  MaterialSymbolsCheckBoxOutline,
  MaterialSymbolsLightAddCircleOutlineRounded,
  PrimeListCheck,
} from "../../assets/icons/Icons";
import { Checkbox, CheckboxChangeEvent } from "antd";

interface SpreadsheetRow {
  id: number;
  description: string;
  category: string[];
  linkedIn: string;
  twitter: string;
  assignedTo: string;
  unsubscribed: boolean;
}

function TableComponent() {
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetRow[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [allUnsubscribed, setAllUnsubscribed] = useState<boolean>(false);
  const [newRow, setNewRow] = useState<SpreadsheetRow>({
    id: Date.now(),
    description: "",
    category: [],
    linkedIn: "",
    twitter: "",
    assignedTo: "",
    unsubscribed: false,
  });

  const socket = io("http://localhost:5000", { autoConnect: false });

  useEffect(() => {
    socket.connect();
    socket.on("update", (data: SpreadsheetRow[]) => {
      setSpreadsheet(data);
      setAllUnsubscribed(data.every((row: SpreadsheetRow) => row.unsubscribed));
    });

    const fetchSpreadsheet = async () => {
      try {
        const result = await axios.get("http://localhost:5000/spreadsheet");
        setSpreadsheet(result.data);
        setAllUnsubscribed(
          result.data.every((row: SpreadsheetRow) => row.unsubscribed)
        );
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchSpreadsheet();

    return () => {
      socket.off("update");
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const { name, value } = e.target;

    setSpreadsheet((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? {
              ...row,
              [name]: name === "category" ? value.split(",") : value, // Convert category input into an array
            }
          : row
      )
    );
  };

  const handleEdit = (id: number) => {
    setIsEditing(id);
  };

  const handleSave = async (id: number) => {
    const updatedRow = spreadsheet.find((row) => row.id === id);
    if (updatedRow) {
      try {
        await axios.put(`http://localhost:5000/spreadsheet/${id}`, updatedRow);
        setIsEditing(null);
      } catch (error) {
        console.error("Error updating row", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/spreadsheet/${id}`);
      setSpreadsheet((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting row", error);
    }
  };

  const handleAddRow = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Send the new row to the backend
      await axios.post("http://localhost:5000/spreadsheet", newRow);

      // Reset the newRow state for the next addition
      setNewRow({
        id: Date.now(),
        description: "",
        category: [],
        linkedIn: "",
        twitter: "",
        assignedTo: "",
        unsubscribed: false,
      });

      // Do NOT update the local state here. Wait for the Socket.IO update event.
    } catch (error) {
      console.error("Error adding row", error);
    }
  };

  const handleSelectAll = (event: CheckboxChangeEvent) => {
    const isChecked = event.target.checked;
    setAllUnsubscribed(isChecked);

    const updatedSpreadsheet = spreadsheet.map((row) => ({
      ...row,
      unsubscribed: isChecked,
    }));
    setSpreadsheet(updatedSpreadsheet);

    updatedSpreadsheet.forEach(async (row) => {
      try {
        await axios.put(`http://localhost:5000/spreadsheet/${row.id}`, row);
      } catch (error) {
        console.error("Error updating row", error);
      }
    });
  };
  return (
    <div className="spread_sheet_list light_shadow">
      <div className="window_trans_table">
        <TableContainer className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="tabel_head">
              <TableRow className="tabel_row">
                <TableCell className="tableCell">
                  <Checkbox
                    checked={allUnsubscribed}
                    indeterminate={
                      spreadsheet.some((row) => row.unsubscribed) &&
                      !spreadsheet.every((row) => row.unsubscribed)
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell className="tableCell">
                  <span className="head_icon a_flex">
                    <HugeiconsTextSmallcaps className="icon" />
                    <p>Description</p>
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="head_icon a_flex">
                    <PrimeListCheck className="icon" />
                    <p>Category</p>
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="head_icon a_flex">
                    <HugeiconsTextSmallcaps className="icon" />
                    <p>LinkedIn</p>
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="head_icon a_flex">
                    <HugeiconsTextSmallcaps className="icon" />
                    <p>Twitter</p>
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="head_icon a_flex">
                    <MajesticonsUsers className="icon" />
                    <p>Assigned To</p>
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="head_icon a_flex">
                    <MaterialSymbolsCheckBoxOutline className="icon" />
                    <p>Unsubscribed</p>
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="head_icon a_flex">
                    <MaterialSymbolsLightAddCircleOutlineRounded className="icon" />
                    <p>Add Columns</p>
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spreadsheet.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="tableCell">{index + 1}</TableCell>{" "}
                  <TableCell className="tableCell">
                    {isEditing === item.id ? (
                      <TextField
                        name="description"
                        value={item.description}
                        onChange={(e) => handleInputChange(e, item.id)}
                      />
                    ) : (
                      item.description
                    )}
                  </TableCell>
                  <TableCell className="tableCell">
                    {isEditing === item.id ? (
                      <TextField
                        name="category"
                        value={item.category.join(", ")}
                        onChange={(e) => handleInputChange(e, item.id)}
                      />
                    ) : (
                      item.category.join(", ")
                    )}
                  </TableCell>
                  <TableCell className="tableCell">
                    {isEditing === item.id ? (
                      <TextField
                        name="linkedIn"
                        value={item.linkedIn}
                        onChange={(e) => handleInputChange(e, item.id)}
                      />
                    ) : (
                      <a
                        href={item.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.linkedIn}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="tableCell">
                    {isEditing === item.id ? (
                      <TextField
                        name="twitter"
                        value={item.twitter}
                        onChange={(e) => handleInputChange(e, item.id)}
                      />
                    ) : (
                      <a
                        href={item.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.twitter}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="tableCell">
                    {isEditing === item.id ? (
                      <TextField
                        name="assignedTo"
                        value={item.assignedTo}
                        onChange={(e) => handleInputChange(e, item.id)}
                      />
                    ) : (
                      item.assignedTo
                    )}
                  </TableCell>{" "}
                  <TableCell className="tableCell">
                    <Checkbox
                      checked={item.unsubscribed}
                      onChange={(e: CheckboxChangeEvent) => {
                        const updatedRow = {
                          ...item,
                          unsubscribed: e.target.checked,
                        };
                        setSpreadsheet((prevData) =>
                          prevData.map((row) =>
                            row.id === item.id ? updatedRow : row
                          )
                        );

                        // Send the update to the backend
                        axios
                          .put(
                            `http://localhost:5000/spreadsheet/${item.id}`,
                            updatedRow
                          )
                          .catch((error) =>
                            console.error("Error updating row", error)
                          );
                      }}
                    />
                  </TableCell>
                  <TableCell className="tableCell">
                    {isEditing === item.id ? (
                      <>
                        <button onClick={() => handleSave(item.id)}>
                          Save
                        </button>
                        <button onClick={() => setIsEditing(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(item.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button onClick={handleAddRow}>Add Row</button>
      </div>
    </div>
  );
}

export default TableComponent;
