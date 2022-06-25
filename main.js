//home section  vars
let cards=document.querySelector(".cards");
let select =document.querySelector('select');
let home=document.querySelector(".home");
//details  section vars
let details=document.querySelector(".details");
let back=document.querySelector(".back");
let detailsImage=document.querySelector(".details img");
let countryName=document.querySelector(".country-name");
let capitalDetails=document.querySelector(".details .capital-details")
let populationDetais=document.querySelector(".details .population-details");
let regionDetais=document.querySelector(".details .region-details");
let subregionDetais=document.querySelector(".details .subregion-details");
let border_1=document.querySelector(".border-1");
let border_2=document.querySelector(".border-2");
let border_3=document.querySelector(".border-3");

//url api
let url=`https://restcountries.com/v3.1/all`;



//fetch all countries
  fetch(url).then(
    (data)=> data.json()
  ).then(
    data =>{
       createCard(data);

    }
  )


// create Cards
function createCard(data){

   console.log(data[0]);
  for(let i=0;i<data.length;i++){
    let card=`
    <div class="card ${data[i].continents} country" data-border=${data[i].borders} data-nativeName=${data[0]} data-language=${data[i].languages} id=${Math.floor(Math.random()*10000000)} data-img=${data[i].flags.png} data-name=${data[i].name.common} data-population=${data[i].population} data-capital=${data[i].capital} data-subregion=${data[i].subregion} data-region=${data[i].region}>
       <img src=${data[i].flags.png} alt="not found image">
       <div class="card-content">
         <h2>${data[i].name.common}</h2>
         <div class="card-details">
            <div class="one">
                <span class="key">region</span>:<span class="value">${data[i].region}</span>
            </div>

            <div class="two">
               <span class="key">Poulation</span>:<span class="value">${data[i].population}</span>
            </div>
         <div class="three">
                 <span class="key">capital</span>:<span class="value">${data[i].capital}</span>
             </div>
         </div>

      </div>
    </div>
    `

    cards.innerHTML+=card;

    let allCard=document.querySelectorAll(".card");
// when click on card
    allCard.forEach(function(card){
       card.onclick=function(){
           detailsImage.src=card.dataset.img;
           countryName.innerHTML=card.dataset.name;
           capitalDetails.innerHTML=card.dataset.capital;
           regionDetais.innerHTML=card.dataset.region;
           populationDetais.innerHTML=card.dataset.population;
           subregionDetais.innerHTML=card.dataset.subregion;
           let borders=card.dataset.border.split(",");

           border_1.innerHTML=borders[0];
           border_2.innerHTML=borders[1];
           border_3.innerHTML=borders[2];






           home.style.display="none";
           details.style.display="block";

       }
    })





  }

}



//serch with name
let search=document.querySelector("[type=search]");
search.onkeyup=function() {
   if(search.value != ""){
     let url_search=`https://restcountries.com/v3.1/name/${search.value}`;
     fetch(url_search).then(response =>response.json()).then(data =>{
        cards.innerHTML="";
        createCard(data);
     })

   }

}

// select region

select.onchange=function() {

     let url_select=`https://restcountries.com/v3.1/region/${select.value}`;

     fetch(url_select).then(response =>response.json()).then(data =>{
        cards.innerHTML="";
        createCard(data);
     })
}





// transform between pages
    back.onclick=function(){
        details.style.display="none";
        home.style.display="block";
   }





//scroll to top
let scrollBtn=document.querySelector(".scroll-to-top")
window.addEventListener("scroll",function(){
   if(window.scrollY > 600){
       scrollBtn.style.right="40px";
   }else{
        scrollBtn.style.right="-40px";
   }
})


scrollBtn.onclick=function(){
   window.scrollTo(0,0);
}



//dark mode
let mood=document.querySelector(".mood");

window.addEventListener("load",changeMood);
mood.onclick=function(){
   changeMood()
}

function changeMood(){
  mood.classList.toggle("fa-sun");
  mood.classList.toggle("fa-moon");

  if(mood.classList.contains("fa-moon")){
     document.documentElement.style.setProperty("--header-color-dark","white");
     document.documentElement.style.setProperty("--color-home-dark","hsl(0, 0%, 98%)");
     document.documentElement.style.setProperty("--text-color","black");
  }else {
    document.documentElement.style.setProperty("--header-color-dark","hsl(209, 23%, 22%)");
    document.documentElement.style.setProperty("--color-home-dark","hsl(207, 26%, 17%)");
    document.documentElement.style.setProperty("--text-color","white");
  }
}
