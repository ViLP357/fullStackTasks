import axios from 'axios';

import type { Diary } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = ()=> {
    return axios
        .get<Diary[]>(baseUrl)
        .then(response => response.data);
}