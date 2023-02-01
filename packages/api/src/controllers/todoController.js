const db = require('../db')

exports.get = (req, res) => {
  const sql = 'SELECT * FROM todo'
  const params = []

  db.all(sql, params, (error, result) => {
    const response = {
      status: 'failed',
      data: [],
    }

    if (error) {
      console.error('error', error)
      res.status = 400
      response.status = 'failed'
      response.data = []
      response.error =
        'Error occurs when try to get list todo. Please try again!.'
    } else {
      res.status = 200
      response.status = 'success'
      // @ts-ignore
      response.data = result
    }

    res.json(response)
  })
}

exports.add = (req, res) => {
  const sql = 'INSERT INTO todo (task) values (?)'
  const params = [req.body?.task]

  db.run(sql, params, (error, result) => {
    const response = {
      status: 'failed',
      data: null,
    }
    if (error) {
      response.status = 'failed'
      response.data = null
      res.status = 400
    } else {
      response.status = 'success'
      response.data = req.body?.task
      res.status = 200
    }

    res.send(response)
  })
}

exports.delTodo = (req, res) => {
  const response = {
    status: 'failed',
    data: null,
  }

  const { id } = req.body

  const sql = 'DELETE FROM todo WHERE id=?'
  db.run(sql, id, (error, result) => {
    if (error) {
      response.status = 'failed'
      response.data = null
    } else {
      response.status = 'success'
      response.data = result
    }
    res.json(response)
  })
}
