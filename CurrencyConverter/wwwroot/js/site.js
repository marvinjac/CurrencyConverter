//Deklarering av variabler samt tilldelning av element från HTML-dokumentet
const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const swapbtn = document.getElementById("swapbtn");
const num = document.getElementById("num");
const numTwo = document.getElementById("numTwo");


//Hämtar valutor med hjälp av APIn
//Den första data-parametern tar emot värdet av objektet som returneras från "fetch" 
//Sedan konverterar responsen datan till json
//Därefter processar vi jsondatan
//Tillsist skickar vi in datan i displayfunktionen
fetch("https://api.frankfurter.app/currencies")
    .then((data) => data.json())
    .then((data) => {
        display(data);
    });

//Visar valutorna 
//Skapar en konstant som heter entries där datan från fetchen sparas
//I denna lista sparas förkortningen av valutan samt valutans fullständiga namn
//Där efter körs en for-loop som skickar in förkortningen av valutan i select-elementen
function display(data) {
    const entries = Object.entries(data);
    for (var i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    }
}

//Byter de valda valutorna mot varandra
swapbtn.addEventListener("click", () => {
    let valueZero = select[0].value;
    let valueOne = select[1].value;
    select[1].value = valueZero;
    select[0].value = valueOne;
    
});

//Vid knapptryck sparar vi värdena från select-elementen samt summan som användaren vill konvertera
//Därefter kollar vi att valutorna är olika och att input-fältet inte är tomt
//Om allt är ok kör vi convert-funktionen
btn.addEventListener("click", () => {
    let currencyOne = select[0].value;
    let currencyTwo = select[1].value;
    let value = num.value;

    if (currencyOne != currencyTwo) {
        if (value != "") {
            convert(currencyOne, currencyTwo, value);
        }
        else {
            alert("Ange summa");
        }
        
    } else {
        alert("Ange olika valutor");
    }
});

//Tar emot valutorna samt summan som ska konverteras
//Kallar APIns konverterare, denna gång med strängkonkatenering för att skicka in värdena som användaren angett
//Som vid fetchen ovan så får vi en respons som vi konverterar till json och därefter processar
//Tillsist anger vi resultatet i ans-elementet
function convert(currencyOne, currencyTwo, value) {
    const host = "api.frankfurter.app";
    fetch(
        `https://${host}/latest?amount=${value}&from=${currencyOne}&to=${currencyTwo}`
    )
        .then((val) => val.json())
        .then((val) => {
            console.log(Object.values(val.rates)[0]);
            numTwo.value = Object.values(val.rates)[0];

        });
}
