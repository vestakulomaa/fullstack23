import axios from "axios"
const baseUrl = "http://localhost:3001/api/persons"

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const deleteUrl = baseUrl + "/" + id
    const request = axios.delete(deleteUrl)
    return request.then(response => response.data)
}

const update = (id, newNumber) => {
    const updateUrl = baseUrl + "/" + id
    const request = axios.put(updateUrl, newNumber)
    return request.then(response => response.data)
}

export default {
    create,
    deletePerson,
    update
}