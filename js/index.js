let selectRegion =document.querySelector('.home select'); //select region
let home=document.querySelector(".home");  // home page section
let showMore = document.querySelector(".show-more");
let allCountries = document.querySelector(".countries")  // parent div for countries
let searchInput = document.querySelector("[type=search]");
let loder = document.querySelector(".loder");
let url=`https://restcountries.com/v3.1/all`; //all Countries


window.addEventListener("load",function () {
   fetchAllData(url)
});

showMore.addEventListener("click",function () {
      showMore.innerHTML='...';
      allCountries.innerHTML='';
      loder.classList.remove("hidden");
      fetchAllData(url,250);
      showMore.style.display="none";
});

async function fetchAllData(url=`https://restcountries.com/v3.1/all`,limet=20){
      let response = await fetch(url);
      let data = await response.json();
      data.length = limet;
      createCountry(data)
      loder.classList.add("hidden");

  }



function createCountry(data) {
    data.forEach((element, i) => {
      let country=`
      <a href="#" class="country" data-element=${element} data-name=${element.name.common} ${element.continents} country" data-border=${element.borders} data-nativeName=${data[0]} data-language=${element.languages} id=${Math.floor(Math.random()*10000000)} data-img=${element.flags.png} data-name=${element.name.common} data-population=${element.population} data-capital=${element.capital} data-subregion=${element.subregion} data-region=${element.region}>
         <div class="image-parent">
             <img src=${element.flags.png} alt="not found image">
         </div>
         <div class="card-content">
           <h2 class="country-name" data-arabic=${element.translations.ara.common} data-english=${element.name.common}>${localStorage.lang == "arabic"?element.translations.ara.common:element.name.common}</h2>
           <div class="card-details">
              <div class="one">
                  <span class="key key-region">region</span>:<span class="value">${element.region}</span>
              </div>
              <div class="two">
                 <span class="key key-population">Poulation</span>:<span class="value">${element.population}</span>
              </div>
           <div class="three">
                   <span class="key key-capital">capital</span>:<span class="value">${element.capital}</span>
           </div>

           </div>
        </div>
      </a>
      `;


      allCountries.innerHTML+=country;

    });

    moreDetails()

}


// onclick on card
function moreDetails() {
   let allCards = document.querySelectorAll(".country");
   allCards.forEach((country, i) => {
        country.onclick=function () {
              localStorage.setItem("countryName",country.dataset.name)
              window.location="details.html";
        }
   });

}

//search by name

searchInput.onkeyup = () => {
  let urlByName = searchInput.value == '' ?`https://restcountries.com/v3.1/all`:`https://restcountries.com/v3.1/name/${searchInput.value}`;

   fetch(urlByName).then(
      res => res.json()
   ).then(
      data =>{


         if (data.status == 404) {
             allCountries.innerHTML=`<h1 style="color:white">not found country</h1>`;
         }else{
            allCountries.innerHTML='';
            createCountry(data);
         }

      }
   )
}





// search by region
let regionSelect = document.querySelector(".region-select");

regionSelect.addEventListener("change",function (e) {
   let url_region=`https://restcountries.com/v3.1/region/${e.target.value}`;
   let url = e.target.value == "All"?`https://restcountries.com/v3.1/all`:url_region
   fetchByRegion(url);
})

async function fetchByRegion(url) {
   let response = await fetch(url);
   let data = await response.json();
   allCountries.innerHTML='';
   createCountry(data);
}



// selectLang.addEventListener("click",setLang);

function setLang(e) {
     localStorage.setItem("lang",e.target.value);
     handelLanguage()
}

let englishSubtitle = {
   logo:"wherw in the world",
   searchPlaceHolder:"search for any country",
   countryPopulation:"population",
   countryRegion:"region",
   countryCapital:'capital'
}

let arabicSubtitle ={
  logo:"دول العالم",
  searchPlaceHolder:"ابحث عن اى دوله تريد",
  countryPopulation:"التعداد",
  countryRegion:"القارة",
  countryCapital:'العاصمة'

}

function handelLanguage() {

  let populationKey = document.querySelectorAll(".key-population");
  let capitalKey = document.querySelectorAll(".key-capital");
  let keyRegion = document.querySelectorAll(".key-region");
  let countryName = document.querySelectorAll(".country-name");
  let logo = document.querySelector(".logo");


    if(localStorage.lang == 'arabic'){
             document.documentElement.dir="rtl";
             populationKey.forEach((ele, i) => {
            ele.innerHTML=arabicSubtitle.countryPopulation;
        });

        capitalKey.forEach((ele, i) => {
            ele.innerHTML=arabicSubtitle.countryCapital;
        });

        keyRegion.forEach((ele, i) => {
            ele.innerHTML=arabicSubtitle.countryRegion;
        });

        countryName.forEach((ele, i) => {
            ele.innerHTML=ele.dataset.arabic;
        });

      searchInput.placeholder=arabicSubtitle.searchPlaceHolder;
      logo.innerHTML=arabicSubtitle.logo;

    }else{

      populationKey.forEach((ele, i) => {
          ele.innerHTML=englishSubtitle.countryPopulation;
          document.documentElement.dir="ltr";
      });

      capitalKey.forEach((ele, i) => {
          ele.innerHTML=englishSubtitle.countryCapital;
      });

      keyRegion.forEach((ele, i) => {
          ele.innerHTML=englishSubtitle.countryRegion;
      });

      countryName.forEach((ele, i) => {
          ele.innerHTML=ele.dataset.english;

      });

    searchInput.placeholder=englishSubtitle.searchPlaceHolder;

    logo.innerHTML = englishSubtitle.logo;

    }
}



// handel sroll to top

let scrollToTop = document.querySelector(".scroll-to-top");
scrollToTop.onclick = function () {
    window.scrollTo({
       left:0,
       top:0
    })
}
