//home section  vars
let cards=document.querySelector(".cards");
let select =document.querySelector('select');
let home=document.querySelector(".home");
//details  section vars
let details=document.querySelector(".details");
let back=document.querySelector(".back");
let detailsImage=document.querySelector(".details img");
let countryName=document.querySelector(".country-name");

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
// when click on card
    allCard.forEach(function(card){
       card.onclick=function(){
           detailsImage.src=card.dataset.img;
           countryName.innerHTML=card.dataset.name;



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
      console.log(select.value);
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

document.documentElement.addEventListener("click",function(e){
   console.log(e.target);
})



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
