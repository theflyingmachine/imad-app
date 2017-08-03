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