
var users = [];
var sort_users = [];
var main = document.getElementById("main_users");
var sel = document.getElementById("sel");    
var url = "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture";
var modal = document.getElementById("modal");
var modalcont = document.getElementById("modal_content");
var close = document.getElementsByClassName("close");
var modal_img = document.getElementById("modal_user_img");
var modal_info = document.getElementById("modal_user_info");
var search_input = document.getElementById("searchinput");
var btn_search = document.getElementById("btn_search");
var text_search = document.getElementById("text_search");

btn_search.addEventListener('click',searchUser);

function eventListnerFunc(){   

    modal.style.display = "block";  

    for( var i = 0 ; i < users.length ; i++){
        
        if(users[i].picture.medium == this.childNodes[0].src){
            
            modal_img.src = users[i].picture.large;
            modal_info.innerText = "city: " + users[i].location.city+ "\n" +
                                    "street: "+ users[i].location.street + "\n" +
                                    "state: " + users[i].location.state + "\n" +                                    
                                    "email: " +  users[i].email + "\n" + 
                                    "phone: " +  users[i].phone;  

        } 
       }  
    }

 function closeclick(){

    modal.style.display = "none";      

}

function userSort(){

    var users_names = [];
              
    for( var i = 0 ; i < users.length ; i++){

     users_names.push( users[i].name.last ); 

    }               

   users_names.sort();                   

    if (sel.value == 2 ){ 
        index =  users.length-i-1;
    }
  
     for(var i = 0 ; i < users.length ; i++ ){

         var index=i;

         if (sel.value == 2 ){ 
             index =  users.length-i-1;
        } 
        if(sel.value == 0 ){
            byOption();
            return;
        }
     for(var j = 0 ; j < users.length ; j++ ){
             
          if(users[j].name.last == users_names[i]){
                   
          sort_users[index] = users[j];
                
               }                                              
         }
     }   
     showUsers(sort_users);       
}

function showUsers(userArr){
    
    main.innerHTML = "";
   
    for( var i = 0 ; i < userArr.length ; i++){   
                    
        main.innerHTML += "<div class='user'><img class='user_img' src=" 
        +userArr[i].picture.medium +"></img>"+ "<div class='user_name'>" + userArr[i].name.title + ". " +
        userArr[i].name.first + " " + userArr[i].name.last + "</div>" + "</div>" ;                   

    }

    addEventlistenerForUsers();  

}

function addEventlistenerForUsers(){  
    
    var derived_users = document.getElementsByClassName("user");     

    for( var i = 0 ; i < derived_users.length ; i++){

        derived_users[i].addEventListener('click',eventListnerFunc);

    }  
}

 function byOption(){

var request = new XMLHttpRequest();	
main.innerHTML = "";

request.onreadystatechange = function () {
   if (request.readyState == 4 && request.status == 200) {
           try {

               search_input.style.display = "block";
               var data = JSON.parse(request.responseText);	
               users = data.results;                                  
               showUsers(users);
                                                            
           } catch (err) {
                   console.log(err.message + " in " + request.responseText);
                   return;
           }
           
   }
};

request.open("GET",url);
request.send();

 }

  function searchUser(){  
    
    var search_user = [];
    
    for( var i = 0 ; i < users.length ; i ++ ){                     
       
    if((users[i].name.first + " " + users[i].name.last).indexOf(text_search.value) + 1 ) {
       
        search_user.push(users[i]);
     
     }
    }
    
    showUsers(search_user);    
    if(search_user.length == 0) {
        alert("Пользователи не найдены!");
    }
 }
 
 
  byOption();
    