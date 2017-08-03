//counter code
var button = document.getElementById('counter');
var counter = 0;

button.onclick = function(){
    //make a request to the counter endpoint
    var request = new XMLHttpRequest();
    
    //capture the responce and store it into the variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            //take some action
            if (request.status ===200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //not yet done
    };
    
    //Make the request
request.open('GET', 'http://ericabrahamea.imad.hasura-app.io/counter', true);
request.send(null);
};

//submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //make http request to server and submit name
     var request = new XMLHttpRequest();
    
    //capture the responce and store it into the variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            //take some action
            if (request.status ===200){
                    var names = request.responseText;
                    names = JSON.paser(names);
                    var list = '';
                    for (var i=0;i<names.length; i++){
                        list+='<li>' + names[i] + '</li>';
                    }
                    var ul = document.getElementById('namelist');
                    ul.innerHTML = list;            }
        }
        //not yet done
    };
    
    //Make the request
    var nameInput = document.getElementById('name');
var name = nameInput.value;
request.open('GET', 'http://ericabrahamea.imad.hasura-app.io/submit-name?name=' +name, true);
request.send(null);
   //capture a list of names and render it as a list

};