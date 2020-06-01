//for superpage
const superContainer = document.getElementById('super-container');
const id  = parseInt(window.location.search.substring(4));

function displaySuperHeroPage(infoJSON) {
   
    
    const imgDiv = document.createElement('div');
    const imgInfo = document.createElement('div'); 
    imgDiv.classList.add('img-container');
    imgInfo.classList.add('img-info');

    //displaying the image

    imgDiv.innerHTML = `<img src=${infoJSON.image.url}>`;
    
    // Adding the info of the image
    imgInfo.innerHTML = `<span style="font-size:1.4rem; color:black;">Name:</span><span>${infoJSON.name}</span><br>`;
    let powerstats = `<span style="font-size:1.4rem; color:black;">powerstats </span><br>
        <span>intelligence:</span> ${infoJSON.powerstats.intelligence}<br>
        <span>strength</span>:${infoJSON.powerstats.strength}<br>
        <span>speed:</span> ${infoJSON.powerstats.speed}<br>
        <span>durability</span>: ${infoJSON.powerstats.durability}<br>
        <span>power</span>: ${infoJSON.powerstats.power}<br>
        <span>combat</span>: ${infoJSON.powerstats.comabt}<br>
        `;
    let bio = `<span style="font-size:1.3rem; color:black;">biography</span><br>
        <span>full-name:</span> ${infoJSON.biography["full-name"]}<br>
        <span>alter-egos:</span> ${infoJSON.biography["alter-egos"]}<br>
        <span>place-of-birth:</span> ${infoJSON.biography["place-of-birth"]}<br>
        <span>first-appearance:</span> ${infoJSON.biography["first-appearance"]}<br>
        <span>publisher:</span> ${infoJSON.biography["publisher"]}<br>
        <span>alignment:</span> ${infoJSON.biography["alignment"]}<br>`
    imgInfo.innerHTML += powerstats;
    imgInfo.innerHTML += bio;
    superContainer.appendChild(imgDiv);
    superContainer.appendChild(imgInfo);       
    
}

function fetchDetailsId(id){

    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){

            infoJSON = JSON.parse(xhrRequest.response);
           displaySuperHeroPage(infoJSON);
    }

    xhrRequest.open('GET', `http://superheroapi.com/api/936106680158599/${id}`);
    xhrRequest.send();

    

 
}

//display the info of target image

fetchDetailsId(id);


