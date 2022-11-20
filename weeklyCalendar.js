
var today = new Date();
weeklyCalendar();
// var funcs = [];
//newDay.setAttribute("name", dayNbr + "/" + today.getMonth() + "/" + today.getFullYear());

function weeklyCalendar() {

    // legend update
    var legendRow = document.getElementById("topLegend")
    legendRow.innerHTML = ""
    // create time header
    var timeHead = document.createElement('th');
    timeHead.textContent = "Time"
    legendRow.appendChild(timeHead)


    //to clear the calendar
    for (var i = 0; i < 48; i++) {
        document.getElementById("rw" + (i + 1)).textContent = "";
    }

    
    var arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var todayDay = new Date()
    var weekdayNumber = todayDay.getDay()
    var weekdayName = arrayOfWeekdays[weekdayNumber]
    for(var i=1; i<6; i++)
    {
        var thElem = document.createElement('th');
        thElem.textContent = weekdayName
        legendRow.appendChild(thElem)

        weekdayNumber++
        weekdayName = arrayOfWeekdays[weekdayNumber]

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
            for(var j=0; j<5;j++)
            {
                // create an element
                var element = document.createElement("td")
                var classNameForSlots = className + "-" + String(j)
                element.setAttribute("class", classNameForSlots);
                document.getElementById("rw" + (i + 1)).appendChild(element);
            }
    }

};

var deleteSleep = true

function updateCalendar(list)
{
    // split data into 2d array
    var newList = [];
    while(list.length)
    {
        newList.push(list.splice(0,48));
    }

    // 1 bc time is 0
    var dayIndex = 1
    newList.forEach(weekdayData => {
        for(var i=0; i<weekdayData.length; i++)
        {
            // get cell next to that time
            var rowCell = "rw" + String(i+1)
            var taskCell = document.getElementById(rowCell)

            if(weekdayData[i] == -1)
            {
                if(deleteSleep)
                {
                    taskCell.remove()
                }
                continue
            }
            else if(weekdayData[i] != null && (weekdayData[i] instanceof Task || weekdayData[i] instanceof Event))
            {
                // get td in question
                taskCell = taskCell.childNodes[dayIndex]
                // rename the class information
                taskCell.className = weekdayData[i].name + "-" + taskCell.className
                
                if(weekdayData[i].name.length < 1)
                {
                    // fill with default info
                    taskCell.textContent = "Unknown Event"
                }
                else
                {
                    // fill with your own info
                    taskCell.textContent = weekdayData[i].name
                }
                
                if(weekdayData[i] instanceof Task){
                    taskCell.classList.add("taskHighlight");
                }
                else
                {
                    taskCell.classList.add("eventHighlight");
                }

                if(weekdayData[i] instanceof Event)
                {   
                    // TODO: Merge the event slots together

                    // count nbr of occurence
                    var countEventSlots = 0;
                    weekdayData.forEach(element => {
                    if(element == weekdayData[i])
                    {
                        countEventSlots+= 1
                    }
                    });
                    taskCell.rowSpan = countEventSlots


                    for(var j=1;j<countEventSlots;j++)
                    {
                        var rowDelete = document.getElementById("rw" + String(i+j+1))
                        var cellDelete = rowDelete.childNodes[dayIndex]
                        console.log("Element to delete" + cellDelete.className)
                        rowDelete.removeChild(cellDelete)
                    }
                    i += countEventSlots - 1 
                }
                
            }
        }
        deleteSleep = false
        dayIndex++
    });
}

// select dates

var isMouseDown = false
var isHighlighted = false;
var highlightedOnes = []
document.getElementById("weekCalendar").onmousedown = function (event) {
isMouseDown = true;
console.log("MOUSE DOWN", event.target)
if(event.target.className.includes('0-'))
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
        var highlightedCells = Array.from(document.getElementsByClassName("highlighted"))
        
        // remove highlighted cells
        highlightedCells.forEach(cell => {
            cell.classList.remove('highlighted');
        })
        temporaryCourse = highlightedOnes
        addCourseToCalendarLive(temporaryCourse)
        highlightedOnes = []
    }
}

// function that requires intervals (not be reading)
function addCourseToCalendarLive(hoursListClassName)
{
    var getCourseName = prompt("Please enter your event's name:", "Coding only with JavaScript!")
    var courseName = ""
    if (getCourseName == null || getCourseName == "") {
    courseName = "Unknown Event";
    }
    else
    {
        courseName = getCourseName
    }

    var rowspanned = false
    var table = document.getElementById("weekCalendar");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            if(hoursListClassName.includes(col.className))
            {
                if(!rowspanned)
                {
                    col.removeAttribute("class")
                    // col.classList.add(highlightedOnes.at(0).substring(0, highlightedOnes.at(0).indexOf("-") + "<->" + highlightedOnes.at(-1).substring(0, highlightedOnes.at(-1).indexOf("-"))));
                    col.classList.add(courseName.replace(/ /g,"_"));
                    col.classList.add("lectureHighlight");
                    col.rowSpan= String(hoursListClassName.length)
                    col.innerHTML = courseName
                    rowspanned = true
                }
                else
                {
                    col.remove()
                }
            }
        }  
    }
}

function addCourseToCalendar(scheduleObject)
{
    if(document.getElementsByClassName("inputBox")[0])
    {

    }
}