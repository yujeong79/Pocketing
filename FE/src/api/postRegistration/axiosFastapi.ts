// src/api/postRegistration/axiosFastapi.ts
import axios from "axios";

const fastapi = axios.create({
    baseURL: import.meta.env.VITE_FASTAPI_BASE_URL,
    headers: {
        'Content-Type' : 'multipart/form-data',// 사진 업로드
    },
    withCredentials: false,
})

export default fastapi




