// https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data/

// Du JSON contenu sur les internets
/// ----------------
var myCardObject;
// Je récupère mon bouton
const leBoutonHTML = document.querySelector('#leBouton');
//Je récupère le bouton de résultat
const leBoutonDeVerifHTML = document.querySelector('#boutonCheckName');
// Ca récup le div #retour
const retourHTML = document.querySelector('#retour');
// console.log(leBoutonHTML);


// Lorsque je clique dessus
leBoutonHTML.addEventListener('click', onClickGenerate);

leBoutonDeVerifHTML.addEventListener('click', onClickVerify);
// let idValue;
// let unNomDeFichier;

function onClickVerify(event) {
    const spanCardName = document.querySelector('#cardName');
    console.log(spanCardName.innerText);
    console.log(myCardObject.name);
    if(spanCardName.innerText === myCardObject.name){
        window.alert("YOU WON !");
    }
    else {
        window.alert("PERDU T NUL LOL.")
    }
}

function onClickGenerate(event) {
    // On apelle le fetch
    leFetch(); 
}

function leFetch() {
    let idValue = Math.floor(Math.random()*(3100 - 1 + 1) + 1);
    let unNomDeFichier = "https://api.magicthegathering.io/v1/cards/" + idValue ;
    fetch(unNomDeFichier)
    .then((response) => {
        // console.log(response);
        // J'essaie de récupérer le bousin
        return response.json();
    })
    .then((data) => {
        // Si ça marche, le contenu est dans "data"
        // console.log(data);
        myCardObject = data.card;
        let textAAfficher = "Pas de texte";
        if (myCardObject.text !== undefined){
            textAAfficher = `${myCardObject.text}` 
        }
        let typeAAfficher = "";
        if (myCardObject.type !== undefined){
            typeAAfficher = `${myCardObject.type}` 
        }
        let flavorAAfficher = "Pas de flavor text";
        if (myCardObject.flavor !== undefined){
            flavorAAfficher = `${myCardObject.flavor}` 
        }
        let CCMAAfficher = "Pas de CCM";
        if (myCardObject.manaCost !== undefined){
            CCMAAfficher = `${myCardObject.manaCost}`
        }
        retourHTML.innerHTML = 
        `
        <div id="retourCard">
            <div id="topSide">
                <div class="cardDiv" id="cardName">
                    <span contenteditable><b>Devine le nom de la carte ici =)</b></span>
                </div>
                <div class="cardDiv" id="ccm">
                    ${CCMAAfficher}
                </div>
            </div>
                <div class="cardDiv" id="type">
                    ${typeAAfficher}
                </div>
                <div class="cardDiv" id="text">
                    ${textAAfficher}
                </div>
                <div class="cardDiv" id="flavor">
                    <i>${flavorAAfficher}</i>
                </div>
        </div>`;
        
        //Créer un bouton, foutre ça dans un onlcik du bouton. Ensuite comparer avec le cardName de l'objet de l'api.
    })
    .catch((erreur) => {
        // Y'a une erreur, l'erreur est dans "erreur"
        console.log(erreur);
    })
}