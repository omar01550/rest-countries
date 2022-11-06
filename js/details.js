let details = document.querySelector(".details");
let backBtn = document.querySelector(".back"); // back btn
let detailsImage=document.querySelector(".details img");
let countryName=document.querySelector(".country-name");
let capitalDetails=document.querySelector(".details .capital-details")
let populationDetais=document.querySelector(".details .population-details");
let regionDetais=document.querySelector(".details .region-details");
let subregionDetais=document.querySelector(".details .subregion-details");
let bordersDiv = document.querySelector(".border"); // parent div to borders countries
let all = document.querySelector(".all"); // the div contains details
let loder = document.querySelector(".loder");



// when window load get target country
window.onload = function () {
  getCountry(`https://restcountries.com/v3.1/name/${window.localStorage.countryName}`)
  handelLanguage();
}
//functions
// get  countries from api and create countries card
async function getCountry(url) {
  loder.classList.remove("hidden")
    let response = await fetch(url);
    if (response.status == 404) { // if
         all.innerHTML=`<h1 class="details-alert">${localStorage.lang == 'english'?"not found country":"هذه الدولة غير موجودة"}</h1>`;

    }
    console.log(url);
    let data =  await response.json() ;
    loder.classList.add("hidden");
    handelDetails(...data);
    loder.classList.add("hidden")
}
// [handel details ] == add all details to page
function handelDetails(data) {
  detailsImage.src = data.flags.png;
  countryName.innerHTML = localStorage.lang == 'arabic'?data.translations.ara.common:data.name.common;
  countryName.dataset.english=data.name.common;
  countryName.dataset.arabic = data.translations.ara.common;
  populationDetais.innerHTML=data.population;
  regionDetais.innerHTML = data.region;
  subregionDetais.innerHTML=data.subregion;
  capitalDetails.innerHTML = data.capital[0];
  if(data.borders){
      data.borders.forEach((item, i) => {
           let span = `<button type="button" name="button" class="border-button border-${i}" data-target=${item}> ${item}</button>`;
           bordersDiv.innerHTML+=span;
      });

  }else{
    let span = `<span type="button" name="button" class="alert"> ${localStorage.lang == 'arabic'?"لا يوجد حدود":"this country not have a borders"}</span>`;
    bordersDiv.innerHTML+=span;
  }

   let borderBtns = document.querySelectorAll(".border-button");
    borderBtns.forEach((ele, i) => {
        ele.onclick = function () {
            localStorage.countryName=ele.innerHTML;
            window.location.reload();
        }
    });


}

//subtitles

let englishSubtitle = {
   logo:"where in the world",
   countryPopulation:"population",
   countryRegion:"region",
   countryCapital:'capital',
   countrySubregion:"subregion",
   bordersTitle:"borders",
   borderMessage:"",
   backBtn:"back"
}

let arabicSubtitle ={
  logo:"دول العالم",
  countryPopulation:"التعداد",
  countryRegion:"القارة",
  countryCapital:'العاصمة',
  subregion:'',
  backBtn:"رجوع",
  bordersTitle:"الحدود",
  countrySubregion:"القارة 2",
  borderMessage:'لا يوجد حدود',
  logo:"دول العالم"

}

// handel language
function handelLanguage() {
    let countryName = document.querySelector(".country-name");
    let countryPopulation= document.querySelector(".key-population");
    let countryRegion = document.querySelector(".key-region");
    let countryCapital = document.querySelector(".key-capital");
    let countrySubregion = document.querySelector(".key-subregion");
    let backBtn = document.querySelector(".back");
    let bordersTitle = document.querySelector(".borders-title");
    let logo = document.querySelector(".logo");


    if(localStorage.lang == 'arabic'){
         document.documentElement.dir="rtl";
         countryName.innerHTML = arabicSubtitle.countryName;
         countryRegion.innerHTML = arabicSubtitle.countryRegion;
         countryPopulation.innerHTML = arabicSubtitle.countryPopulation;
         countrySubregion.innerHTML = arabicSubtitle.countrySubregion;
         countryCapital.innerHTML = arabicSubtitle.countryCapital;
         backBtn.innerHTML = arabicSubtitle.backBtn;
         bordersTitle.innerHTML = arabicSubtitle.bordersTitle;
         logo.innerHTML =arabicSubtitle.logo;
         countryName.innerHTML=countryName.dataset.arabic;
    }else{
      document.documentElement.dir="ltr";
      countryName.innerHTML = englishSubtitle.countryName;
      countryRegion.innerHTML = englishSubtitle.countryRegion;
      countryPopulation.innerHTML = englishSubtitle.countryPopulation;
      countrySubregion.innerHTML = englishSubtitle.countrySubregion;
      countryCapital.innerHTML = englishSubtitle.countryCapital;
      backBtn.innerHTML = englishSubtitle.backBtn;
      bordersTitle.innerHTML = englishSubtitle.bordersTitle;
      let logo = document.querySelector(".logo");
      logo.innerHTML =englishSubtitle.logo;
      countryName.innerHTML=countryName.dataset.english;

    }

}
