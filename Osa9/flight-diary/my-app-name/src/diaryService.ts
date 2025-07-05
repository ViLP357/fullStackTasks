import axios from 'axios';

import type { Diary } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = ()=> {
    return axios
        .get<Diary[]>(baseUrl)
        .then(response => response.data);
}

export const addDiary = (diaryToAdd: Diary) => {
    console.log("here 4");
    return axios
        .post<Diary[]>(baseUrl, diaryToAdd)
        .then(response => response.data);
}