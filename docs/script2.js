var ship = document.getElementById("ship");

document.addEventListener("mousemove", function() {
    var x = e.clientX;
    var y = e.clientY;
    ship.style.left = x + "px";
    ship.style.top = y + "px";
});

