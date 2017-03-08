var http = new XMLHttpRequest();

function newElement() {
    // console.log(inputValue);
    var inputValue = document.getElementById("myInput").value;

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        http.open("POST", "/posts", true);
        http.send(inputValue);
        refreshposts();
        document.getElementById("myInput").value = "";
    }
}

function refreshposts() {
    http.open("POST", "/displayposts", true);
    http.send();

    http.onreadystatechange = function(response) {
        if (http.readyState == 4 && http.status == 200) {
            document.getElementById("myUL").innerHTML = "";
            jsonOptions = JSON.parse(http.responseText);
            jsonOptions.reverse().forEach(function(elem) {
                var li = document.createElement("li");
                var t = document.createTextNode(elem.post_contents);
                li.appendChild(t);
                document.getElementById("myUL").appendChild(li);
            });
        }
    }
}

setInterval(refreshposts, 3000);
