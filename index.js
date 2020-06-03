const container = document.getElementById('container');
const inputText = document.getElementById('input');
const searchButton = document.getElementById('btn-search');
const btnFavorite = document.querySelector(".btn-favorite");
console.log(btnFavorite);
const DB = 'DBTEST';

var favorite = [];
//update the local storage to current fav array 
(function(){
      
    let lastState =  window.localStorage.getItem(DB); //check the last state and add to fav array

    if(lastState!=null){
          lastArray = JSON.parse(lastState);
        for(let i=0;i<lastArray.length;i++){

                favorite.push(lastArray[i]); // push id to fav array from local storage
        }
    }
      
})()


function addToLocalStorage(fav){
  
     window.localStorage.setItem(DB,fav);
     return;
         
}
function localStorageClear(){

       window.localStorage.clear();
}

function fetchFavorite(){

      if(window.localStorage.getItem(DB) == null){

          return;
      }

     var arr  =  window.localStorage.getItem(DB);
      arr = JSON.parse(arr);
     console.log(arr);

     for(let i=0;i<arr.length;i++){

               console.log(arr[i]);   
     }
}
fetchFavorite();

function addToFavorite(id) {
      
    

     favorite.push(id);
     alert(`added favorite ${id}`)
     

      

     addToLocalStorage(JSON.stringify(favorite));


     return;
}


//search result 

function  addToContainer(JSONObject){

      const heroArray = JSONObject.results;

   for(let i=0;i<heroArray.length;i++) {

          const ImageContainer =  document.createElement('div');
          const img = document.createElement('img');
          const imgInfo = document.createElement('div');
          const favorite = document.createElement('button');
          const anchor = document.createElement('a');
          ImageContainer.classList.add('super-container');
          ImageContainer.setAttribute('id',heroArray[i].id);
          
          // console.log(JSONObject.results[0].image.url);
          //creating img element
          img.setAttribute('src',heroArray[i].image.url);

          //creating info element
          imgInfo.classList.add('info');
          imgInfo.setAttribute('id',heroArray[i].id);
          imgInfo.innerHTML =  '<i class="fas fa-info-circle"></i>';

          //creating btn favorite

          favorite.classList.add('btn-favorite');
          favorite.setAttribute('id',heroArray[i].id);
          favorite.innerHTML = `<i class="fas fa-bookmark btn-fav" data-id="btn-fav" id=${heroArray[i].id}></i>`;

          //adding the child in super-container class
          ImageContainer.appendChild(img)
          ImageContainer.appendChild(favorite);
          //seting anchor tag
          anchor.setAttribute('href', `./superhero.html?id=${heroArray[i].id}`);
          anchor.appendChild(imgInfo);
          ImageContainer.appendChild(anchor);

          //adding super_container  to container
          container.appendChild(ImageContainer);
      }
}




//creating connection to the api
function fetchDetails(search){
         
     console.log('called ')
     var xhrRequest =new  XMLHttpRequest();
     xhrRequest.onload = function(){
     var responseJSON = JSON.parse(xhrRequest.response);

          if(responseJSON.response === 'error'){

                alert('Sorry your super Hero lost in space');
          }

          addToContainer(responseJSON);

        
     }
      xhrRequest.open('GET',`https://superheroapi.com/api/936106680158599/search/${search}`);
    
      xhrRequest.send();
}
 
//event handling 
function handleClickListener(e) {

     console.log("clicked = ",e.target.dataset.id);

      if(e.target.className === 'info'){
           
          let targetId  = e.target.id;
          displaySuperHeroPage(id);
          return;
     

      }else if(e.target.className === 'btn-search'){
               // console.log('search pressed');
            fetchDetails(inputText.value);
          //  console.log(inputText.value);

          return;
         
            
      }else if(e.target.dataset.id == 'btn-fav'){

               // console.log(e.target.id);
               addToFavorite(e.target.id);
      }
}

function initEventListener(){

     document.addEventListener('click',handleClickListener);
     

}


initEventListener();

const Heros = [
     {name: 'spiderman'},
     {name: 'batman'},
     {name: 'thor'},
     {name: 'ironman'}
   ];
   const suggestionsPanel = document.querySelector('.suggestions');
function suggest(){
  
   
   inputText.addEventListener('keyup', function() {
     const input = inputText.value;
     suggestionsPanel.innerHTML = '';
     const suggestions = Heros.filter(function(hero) {
       return hero.name.toLowerCase().startsWith(input);
     });
     suggestions.forEach(function(suggested) {
       const div = document.createElement('div');
       div.innerHTML = suggested.name;
       suggestionsPanel.appendChild(div);
        div.addEventListener('click',function(e){
          //    console.log("clicked div")
               let val =  document.querySelector('.suggestions div').innerHTML;
               // console.log(val);
               inputText.value = '';
               inputText.value= val;

        });
     });
     if (input === '') {
       suggestionsPanel.innerHTML = '';  
     }
   })
}
suggest();
   
   
   
   


