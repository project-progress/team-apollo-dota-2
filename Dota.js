let apiData = fetch("https://api.opendota.com/api/heroes");
    
apiData.then((response) =>  response.json())
.then((json => {
   let array = [];
      for (i =0;i<json.length; i++)
      {
       
          array[i] =json[i];
          
      }
      return array
  })).then(array => {


    

    let search =  document.getElementById("search");
    let count = "0";
    let fav = document.getElementById("favorites");
    let img = document.createElement('img');
    let allButtons = document.getElementsByClassName("thumbnail");
    let star = document.getElementById("starIcon");
    let favs = [];
    let comparison = document.getElementById("comparison");
    let closeComparison = document.getElementById("closeComparison");
   
  
   
    array.forEach(element => {
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
  
    function addImages(tdIdName,element) {
       let button = document.createElement('button');
       let img = document.createElement('img');
       
       img.src = './images/' + element.localized_name + '.png';
       img.setAttribute("class", "thumbnail");
       img.setAttribute("title", element.localized_name);
       img.setAttribute("id" , element.localized_name);
   
       document.getElementById(tdIdName).appendChild(button);
       button.appendChild(img);
    }
   
   
    
    for (i = 0; i <array.length; i++) {
        let thatbutton = allButtons[i];
       
        thatbutton.addEventListener('click', () => showContent(thatbutton));
    }
    array.forEach(element => {
            document.getElementById(element.localized_name).addEventListener('mouseover', () => eventFunction(element))
            document.getElementById(element.localized_name).addEventListener('mouseout', () => {
            document.getElementById(element.localized_name).style.transform = "none";
            document.getElementById(element.localized_name).style["-webkit-transform"] = "none";
        });
    })
   
    function showContent(thatbutton) {
        let pos;
        let z =0;
        const tr = document.getElementById("charactersTable"); 
         

            pos = 180;
            while(pos != -20) {
                pos --;
                tr.style.left = `${pos}px`;   
            }
            setTimeout(function() { comparison.style.display = "block";    },500);
          
                for (let j = 0; j < array.length; j++) {
                        if (array[j].localized_name == thatbutton.id) {

                            img.src = './images/' + array[j].localized_name + '.png';
                            document.getElementById("herosimg").appendChild(img);
                            document.getElementById("name").innerText = array[j].localized_name;
                            
                            switch( array[j].primary_attr) {
                            case "str": 
                            document.getElementById("primAttr").innerText = "Strength"; break;
                            case "agi":
                            document.getElementById("primAttr").innerText = "Agility"; break;
                            case "int":
                            document.getElementById("primAttr").innerText =  "Intelligence"; break;
                            }

                            document.getElementById("AttType").innerText = array[j].attack_type;
                            document.getElementById("legs").innerText = array[j].legs;
                            document.getElementById("roles").innerText = array[j].roles;
                            
                            

                            star.addEventListener('click', () => {   
                                favs[z] = array[j];
                                z++;    
                            })
                            count = favs.length;
                            document.getElementById("resetFavorites").addEventListener('click', () => {     
                                    array.forEach(element =>   {
                                    document.getElementById(element.localized_name).style.opacity = 1;
                                })  
                               
                                z = 0;                                
                                let resInner = document.getElementById("resetFavorites").innerHTML;
                                document.getElementById("resetFavorites").innerHTML = resInner.replace(favs.length,count)
                                favs = [];
                                count = favs.length;
                            })
                         }
                    }
    
             
                
      
        closeComparison.addEventListener('click', () => {
            comparison.style.display = "none";
                while (pos != 180){
                    pos ++;
                    tr.style.left = `${pos}px`;
                }
         });
    }

     function eventFunction(element) {
        document.getElementById(element.localized_name).style.transform = "scale(1.5)";
        document.getElementById(element.localized_name).style["-webkit-transform"] = "scale(1.5)"
     }
   
   search.addEventListener('keyup',asearch  => {
        let filter;

        filter = asearch.target.value.toUpperCase()
        array.forEach(element => {
            if (!element.localized_name.toUpperCase().startsWith(filter)) {
                document.getElementById(element.localized_name).style.opacity = 0.3;
            } else {
                document.getElementById(element.localized_name).style.opacity = 1;
                document.getElementById(element.localized_name).addEventListener('mouseover', () => eventFunction(element));
                }
        })
    });
        
        fav.addEventListener('click', () => {

            let str = document.getElementById("favorites").innerHTML; 
            if (document.getElementById("favorites").innerHTML =="Favorites")
            {
                    document.getElementById("resetFavorites").style.display = "block";
                    let resInner = document.getElementById("resetFavorites").innerHTML;
                    count = "0";
                    document.getElementById("resetFavorites").innerHTML = resInner.replace(count,favs.length)
                    document.getElementById("favorites").innerHTML = str.replace("Favorites", "All Heroes");
                    array.forEach(element =>   {
                            document.getElementById(element.localized_name).style.opacity = 0.3;
                        })
                            for(z =0; z<favs.length;z++)   {
                                    document.getElementById(favs[z].localized_name).style.opacity = 1;
                                }                      
                } else {
                    document.getElementById("resetFavorites").style.display = "none";
                document.getElementById("favorites").innerHTML = str.replace("All Heroes", "Favorites");
                array.forEach(element =>   {
                        document.getElementById(element.localized_name).style.opacity = 1;
                    })
            }
  
    })
});