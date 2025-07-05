import { useState } from "react";

const DiaryForm = () => {
     const [newWeather, setNewDiary] = useState('');

     
    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        //const diaryToAdd = {
        //    weather: newWeather
        //}  

    }
    return (
        <div>
            <form onSubmit={diaryCreation}>
                <input value = {newWeather}
                onChange={(event) => setNewDiary(event.target.value)}
                ></input>
            </form>
        </div>
    )
}

export default DiaryForm;