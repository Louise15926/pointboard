import {Parser} from "expr-eval";

let parser = new Parser();

document.getElementById("add-people-form").addEventListener("submit", (event) => {
    let input = document.getElementById("add-people-form-initial-score");
    let scoreVal;
    try {
        scoreVal = parser.parse(input.value).evaluate({});
    } catch (e) {
        alert("unable to parse the value");
        event.preventDefault();
        return;
    }
    if (scoreVal > 199) {
        alert("not > 199 though :(");
        event.preventDefault();
        return;
    }
    input.value = scoreVal
})

document.getElementById("point-form").addEventListener("submit", (event) => {
    let inputs = document.getElementsByClassName("points-input");

    for (let item of Array.from(inputs)) {
        if (item.value === undefined || item.value === "") continue;

        let scoreVal;
        try {
            scoreVal = parser.parse(item.value).evaluate({});
        } catch (e) {
            alert("unable to parse the value");
            event.preventDefault();
            return;
        }
        if (scoreVal > 100) {
            alert("not > 100 though :(")
            event.preventDefault();
            return;
        }
        item.value = scoreVal
    }
})


