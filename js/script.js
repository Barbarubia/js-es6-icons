/*
Esercizio di oggi:
cartella/repo: js-es6-icons

Milestone 1
Partendo dalla struttura dati fornita, visualizzare in pagina un box per ogni icona, in cui è presente il nome dell'icona e l'icona stessa.

Milestone 2
Ciascuna icona ha una proprietà "color": utilizzare questa proprietà per visualizzare le icone del colore corrispondente.

Milestone 3
Aggiungere alla pagina una select in cui le options corrispondono ai vari tipi di icone (animal, vegetable, user). Quando l'utente seleziona un tipo dalla select, visualizzare solamente le icone corrispondenti.

BONUS
1- modificare la struttura dati fornita e valorizzare la proprietà "color" in modo dinamico: generare in modo casuale un codice colore, sapendo che la notazione esadecimale è formata dal simbolo "#" seguito da 6 caratteri alfanumerici compresi tra 0 e 9 e A e F.
2- popolare le options della select della milestone 3 dinamicamente.

Consigli del giorno
Come sempre, iniziamo prima di tutto dall'analisi e comprensione della consegna. Scomponiamo il problema in micro-passaggi logici che solamente in un secondo momento trasformeremo in codice.
Le icone presenti nella struttura dati fanno riferimento alla nota libreria Font Awesome, perciò come prima cosa assicuriamoci di aver inserito il link alla cdn nell'head della pagina.
Dopodiché, basandoci sul codice di riferimento nel sito di Font Awesome, analizziamo come è formato il tag <i> di un'icona qualsiasi, in particolare focalizziamoci sulle classi.
Come possiamo usare i dati presenti nella nostra struttura dati per creare l'elemento html nel modo corretto e visualizzare l'icona in pagina?
Inizialmente può essere sufficiente stampare dei semplici div, senza alcuno stile, con all'interno l'icona e uno span con il nome. Solamente quando la parte logica è completa, ci dedichiamo al css.
*/

// Verifico se posso richiamare una variabile contenuta in un altro file JS --> OK!
// console.log(arrIcons);

// Definizione variabili
const eleContainer = document.querySelector('.container');

// Esecuzione della funzione che crea un div per ciascuna icona che contiene l'icona stessa e uno span con il nome
showIcons(arrIcons);

// Definizione della funzione che crea i div per le icone
function showIcons(array) {

    // Ripulisco il contenitore ad ogni interazione. Essenziale per rigenerare la griglia quando applico il filtro.
    eleContainer.innerHTML = '';

    //Per ogni elemento dell'array impostato come argomento della funzione (nel ns caso sara arrIcons) 
    array.forEach((element) => {
        // creo l'elemento div, gli attribuisco una classe e genero il contenuto
        let eleIconBox = document.createElement('div');
        eleIconBox.classList.add('icon-box');

        let iconFamily = element.family;
        let iconPrefix = element.prefix;
        let iconName = element.name;
        let iconColor = element.color;

        if (iconFamily == 'fas') {
            iconFamily = 'fa-solid';
        } else if (iconFamily == 'far') {
            iconFamily = 'fa-regular';
        }

        // Versione con colore statico preso dall'array
        //  eleIconBox.innerHTML = `<i class="${iconFamily} ${iconPrefix}${iconName}" style="color: ${iconColor}"></i><span>${iconName}</span>`;

        // Versione con colore generato dinamicamente
        eleIconBox.innerHTML = `<i class="${iconFamily} ${iconPrefix}${iconName}" style="color: ${randomColorGenerator()}"></i><span>${iconName}</span>`;

        // Infine lo appendo al contenitore
        eleContainer.append(eleIconBox);
    })
}



// Filtraggio delle icone per tipologia

// Definizione dell'elemento che contiene la selezione delle varie tipologie di icone
const eleIconsTypeSelector = document.getElementById('icon-type-selector');

// Applicazione di un evento (funzione che filtra le icone visualizzate) quando si cambia l'opzione del selettore
eleIconsTypeSelector.addEventListener('change', function () {

    // lettura del valore selezionato
    const iconsTypeSelected = this.value;
    
    // Se il valore selezionato è diverso da "all"
    if (iconsTypeSelected != 'all') {
        // creo una variabile che legge le icone filtrate
        const filteredIcons = arrIcons.filter((iconArgument) => {
        // filtraggio delle icone: ritorna true se la chiave type degli elementi dell'array coincide con il valore selezionato
        if (iconArgument.type == iconsTypeSelected) {
        return true;
        }
    });
    //console.log(filteredIcons);
    // Rielaboro le icone visualizzate mostrando soltanto quelle selezionate dal filtro
    showIcons(filteredIcons);
    // altrimento rielaaboro la visualizzazione di tutte le icone
    } else {
    showIcons(arrIcons);
    };
});


// Bonus 2
// Creo un array, inizialmente vuoto
arrIconTypes = [];

// Per ogni elemento estraggo il valore della chiave type e la pusho in un nuovo array, ma solo se non è già presente
arrIcons.forEach((element) => {
    if(!arrIconTypes.includes(element.type))
    arrIconTypes.push(element.type);
})
// console.log(arrIconTypes);

// Per ogni elemento inserito nel nuovo array
for (let index in arrIconTypes) {
// Creo un tag option figlio del tag select
let eleIconType = document.createElement('option');
// e gli attribuisco un value e un testo uguali alla chiave
eleIconType.value = arrIconTypes[index];
eleIconType.innerHTML = arrIconTypes[index];
// infine li appendo all'elemento html
eleIconsTypeSelector.append(eleIconType);
}



// Bonus 1
// Funzione che genera un colore casuale in formato esadecimale
function randomColorGenerator() {

    // array dei valori esadecimali
    const arrHexValues = [0, 1, 2 , 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    function randomIndexGenerator() {
        // Math.floor(Math.random() * (max - min + 1) + min);
        return Math.floor(Math.random() * 16);
    }

    let HexColor = '#';

    for (let HexValue = 1; HexValue <= 6; HexValue++) {
        HexColor += arrHexValues[randomIndexGenerator()];
    }
    // console.log(HexColor);
    return HexColor;
}