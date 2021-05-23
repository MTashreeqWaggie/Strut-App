function login() {
     
    var request= new XMLHttpRequest();

    var formData = new FormData();

    // retreiving data from html page
    var username = document.getElementById("login-page-username").value;
    var password = document.getElementById("login-page-password").value;

    sessionStorage.setItem('username', username);
    console.log(sessionStorage.getItem('username'));
    formData.append("username", username);
    formData.append("password", password);

    //sending post data to external api
    request.open("POST","http://127.0.0.1:8000/api/login");
    

    // logic for handling received data
	  request.onload=function(){
		  var data=JSON.parse(request.responseText);
      console.log(data);      

      if (data.response){
        console.log("SLAMAT");
        
        document.location = 'home-page.html'
        console.log(data.response);
      }else{
        document.location = 'login-page.html'

      }
    }

	request.send(formData);
}

function userInfo(){

  var request= new XMLHttpRequest();

  var formData = new FormData();

  // retreiving data from html page

  formData.append("studentNumber", sessionStorage.getItem('username'));

  //sending post data to external api
  request.open("POST","http://127.0.0.1:8000/api/studentDetails");
  

  // logic for handling received data
  request.onload=function(){
    var data=JSON.parse(request.responseText);

    //Setting values of variables in html
    document.getElementById("name").innerHTML = data.user.first_name;
    document.getElementById("last name").innerHTML = data.user.last_name;
    document.getElementById("email").innerHTML = String(data.user.username) + "@myuwc.ac.za" ;
    document.getElementById("student number").innerHTML = data.user.username ;

    var modules ="";

    for(var i=0; i<data.modules.length;i++){
      if (i==0){
        modules += String(data.modules[i].modulename);
      }else{
      modules +=", " + String(data.modules[i].modulename);
      }
    }

    document.getElementById("modules").innerHTML = modules;
      


    //if (data.response){
    //  console.log("SLAMAT");
    //  document.location = ''
    //}
  
  }
  request.send(formData);

}


// provides data to populate timetable
// need to provide student number

function hello(){

  return "../assets/img/floorPlans/" +  localStorage.getItem("dest-value")  + ".png";
}
  function timetable(){

    var request= new XMLHttpRequest();

    var formData = new FormData();

    // retreiving data from html page
    //var username = document.getElementById("timetable-username").value;
    formData.append("studentNumber", sessionStorage.getItem('username'));
    console.log(sessionStorage.getItem('username'));

    //sending post data to external api
    request.open("POST","http://127.0.0.1:8000/api/viewTimetable");

    // logic for handling received data
	  request.onload=function(){
		  var data=JSON.parse(request.responseText);
      console.log(data);   

        //populating timetable and setting venue values for each one to pass to directions page when they get clicked
      for (var i in data) {
        document.getElementById(String(data[i]['period']) +"x"+ String(data[i]['day'])).innerHTML =data[i]['module'] ;
        localStorage.setItem(String(data[i]['period']) +"x"+ String(data[i]['day']), String(data[i]['venue']));
      }

        //disabling empty table elements
        for (var i=1; i<6; i++ ){
          for (var j=1; j<5; j++){
            if (document.getElementById(String(i) +"x"+ String(j)).innerHTML == ""){
              document.getElementById(String(i) +"x"+ String(j)).onclick=null;
            }
          }
        } 
    }


	  request.send(formData); 

  }


  // for directions page
  function getdirections(){

    var request= new XMLHttpRequest();

    var formData = new FormData();

    // retreiving data from html page

    var location = document.getElementById("location").value;
    var destination = document.getElementById("testing").value;

    console.log(location);
    console.log(destination); 

    formData.append("from", location.toUpperCase());
    formData.append("to", destination.toUpperCase());

      //sending post data to external api
    request.open("POST","http://127.0.0.1:8000/api/navigate");
    
    //logic for handling received data
	  request.onload=function(){
		 var data=JSON.parse(request.responseText);
      console.log(data);      

      if (data.venue == false){
        var queryString = "?locname=" + data.from.buildingName + "&locx=" + data.from.x + "&locy=" + data.from.y + 
      "&destname=" + data.to.buildingName + "&desx=" + data.to.x+ "&desty=" + data.to.y;

      window.location.href = 'mapDisplayPage-page.html' + queryString;
      }else{
        var queryString = "?locname=" + data.from.buildingName + "&locx=" + data.from.x + "&locy=" + data.from.y + 
      "&destname=" + data.to.buildingName + "&desx=" + data.to.x+ "&desty=" + data.to.y 
      + "&venuename=" + data.venue.venueName+ "&venuepath=" + data.venue.venuePath;

      window.location.href = 'mapDisplayPage-page.html' + queryString;
  
      }

      

    }

	  request.send(formData);



  }


  // provides data to populate timetable
