//counter code
var button = document.getElementById('counter');
var counter = 0;
alert("I am an alert box!");
button.onclick = function(){
    //make a request to the counter endpoint
    
    //capture the responce and store it into the variable
    
    //render the varianle in the correct span
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};