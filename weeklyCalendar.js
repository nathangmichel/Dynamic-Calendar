
var today = new Date();
weeklyCalendar();
// var funcs = [];
//newDay.setAttribute("name", dayNbr + "/" + today.getMonth() + "/" + today.getFullYear());

function weeklyCalendar() {

    //to clear the calendar
    for (var i = 0; i < 48; i++) {
        document.getElementById("rw" + (i + 1)).textContent = "";
    }
    
    //initialize weeks
    var timeSlotHr = -0.5
    var timeSlotMin = ["00", "30"]
    for (var i = 0; i < 48; i++) {
            // create an element
            var element = document.createElement("td")
            if (i % 2 == 0)
            {
                element.textContent = String(Math.ceil(timeSlotHr)) + ":" + timeSlotMin[i % 2]
            }
            else
            {
                element.innerHTML = "@"
                element.style.cssText += "opacity: 0;"
            }
            var className = String(Math.ceil(timeSlotHr)) + ":" + timeSlotMin[i % 2]
            element.setAttribute("class", className);
            element.style.cssText += "vertical-align: top;"
            timeSlotHr += 0.5 
            document.getElementById("rw" + (i + 1)).appendChild(element);
            for(var j=1; j<8;j++)
            {
                // create an element
                var element = document.createElement("td")
                var className = String(Math.ceil(timeSlotHr)) + ":" + timeSlotMin[i % 2] + "-" + String(j+1)
                element.setAttribute("class", className);
                document.getElementById("rw" + (i + 1)).appendChild(element);
            }
    }

};

document.getElementById("back").addEventListener("click", goBack);

function goBack()
{
    console.log("WIP")
}

// select dates

var isMouseDown = false
var isHighlighted = false;

document.getElementById("weekCalendar").onmousedown = function (event) {
isMouseDown = true;
console.log("MOUSE DOWN")
event.target.classList.add("highlighted");
// document.querySelector(this).classList.toggle("highlighted");
isHighlighted = document.getElementById("weekCalendar").classList.contains("highlighted");
}

document.getElementById("weekCalendar").onmouseover = function (event) {
    console.log("MOUSE OVER")
if (isMouseDown) {
    event.target.classList.add("highlighted");
    // document.querySelector(this).classList.toggle("highlighted", isHighlighted);
}
}

document.getElementById("weekCalendar").onmouseup = function () {
    console.log("MOUSE UP")
isMouseDown = false;
}