// need to provide student number
function examtimetable(){

  var request= new XMLHttpRequest();

  var formData = new FormData();

  // retreiving data from html page
  formData.append("studentNumber", sessionStorage.getItem('username'));

  //sending post data to external api
  request.open("POST","http://127.0.0.1:8000/api/viewExamTimetable");

  // logic for handling received data
  request.onload=function(){
    var data=JSON.parse(request.responseText);
    console.log(data);   

    //populating table with user data received from database
    for (var i=0;i<data.length;i++) {
      //console.log(i);
      document.getElementById(parseInt(i+1)+ "x" + parseInt(1)).innerHTML =data[i]['date'] ;
      document.getElementById(parseInt(i+1)+ "x" + parseInt(2)).innerHTML =data[i]['module'] ;
      document.getElementById(parseInt(i+1)+ "x" + parseInt(3)).innerHTML =data[i]['venue'] ;
      document.getElementById(parseInt(i+1)+ "x" + parseInt(4)).innerHTML =data[i]['period'] ;
      localStorage.setItem("exam-" + parseInt(i+1)+ "x" + parseInt(3), String(data[i]['venue']));


    }

    //disabling table elements which have no data so they are not clickable
    for (var i=1; i<6; i++ ){
      for (var j=1; j<5; j++){
        if (!document.getElementById(String(i) +"x"+ String(j)).innerHTML){
          document.getElementById(String(i) +"x"+ String(j)).onclick=null;
        }
      }
    } 

  }


  request.send(formData); 

}

function bookvenue(){
  
  var request= new XMLHttpRequest();

  var formData = new FormData();

  var venue = document.getElementById("venue").value;
  var date = document.getElementById("date").value;
  var period = document.getElementById("period").value;  

  formData.append("period", period);
  formData.append("date", date);
  formData.append("venue", venue.toUpperCase());
  formData.append("id", sessionStorage.getItem('username'));

  console.log("book venue executed");

  //sending post data to external api
    request.open("POST","http://127.0.0.1:8000/api/bookVenue");
  

    // logic for handling received data
    request.onload=function(){
      var data=JSON.parse(request.responseText);
      console.log(data);
  
      //if (data.response){
        //console.log("SLAMAT");
        //document.location = ''  
      //}
    
    }
    request.send(formData);


}


function checkvenue(){
  
  var request= new XMLHttpRequest();

  var formData = new FormData();

  var venue = document.getElementById("venue").value;
  var date = document.getElementById("date").value;
  var period = document.getElementById("period").value;  

  formData.append("period", period);
  formData.append("date", date);
  formData.append("venue", venue.toUpperCase());
  formData.append("id", "3750662");



    //sending post data to external api
    request.open("POST","http://127.0.0.1:8000/api/checkVenue");


  


    // logic for handling received data
    request.onload=function(){
      var data=JSON.parse(request.responseText);
      var avail = document.getElementById("availability");
      avail.value =data.message;
      console.log(avail.value);

      if(avail.value=="success"){
        $("#availModal").modal("toggle");
        document.getElementById("booking").disabled=false;
      }else {
        $("#notAvailModal").modal("toggle");
        document.getElementById("booking").disabled=true;

      }

  
      //if (data.response){
        //console.log("SLAMAT");
        //document.location = ''  
      //}

    }

    request.send(formData);
    //console.log(data);



}


function BackToDirections(back_value){
  console.log(back_value);
  document.getElementById('testing').innerHTML = back_value;
  console.log("value changed");
}

