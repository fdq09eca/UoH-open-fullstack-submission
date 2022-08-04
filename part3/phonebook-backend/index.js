const express = require('express')
const morgan = require('morgan')
const app = express()


const unknownEndpoint = (request, response) => { // after all routes is searched.
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json()) // to parse received data as json.

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // to log requests.


let persons = [

    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }


]

const getNewId = () => {
    const maxId = persons.reduce((max, p) => Math.max(max, p.id), 0)
    return maxId + 1
}

const nameExists = (name) => {
    return persons.find(p => p.name === name)
}

app.post("/api/persons", (req, res) => {
    const person = req.body
    if (!person.name || !person.number) {
        res.status(400).json({ error: "name or number missing" })
        return
    }

    if (nameExists(person.name)) {
        res.status(400).json({ error: "name already exists" })
        return
    }
    
    person.id = getNewId()
    persons = persons.concat(person)
    res.statusMessage = "Person added"
    res.json(person)
    return
})

app.delete('/api/person/:id', (req, res) =>{
    const id = Number(req.params.id)
    if (!persons.find(p => p.id === id)){
        res.statusMessage = "Person id not found."
        res.status(404).end()
    }   

    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/api/person/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === Number(id))
    if (person) {
        res.json(person)
    } else {
        res.statusMessage = 'Person id not found'
        res.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const currentTime = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${currentTime.toString()}</p>`)
})


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})



app.use(unknownEndpoint) // to parse received data as json.

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
