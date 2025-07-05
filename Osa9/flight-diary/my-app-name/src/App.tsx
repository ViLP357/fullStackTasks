import { useState, useEffect } from 'react';
//import axios from 'axios';
import { getAllDiaries } from './diaryService';

import type  { Diary } from './types';


const App = () => {
  //const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, []);

  
   return (
    <div>
    <h2>Diary entries</h2>
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