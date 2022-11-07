let theme =localStorage.theme?localStorage.theme:"dark"; //current theme
let themeToggler = document.querySelector(".theme-toggler");


window.addEventListener("load",function () {
   if (theme=='dark') {
     themeToggler.classList.remove("fa-moon");
     themeToggler.classList.add("fa-sun");
   }else {
     themeToggler.classList.add("fa-moon");
     themeToggler.classList.remove("fa-sun");
   }
   handelTheme(theme);
}) //handel them when page load

function setTheme() {
    if (themeToggler.classList.contains("fa-moon")) {
         theme="dark";
         localStorage.setItem("theme",theme);
    }else{
      theme="light";
      localStorage.setItem("theme",theme);
    }
}
function handelTheme(theme) {
    if (theme == 'dark') {
         document.documentElement.style.setProperty("--header-bg","hsl(209, 23%, 22%)");
         document.documentElement.style.setProperty("--text-color","white");
         document.documentElement.style.setProperty("--home-bg","hsl(207, 26%, 17%)");
    }else{
       document.documentElement.style.setProperty("--home-bg","white");
       document.documentElement.style.setProperty("--text-color","black");
       document.documentElement.style.setProperty("--header-bg","#f5f5f5");

    }
}
themeToggler.addEventListener("click",function (e) {
     setTheme();
     e.target.classList.toggle("fa-moon");
     e.target.classList.toggle("fa-sun");
     handelTheme(theme);

})


// handel language
let selectLang = document.querySelector(".select-lang");
window.addEventListener("load",handelLanguage);
selectLang.addEventListener("change",setLang);
function setLang(e) {
     localStorage.setItem("lang",e.target.value);
     handelLanguage()
};

window.addEventListener("load",function () {
     if(localStorage.lang == 'arabic'){
         selectLang.innerHTML='';
         selectLang.innerHTML=`
         <option value="arabic">AR</option>
         <option value="english">EN</option>
         `
     }else{
        selectLang.innerHTML='';
        selectLang.innerHTML=`
        <option value="english">EN</option>
        <option value="arabic">AR</option>
        `
     }
})

