// src/api/postRegistration/axiosFastapiJson.ts
import axios from "axios"

const fastapiJson = axios.create({
  baseURL: import.meta.env.VITE_FASTAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default fastapiJson