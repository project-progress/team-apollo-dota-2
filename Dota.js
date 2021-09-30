let apiData = fetch("https://api.opendota.com/api/heroes");
let divCharacters = document.createElement('div');

apiData.then((response) => response.json())
    .then((json => {
        json.forEach(element => {
        switch(element.primary_attr) {
            case "str" :
                addImages("strength",element);   
                break; 
            case "agi" :
                addImages("agility",element);
                break; 
            case "int" :
                addImages("intelligence",element);
                break;
        }
    });
}));

 function addImages(tdIdName,element) {
    let button = document.createElement('button');
    let img = document.createElement('img');

    img.src = './images/' + element.localized_name + '.png';
    img.setAttribute("class", "thumbnail");
    img.setAttribute("title", element.localized_name);

    document.getElementById(tdIdName).appendChild(button);
    button.appendChild(img);
 }