let cards=document.querySelector(".cards");
let select =document.querySelector('select');



let url=`https://restcountries.com/v3.1/all`;

let url_2=`https://restcountries.com/v3.1/name/${"egypt"}

`


fetch(url).then(
  (data)=> data.json()
).then(
  data =>{
     createCard(data);
     handelSelect();
  }
)


function createCard(data){

  console.log(data);

  for(let i=0;i<data.length;i++){
    let card=`
    <div class="card" class=${data[i].continents} country>
       <img src=${data[i].flags.png} alt="not found image">
       <div class="card-content">
         <h2>${data[i].name.common}</h2>
         <div class="card-details">
            <div class="one">
                <span>region</span>:<span>${data[i].region}</span>
            </div>

            <div class="two">
               <span>Poulation</span>:<span>${data[i].population}</span>
            </div>



             <div class="three">
                 <span>capital</span>:<span>${data[i].capital}</span>
             </div>
         </div>

      </div>
    </div>
    `

    cards.innerHTML+=card;



  }

}




function handelSelect(){
  select.onchange=function(){
    let allCard=document.querySelectorAll(".card");

    allCard.forEach(card =>{
       //card.classList.add("hidden");
    })

    let allShow=allCard.filter(card =>{
       return card.classList.contains(`${select.value}`)
    });

    console.log(allShow);
    console.log(select.value);
    allShow.forEach(card =>{
       card.classList.remove("hidden");
    })
  }
}





//select on change
//country dispay none
//country
