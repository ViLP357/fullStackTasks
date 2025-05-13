interface ExerciseObject {
    periodLength: number,
    trainingDays: number,
    succees: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    avarage: number
}

const CalculateExercises = (list : number[], target: number) : ExerciseObject => {
    let avrg: number;
    let trD: number = 0;
    let sum : number = 0;
    let suc : boolean;
    let descText : string;
    let rtng : number;
    for (var val of list) {
        if (val != 0 ){
            trD ++;
        }
        sum += val;
    }
    avrg = sum / list.length;
    if (avrg >= target) {
        suc = true;
        rtng = 3;
        descText = "Excellent!"

    } else {
        suc = false;
        if (avrg + 0.5 >= target) {
            rtng = 2;
            descText = "Not bad. Try harder next time"
        }
        else 
            rtng = 1;
            descText = "Not very good... Did you even try?"
    }
    return {
        periodLength: list.length,
        trainingDays: trD,
        succees: suc,
        rating: rtng,
        ratingDescription: descText,
        target: target,
        avarage: avrg
    }
}

let target : number = 2;
let list : number[] = [3, 0, 2, 4.5, 0, 3, 1];
console.log(CalculateExercises(list, target));