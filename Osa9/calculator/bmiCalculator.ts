const calculateBmi = (a: number, b: number) => {
    const tulos = b / (a/100) ** 2;
    //console.log(tulos);
    if (tulos < 18.5) {
        return "Underweight";
    }
    else if (tulos < 25) {
        return "Normal range";
    } 
    else if (tulos < 30) {
        return "Owerweight";
    } 
    else {
        return "Significant owerweight";
    }
}

console.log(calculateBmi(180, 74))