import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import expressAsyncHandler from "express-async-handler";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

let spreadsheet = [
  {
    id: 1,
    description: "My first transaction",
    category: ["Partner", "Investor", "Customer"],
    linkedIn: "https://www.linkedin.com/in/janedoe",
    twitter: "https://www.twitter.com/janedoe",
    assignedTo: "Jane Doe",
    unsubscribed: false,
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Server is alive");
});

//=======================
// GET SPREADSHEET
//=======================
app.get(
  "/spreadsheet",
  expressAsyncHandler(async (req, res) => {
    try {
      res.json(spreadsheet);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })
);

//=======================
// Add a new row to the spreadsheet
//=======================
app.post(
  "/spreadsheet",
  expressAsyncHandler(async (req, res) => {
    try {
      const newRow = { id: Date.now(), ...req.body };
      spreadsheet.push(newRow);
      io.emit("update", spreadsheet); // Notify clients
      res.status(201).json(newRow);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add row", error: error.message });
    }
  })
);

//=======================
// UPDATE SPREADSHEET ROW
//=======================
app.put(
  "/spreadsheet/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      spreadsheet = spreadsheet.map((row) =>
        row.id === Number(id) ? { ...row, ...req.body } : row
      );
      io.emit("update", spreadsheet);
      res.json({ message: "Updated" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update row", error: error.message });
    }
  })
);

//=======================
// DELETE SPREADSHEET ROW
//=======================
app.delete(
  "/spreadsheet/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      spreadsheet = spreadsheet.filter((row) => row.id !== Number(id));
      io.emit("update", spreadsheet);
      res.json({ message: "Deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete row", error: error.message });
    }
  })
);

//=======================
// ADD COLUMN
//=======================
app.post(
  "/spreadsheet/column",
  expressAsyncHandler(async (req, res) => {
    try {
      const { columnName } = req.body;
      spreadsheet.forEach((row) => (row[columnName] = ""));
      io.emit("update", spreadsheet);
      res.status(201).json({ message: "Column added" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add column", error: error.message });
    }
  })
);

//=======================
// RENAME COLUMN
//=======================
app.put(
  "/spreadsheet/column/:oldName",
  expressAsyncHandler(async (req, res) => {
    try {
      const { oldName } = req.params;
      const { newName } = req.body;
      spreadsheet = spreadsheet.map((row) => {
        if (row[oldName] !== undefined) {
          row[newName] = row[oldName];
          delete row[oldName];
        }
        return row;
      });
      io.emit("update", spreadsheet);
      res.json({ message: "Column renamed" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to rename column", error: error.message });
    }
  })
);

//=======================
// DELETE COLUMN
//=======================
app.delete(
  "/spreadsheet/column/:columnName",
  expressAsyncHandler(async (req, res) => {
    try {
      const { columnName } = req.params;
      spreadsheet = spreadsheet.map((row) => {
        delete row[columnName];
        return row;
      });
      io.emit("update", spreadsheet);
      res.json({ message: "Column deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete column", error: error.message });
    }
  })
);

//=======================
// DELETE SPREADSHEET
//=======================
app.delete(
  "/spreadsheet",
  expressAsyncHandler(async (req, res) => {
    try {
      spreadsheet = [];
      io.emit("update", spreadsheet);
      res.json({ message: "Spreadsheet deleted" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete spreadsheet",
        error: error.message,
      });
    }
  })
);

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
