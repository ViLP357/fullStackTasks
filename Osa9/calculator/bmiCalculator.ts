export const calculateBmi = (a: number, b: number) => {
    //console.log("Values received:", a, b);
    //console.log("Type of a:", typeof a, "Type of b:", typeof b);
    //console.log(a, b);
    if (isNaN(a) || isNaN(b)) {
        throw new Error(`Value was not a number or 0 ${a} ${b}`);
    }
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
};

if (require.main === module) {
    console.log("true main");
    const a: number = Number(process.argv[2]);
    const b: number = Number(process.argv[3]);
    //console.log(a, b);
    console.log(calculateBmi(a, b));
}
//export {calculateBmi};