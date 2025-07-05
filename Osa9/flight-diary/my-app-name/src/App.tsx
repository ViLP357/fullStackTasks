import { useState, useEffect } from 'react';
//import axios from 'axios';
import { addDiary, getAllDiaries } from './diaryService';
//import DiaryForm from './DiaryForm.tsx';

import type  { Diary } from './types';


const App = () => {
  //const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newWeather, setNewWeather] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, []);

     
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("here 1");
    const diaryToAdd = {
      weather: newWeather,
      visibility: newVisibility,
      date: newDate,
      id: diaries.length +1,
      comment: newComment
    }  

    addDiary(diaryToAdd).then(data => {
      setDiaries(diaries.concat(data))
    })

    //setDiaries(diaries.concat(diaryToAdd));
    setNewWeather('')
    setNewVisibility('')
    setNewDate('')
    setNewComment('')
  }
      //  <DiaryForm></DiaryForm>
    //<h2>Diary entries</h2>
      //<div>
   return (
    <div>
      <h4>Add new entry</h4>
      <form onSubmit={diaryCreation}>
        Date:
        <input value = {newDate}
          onChange={(event) => setNewDate(event.target.value)}
        ></input>
        Visibility:
        <input value = {newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        ></input>
        Weather:
        <input value = {newWeather}
          onChange={(event) => setNewWeather(event.target.value)}
        ></input>
        Comment:  
        <input value = {newComment}
          onChange={(event) => setNewComment(event.target.value)}
        ></input>
        <button type='submit' >add</button>
      </form>

     <ul>
        {diaries.map(diary =>
          <li key={diary.id}> <h4>{diary.date} </h4> 
          <p>weather: {diary.weather} </p> 
          <p>visibility: {diary.visibility} </p>
          </li>
        )}
      </ul>
    </div>
   )};

   export default App;