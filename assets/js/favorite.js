const Container = document.getElementById('container'); // container of the  all fav Herors

const DB = 'DBTEST';
const set = new Set();
function fetchId() {

         var idList = window.localStorage.getItem(DB);
         var idArray =  JSON.parse(idList);

         for(let i=0;i<idArray.length;i++){
                 set.add(idArray[i]);
         }

}

//update Storage

function updateStorage(){
        var arr  = [];
       set.forEach(function(id){
             arr.push(id);
       })

       window.localStorage.setItem(DB,JSON.stringify(arr));
}


function  addToContainer(favID){



 

        const ImageContainer =  document.createElement('div');
        const img = document.createElement('img');
        const imgInfo = document.createElement('div');
        const favorite = document.createElement('button');
        const anchor = document.createElement('a');
        ImageContainer.classList.add('super-container');
        ImageContainer.setAttribute('id',favID.id);
        
        // console.log(JSONObject.results[0].image.url);
        //creating img element
        img.setAttribute('src',favID.image.url);

        //creating info element
        imgInfo.classList.add('info');
        imgInfo.setAttribute('id',favID.id);
        imgInfo.innerHTML =  '<i class="fas fa-info-circle"></i>';

        //creating btn favorite

        favorite.classList.add('btn-fav-remove');
        favorite.setAttribute('id',favID.id);
        favorite.innerHTML = `<i class="fas fa-trash-alt" data-id="btn-fav-remove" id=${favID.id}></i>`;

        //adding the child in super-container class
        ImageContainer.appendChild(img)
        ImageContainer.appendChild(favorite);
        //seting anchor tag
        anchor.setAttribute('href', `./superhero.html?id=${favID.id}`);
        anchor.appendChild(imgInfo);
        ImageContainer.appendChild(anchor);

        //adding super_container  to container
        container.appendChild(ImageContainer);

}

function fetchDetailsId(id){


    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){

           let infoJSON = JSON.parse(xhrRequest.response);
            console.log(infoJSON.response);
           addToContainer(infoJSON);
           
    }

    xhrRequest.open('GET', `http://superheroapi.com/api/936106680158599/${id}`);
    xhrRequest.send();

}

function display(){

    set.forEach(function(id){
            console.log(id);
            fetchDetailsId(id);
    });
}

//fetch the id from the array to set
fetchId();

//display all the favorites
display();
function handleClickEvent(e){
   
    const parentContainer  = e.target.parentNode.parentNode.parentNode;
    console.log(e.target.id)
      if(e.target.dataset.id == 'btn-fav-remove') {
            let id = e.target.id;
           parentContainer.removeChild(e.target.parentNode.parentNode);//remove favorite
           set.delete(id);
           updateStorage();
      }
}
window.addEventListener('click',handleClickEvent);



