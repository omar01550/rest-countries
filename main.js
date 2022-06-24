let cards=document.querySelector(".cards");
let select =document.querySelector('select');
let back=document.querySelector(".back");
let home=document.querySelector(".home");
let details=document.querySelector(".details");

//details
let detailsImage=document.querySelector(".details img");
let countryName=document.querySelector(".country-name");

console.log(detailsImage);
let url=`https://restcountries.com/v3.1/all`;

//let url_name=`https://restcountries.com/v3.1/name/${"egypt"}`;

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
    <div class="card ${data[i].continents} country" data-border=${data[i].borders} data-nativeName=${data[0]} data-language=${data[i].languages} id=${Math.floor(Math.random()*10000000)} data-img=${data[i].flags.png} data-name=${data[i].name.common} data-population=${data[i].population} data-capital=${data[i].capital}>
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

    allCard.forEach(function(card){
       card.onclick=function(){
           detailsImage.src=card.dataset.img;
           countryName.innerHTML=card.dataset.name;


           home.classList.add("hidden-section");
           details.classList.remove("hidden-section")
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
      console.log(select.value);
     let url_select=`https://restcountries.com/v3.1/region/${select.value}`;

     fetch(url_select).then(response =>response.json()).then(data =>{
        cards.innerHTML="";
        createCard(data);
     })



}





// transform between pages


    back.onclick=function(){
        details.classList.toggle("hidden-section");
        home.classList.toggle("hidden-second");
        home.style.display="block";
    }




document.documentElement.addEventListener("click",function(e){
   console.log(e.target);
})
