let metric = document.getElementById('metricOption')
let imperial = document.getElementById('imperialOption')

let metricScale = document.querySelector(".metricScale")
let imperialScale = document.querySelector(".imperialScale")

let heightCm = document.querySelector(".inputCm");
let weightKg = document.querySelector(".inputKg");
let heightFt = document.querySelector(".inputFt");
let heightIn = document.querySelector(".inputIn");
let weigthSt = document.querySelector(".inputSt");
let weigthLbs = document.querySelector(".inputLbs");


let result = document.querySelector(".resultScore")
let classification = document.querySelector(".classification")

let idealWeigth = document.querySelector(".idealWeigth")

metric.addEventListener("change", function() {
    metricScale.style.display="flex"
    imperialScale.style.display="none"
});

imperial.addEventListener("change", function() {
    metricScale.style.display="none"
    imperialScale.style.display="flex"
});


let cm = undefined;
let kg = undefined;
let ft = undefined;
let inc = undefined;
let st = undefined;
let lbs = undefined;

heightCm.addEventListener("input", function() {
    cm = heightCm.value;
    if(kg !== undefined) calculateBMImetric(cm, kg);
});

weightKg.addEventListener("input", function() {
    kg = weightKg.value;
    if(cm !== undefined) calculateBMImetric(cm, kg);
});

heightFt.addEventListener("input", function() {
    ft = heightFt.value;
    if(inc !== undefined && st !== undefined && lbs !== undefined) calculateBMIimperial(ft, inc, st, lbs);
});

heightIn.addEventListener("input", function() {
    inc = heightIn.value;
    if(ft !== undefined && st !== undefined && lbs !== undefined) calculateBMIimperial(ft, inc, st, lbs);
});

weigthSt.addEventListener("input", function() {
    st = weigthSt.value;
    if(ft !== undefined && inc !== undefined && lbs !== undefined) calculateBMIimperial(ft, inc, st, lbs);
});

weigthLbs.addEventListener("input", function() {
    lbs = weigthLbs.value;
    if(ft !== undefined && inc !== undefined && st !== undefined) calculateBMIimperial(ft, inc, st, lbs);
});


function calculateBMImetric(cm, kg) {
    let intCm = parseInt(cm);
    let intKg = parseInt(kg);
    let m = intCm/100;
    let bmi = Math.round(intKg/(m*m));


    if(bmi !== NaN) {
        result.innerHTML = bmi;

        changeState(bmi)

        let fromValue = Math.round(18.5 * Math.pow(m, 2) * 10) / 10;
        let toValue = Math.round(24.9 * Math.pow(m, 2) * 10) / 10;
        idealWeigth.innerHTML = fromValue + "kgs - " + toValue + "kgs";
    }   
    cm = undefined;
    kg = undefined;
}

function calculateBMIimperial(ft, inc, st, lbs) {
    let intFt = parseInt(ft);
    let intInc = parseInt(inc);
    let intSt = parseInt(st);
    let intLbs = parseInt(lbs);

    lbs = (intSt * 14) + intLbs;
    inc = (intFt * 12) + intInc;

    let bmi = 703 * (lbs/Math.pow(inc, 2));

    if(bmi !== NaN) {
        result.innerHTML = Math.round(bmi * 10) / 10;

        changeState(bmi)

        let fromValue = Math.round((18.5/703) * Math.pow(inc, 2) * 10) / 10;
        let toValue = Math.round((24.9/703) * Math.pow(inc, 2) * 10) / 10;
        idealWeigth.innerHTML = fromValue + "lbs - " + toValue + "lbs";
    }
    ft = undefined;
    inc = undefined;
    st = undefined;
    lbs = undefined;
}


function changeState(bmi) {
    if(bmi < 18.5) classification.innerHTML = "Underweight";
    else if(bmi < 25) classification.innerHTML = "Healthy weight";
    else if(bmi < 30) classification.innerHTML = "Overweight";
    else if(bmi >= 30) classification.innerHTML = "Obese";
}