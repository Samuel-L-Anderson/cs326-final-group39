var messCol = document.getElementById("messColumn");
var btn = document.getElementById("comment");
var con = document.getElementById("content");

btn.addEventListener('click', function () {
    var messDiv = document.createElement("div");
    messDiv.setAttribute("style", "width:100%%;height:50px;border:1px solid #808080;margin-bottom:5px;");
    var messCon = document.createElement("div");
    messCon.setAttribute("style", "float:left;width:100%;height=50px;overflow:auto;");
    messDiv.appendChild(messCon);
    messCon.innerHTML = messCol.value;
    con.appendChild(messDiv);
    messCol.value = "";
});