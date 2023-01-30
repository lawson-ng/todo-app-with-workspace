const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const app = express()
const db = require("./db")

const PORT = 3001
const router = express.Router()

// Middle ware
app.use(bodyParser.json())
app.use(morgan("dev"))

router.post("/todo", (req, res) => {
  console.log(req.body)
  res.send("create new task")

  const sql = "INSERT INTO todo (task) values (?)"
  const params = [req.body?.task]

  db.run(sql, params, function (error, result) {
    console.log("error", error)
    console.log("result", result)
  })
})

router.get("/todo", (req, res) => {
  const sql = "SELECT * from todo"
  const params = []

  db.all(sql, params, (error, result) => {
    if (error) {
      console.error(error)
      res.json({
        status: "failed",
        error: "something went wrong!",
      })
    } else {
      res.json({
        status: "success",
        data: result,
      })
    }
  })
})

router.patch("/todo", (req, res) => {
  res.send("update an existing task")
})

router.delete("/todo", (req, res) => {
  const { id } = req.body
  const sql = "DELETE FROM todo WHERE id= ?"
  db.run(sql, id, (error, result) => {
    if (error) {
      return res.json({
        status: "failed",
        data: id,
      })
    } else {
      return res.json({
        status: "success",
      })
    }
  })
})

app.use("/api", router)

app.listen(PORT, () => {
  console.log("App listening on port", PORT)
})
