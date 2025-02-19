import "./styles.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "antd";
import { useState } from "react";
import {
  HugeiconsTextSmallcaps,
  MajesticonsUsers,
  MaterialSymbolsCheckBoxOutline,
  MaterialSymbolsLightAddCircleOutlineRounded,
  PrimeListCheck,
} from "../../assets/icons/Icons";

const List = [
  {
    id: 1,
    description: "My first transaction",
    cateory: ["Patner", "Investor", "Customer"],
    linkedIn: "https://www.linkedin.com/in/janedoe",
    twitter: "https://www.twitter.com/janedoe",
    assignedTo: "Jane Doe",
    unsubscribed: "Yes",
  },
  {
    id: 2,
    description: "My first transaction",
    cateory: ["Patner", "Investor", "Customer"],
    linkedIn: "https://www.linkedin.com/in/janedoe",
    twitter: "https://www.twitter.com/janedoe",
    assignedTo: "Jane Doe",
    unsubscribed: "Yes",
  },
  {
    id: 3,
    description: "My first transaction",
    cateory: ["Patner", "Investor", "Customer"],
    linkedIn: "https://www.linkedin.com/in/janedoe",
    twitter: "https://www.twitter.com/janedoe",
    assignedTo: "Jane Doe",
    unsubscribed: "Yes",
  },
  {
    id: 4,
    description: "My first transaction",
    cateory: ["Patner", "Investor", "Customer"],
    linkedIn: "https://www.linkedin.com/in/janedoe",
    twitter: "https://www.twitter.com/janedoe",
    assignedTo: "Jane Doe",
    unsubscribed: "Yes",
  },
  {
    id: 5,
    description: "My first transaction",
    cateory: ["Patner", "Investor", "Customer"],
    linkedIn: "https://www.linkedin.com/in/janedoe",
    twitter: "https://www.twitter.com/janedoe",
    assignedTo: "Jane Doe",
    unsubscribed: "Yes",
  },
];

function TableComponent() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const allSelected = selectedRows.length === List.length && List.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(List.map((item) => item.id.toString()));
    }
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
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
                    checked={allSelected}
                    indeterminate={selectedRows.length > 0 && !allSelected}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell className="tableCell ">
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
            <TableBody className="tableCenter p_flex">
              {List.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="tableCell">{item.id}</TableCell>
                  <TableCell className="tableCell">
                    {item.description}
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="category_type a_flex">
                      {item.cateory.map((item, index) => (
                        <span className="category" key={index}>
                          {item}
                        </span>
                      ))}
                    </span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <a
                      href={item.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </TableCell>
                  <TableCell className="tableCell">
                    <a
                      href={item.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </TableCell>
                  <TableCell className="tableCell">{item.assignedTo}</TableCell>
                  <TableCell className="tableCell">
                    <Checkbox
                      checked={selectedRows.includes(item.id.toString())}
                      onChange={() => handleRowSelect(item.id.toString())}
                    />
                  </TableCell>
                  <TableCell className="tableCell popover_link_btn"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TableComponent;
