// Uebungsaufgabe 1
// 1.
setTimeout(() => console.log("Hallo Web-Programming-Lab nach 4 Sekunden"), 4000);
setTimeout(() => console.log("Hallo Web-Programming-Lab nach 6 Sekunden"), 6000);
console.log("Ich bin sofort da!");

// 2.
setInterval(() => console.log("Hallo Web-Programming-Lab alle 3 Sekunden"), 3000);

// 3.
let count = 0;
const id = setInterval(() => {
    console.log("Hallo Web-Programming-Lab");
    if (++count >= 5) {
        clearInterval(id)
        console.log("Done");
    }
}, 400);

// Uebungsaufgabe 2
export function fun(){
    console.log("Hallo Web-Programming-Lab");
}