const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const db = require('./db')

const PORT = 3001
const router = require('./routes/todoRoute')

// Middle ware
app.use(bodyParser.json())
app.use(morgan('combined'))

// router.patch('/todo', (req, res) => {
//   res.send('update an existing task')
// })

// router.delete('/todo', (req, res) => {
//   const { id } = req.body
//   const sql = 'DELETE FROM todo WHERE id= ?'
//   db.run(sql, id, (error, result) => {
//     if (error) {
//       return res.json({
//         status: 'failed',
//         data: id,
//       })
//     } else {
//       return res.json({
//         status: 'success',
//       })
//     }
//   })
// })

app.use('/api', router)

app.listen(PORT, () => {
  console.log('App listening on port', PORT)
})
