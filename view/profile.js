var http = new XMLHttpRequest();
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  // console.log(inputValue);
          if (inputValue === '') {
              alert("You must write something!");
          } else {
            http.open("POST", "https://git.heroku.com/social-project.git/posts", true);
            http.send(inputValue);

            http.onreadystatechange = function(response) {
                if (http.readyState == 4 && http.status == 200) {
                    document.getElementById("myUL").innerHTML = "";
                    jsonOptions = JSON.parse(http.responseText);
                    jsonOptions.reverse().forEach(function(elem){
                      var li = document.createElement("li");
                      var t = document.createTextNode(elem.post_contents);
                      li.appendChild(t);
                      document.getElementById("myUL").appendChild(li);
                    });
                  }
              }
          }
document.getElementById("myInput").value = "";
}
