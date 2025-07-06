import { useState, useEffect } from 'react';
import { addDiary, getAllDiaries } from './diaryService';
import type  { Diary } from './types';


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newWeather, setNewWeather] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newMessage, setNewMessage] = useState('');

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
      .catch((er) => {
        console.log(er)
        setNewMessage("Error: " + er.response.data)
        setTimeout(() => {
          setNewMessage('')
      }, 5000)})

    setNewDate('')
    setNewComment('')
  
  }
 
   return (
    <div>
      
      <h4>Add new entry</h4>
      <p style={{color: 'red'}}>{`${newMessage}`}</p>
      <form onSubmit={diaryCreation}>
        Date:
        <input type='date' value = {newDate}
          onChange={(event) => setNewDate(event.target.value)}
        ></input>


        <div>
        Visibility:
        <input type= "radio" name="visibility" onChange={() => setNewVisibility("great")}/>great
        <input type= "radio" name="visibility" onChange={() => setNewVisibility("good")}/>good 
        <input type= "radio" name="visibility" onChange={() => setNewVisibility("ok")}/>ok 
        <input type= "radio" name="visibility" onChange={() => setNewVisibility("poor")}/>poor 
        </div>

        <div>
        Weather:
        <input type= "radio" name="weather" onChange={() => setNewWeather("sunny")}/>sunny
        <input type= "radio" name="weather" onChange={() => setNewWeather("rainy")}/>rainy
        <input type= "radio" name="weather" onChange={() => setNewWeather("cloudy")}/>cloudy
        <input type= "radio" name="weather" onChange={() => setNewWeather("stormy")}/>stormy
        <input type= "radio" name="weather" onChange={() => setNewWeather("windy")}/>windy 
        </div>


        Comment:  
        <input value = {newComment}
          onChange={(event) => setNewComment(event.target.value)}
        ></input>
        <button type='submit' >add</button>
      </form>
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