import React, { useState, useEffect } from "react";
import "./styles.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
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
    });

    const fetchSpreadsheet = async () => {
      try {
        const result = await axios.get("http://localhost:5000/spreadsheet");
        setSpreadsheet(result.data);
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
      const response = await axios.post(
        "http://localhost:5000/spreadsheet",
        newRow
      );
      setSpreadsheet((prevData) => [...prevData, response.data]);
      setNewRow({
        id: Date.now(),
        description: "",
        category: [],
        linkedIn: "",
        twitter: "",
        assignedTo: "",
        unsubscribed: false,
      });
    } catch (error) {
      console.error("Error adding row", error);
    }
  };
  return (
    <div className="spread_sheet_list light_shadow">
      <div className="window_trans_table">
        <TableContainer className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="tabel_head">
              <TableRow className="tabel_row">
                <TableCell className="tableCell">
                  {/* <Checkbox
                    checked={selectedRows.length === spreadsheet.length}
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < spreadsheet.length
                    }
                    onChange={handleSelectAll}
                  /> */}
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
              {spreadsheet.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="tableCell">{item.id}</TableCell>
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
                      checked={selectedRows.includes(item.id.toString())}
                      onChange={() =>
                        setSelectedRows((prev) =>
                          prev.includes(item.id.toString())
                            ? prev.filter(
                                (selectedId) =>
                                  selectedId !== item.id.toString()
                              )
                            : [...prev, item.id.toString()]
                        )
                      }
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
