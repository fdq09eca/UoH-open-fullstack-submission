import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const getAll = () => axios.get(baseUrl).then(response => response.data)
const create = (newPerson) => axios.post(baseUrl, newPerson).then(r => r.data)
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`).then(r => r.data)
const replace = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson).then(r => r.data)
const PersonService = {getAll, create, deletePerson, replace}

export default PersonService