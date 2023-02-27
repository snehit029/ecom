import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzY5MWZjNWFhMmMxMjYwMmM3ZGVjOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzY5NzM0OSwiZXhwIjoxNjU3OTU2NTQ5fQ.mppj2M98JVVtDH9pBzPhNjaC3EeJcrg63UkWBWZIelQ'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}`}, 
})