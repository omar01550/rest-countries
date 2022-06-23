let url=`https://restcountries.eu`;

let re=new XMLHttpRequest();
re.open("GET",url);

re.send();

re.onload=function(){
   console.log(true);
}
