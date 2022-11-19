
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

            element.style.cssText += "vertical-align: top;cursor: not-allowed;"
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
var highlightedOnes = []
document.getElementById("weekCalendar").onmousedown = function (event) {
isMouseDown = true;
console.log("MOUSE DOWN", event.target)
if(event.target.className.includes('-'))
    {
        highlightedOnes.push(event.target.className)
        event.target.classList.add("highlighted");
        
    }

// document.querySelector(this).classList.toggle("highlighted");
isHighlighted = document.getElementById("weekCalendar").classList.contains("highlighted");
// prevent dragging the cell
return false;
}

document.getElementById("weekCalendar").onmouseover = function (event) {
    console.log("MOUSE OVER")
    // condition HERE NEEDEDDDDD
if (isMouseDown && event.target.className.includes('-') && highlightedOnes.length >0) {
    var columnClassIndex = highlightedOnes.at(-1).substring(highlightedOnes.at(-1).indexOf('-'))
    if(event.target.className.includes(columnClassIndex))
    {
        highlightedOnes.push(event.target.className)
        event.target.classList.add("highlighted");
    }
}
}

var temporaryCourse = []

document.getElementById("weekCalendar").onmouseup = function () {
    console.log("MOUSE UP")
    isMouseDown = false;
    // store values inside of the weekInputBox
    if(highlightedOnes.length > 1)
    {
        var times = highlightedOnes.at(0) + "<->" + highlightedOnes.at(-1)
        var timeBox = document.getElementsByClassName("weekInputBox")[1]
        timeBox.value = times

        var highlightedCells = Array.from(document.getElementsByClassName("highlighted"))
        
        // remove highlighted cells
        highlightedCells.forEach(cell => {
            cell.classList.remove('highlighted');
        })
        temporaryCourse = highlightedOnes
        highlightedOnes = []
        addCourseToCalendar(temporaryCourse)
    }
}

function addCourseToCalendar(hoursListClassName)
{
    var table = document.getElementById("weekCalendar");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            if(hoursListClassName.includes(col.className))
            {
                col.classList.add("lectureHighlight");
            }
        }  
    }
}