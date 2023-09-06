// without express
// const http = require('http');
// const app = http.createServer(req, res) => {
//  res.writeHead(200), {'Content-Type': 'application/json'}
//  res.end(JSON.stringify(<MY_OBJ_JSON>))
// });

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors)
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'test 1',
    date: '2023-03-03',
    important: true
  },
  {
    id: 2,
    content: 'test 2',
    date: '2023-03-04',
    important: false
  },
  {
    id: 3,
    content: 'test 3',
    date: '2023-03-05',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>This is HTML returned by express</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find((n) => n.id === parseInt(id))
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((n) => n.id !== id)
  console.log({ notes })
  res.status(204).end()
})

app.use((req, res) => {
  res.status(404).json(
    {
      error: 'Not found'
    }
  )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Try locally on http://localhost:${PORT}`)
})
