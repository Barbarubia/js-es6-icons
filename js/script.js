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

// Creo un div che contiene l'icona e uno span con il nome
showIcons(arrIcons);

function showIcons(icons) {

    eleContainer.innerHTML = '';

    icons.forEach((element) => {

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

        eleIconBox.innerHTML = `<i class="${iconFamily} ${iconPrefix}${iconName}" style="color: ${iconColor}"></i><span>${iconName}</span>`;
        eleContainer.append(eleIconBox);
    })
}



const iconsTypeSelector = document.getElementById('icon-type-selector');

iconsTypeSelector.addEventListener('change', function () {

    const iconsTypeSelected = this.value;
    
    
    if (iconsTypeSelected != 'all') {
        
        const filteredIcons = arrIcons.filter((iconArgument) => {
        if (iconArgument.type == iconsTypeSelected) {
        return true;
        }
    });
    console.log(filteredIcons);
    showIcons(filteredIcons);

    } else {
    showIcons(arrIcons);
    };

});


// Bonus 2
arrIconTypes = [];
arrIcons.forEach((element) => {
    if(!arrIconTypes.includes(element.type))
    arrIconTypes.push(element.type);
})
console.log(arrIconTypes);

for (let index in arrIconTypes) {
let eleIconType = document.createElement('option');
eleIconType.value = arrIconTypes[index];
eleIconType.innerHTML = arrIconTypes[index];
iconsTypeSelector.append(eleIconType);
}
