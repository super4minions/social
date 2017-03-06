// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
  var http = new XMLHttpRequest();
function newElement() {
  console.log("rquest");
  var inputValue = document.getElementById("myInput").value;
  http.open("POST", "/posts", true);
  http.send(inputValue);

            var li = document.createElement("li");
            if (inputValue === '') {
                alert("You must write something!");
            } else {
              http.onreadystatechange = function(response) {
                  if (http.readyState == 4 && http.status == 200) {
                      jsonOptions = JSON.parse(http.responseText);

                    //  console.log("jsonOptions", jsonOptions[0].post_contents);
                    var reverse = jsonOptions.reverse();
                    reverse.forEach(function (item) {
                      var t = document.createTextNode(item.post_contents);
                      li.appendChild(t);
                      document.getElementById("myUL").appendChild(li);
                    });

              }
            }
            }
            document.getElementById("myInput").value = "";

            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            for (i = 0; i < close.length; i++) {
                close[i].onclick = function() {
                    var div = this.parentElement;
                    div.style.display = "none";
                }
            }

}
