
var today = new Date();
myCalendar();
// var funcs = [];
//newDay.setAttribute("name", dayNbr + "/" + today.getMonth() + "/" + today.getFullYear());

function myCalendar() {
    today.setDate(1);
    var firstMonthDayInd = today.getDay();
    var thisMonth = today.getMonth();
    var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var lastMonthDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    var lastPrevMonthDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    var lastMonthDayInd = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();

    document.getElementById("monthLabel").textContent = monthList[thisMonth] + " " + today.getFullYear();
    //
    var dayTime = new Date().getDate();
    var monthTime = (new Date().getMonth() + 1);
    if((thisMonth+1) == monthTime)
    {
    	 if(dayTime < 10)
    	{

    		dayTime = "0" + new Date().getDate();
    	}
	    if(monthTime < 10)
	    {
	    	monthTime = "0" + (new Date().getMonth() + 1);
	    }
	    document.getElementsByClassName("inputBox")[1].value = dayTime + "/" + monthTime + "/" + new Date().getFullYear();
    }
    else
    {
    	document.getElementsByClassName("inputBox")[1].value = "";
    }
   

    var dayNbr = 1;
    var row = 1;
    var printPrevDays = true;

    //to clear the calendar
    for (var i = 0; i < 6; i++) {
        document.getElementById("row" + (i + 1)).textContent = "";
    }
    while (dayNbr <= lastMonthDay) {
        for (var j = 0; j < 7; j++) {
            if (printPrevDays) {
                for (var y = firstMonthDayInd; y > 0; y--) {
                    var newDay = document.createElement('td');
                    newDay.setAttribute("class", "pastDays");
                    newDay.textContent = (lastPrevMonthDay - y + 1);
                    var theRow = document.getElementById("row1");
                    theRow.appendChild(newDay);
                }
                printPrevDays = false;
                j = firstMonthDayInd - 1;
            } else if (dayNbr <= lastMonthDay) {
                var newDay = document.createElement('td');
                if (today.getMonth() == new Date().getMonth() && dayNbr == new Date().getDate()) {
                    newDay.setAttribute("id", "selectedDay");
                    newDay.setAttribute("class", "futureDays");
                } else if (j == 1) {
                    newDay.setAttribute("class", "pastDays");
                } else if (today.getMonth() == new Date().getMonth() && dayNbr < new Date().getDate()) {
                    newDay.setAttribute("class", "pastDays");
                } else {
                    newDay.setAttribute("class", "futureDays");
                }
                newDay.textContent = dayNbr++;
                var theRow = document.getElementById("row" + row);
                theRow.appendChild(newDay);
            } else {
                break;
            }

        }
        row++;
    }


    for (var z = 1; z <= (7 - lastMonthDayInd - 1); z++) {
        var extraDay = document.createElement('td');
        extraDay.textContent = z;
        extraDay.setAttribute("class", "pastDays");
        var theRow = document.getElementById("row" + (row - 1));
        theRow.appendChild(extraDay);
    }
};

document.getElementById("calendar").onclick = function (event) {
    if (event.target.nodeName.toLowerCase() == "td" && event.target.className.toLowerCase() == "futuredays") {
        if (document.getElementById("selectedDay") != null) {
            document.getElementById("selectedDay").removeAttribute("id");
            event.target.id = "selectedDay";
            var dayTime = event.target.textContent;
            var monthTime = (today.getMonth() + 1);
            if(dayTime < 10)
            {
            	dayTime = "0" + event.target.textContent;
            }
            if(monthTime < 10)
            {
            	monthTime = "0" + (today.getMonth() + 1);
            }
            var newdate = dayTime + "/" + monthTime + "/" + today.getFullYear();
            displayDate(newdate);
        } else {
            event.target.id = "selectedDay";
            var dayTime = event.target.textContent;
            var monthTime = (today.getMonth() + 1);
            if(dayTime.length == 1)
            {
            	dayTime = "0" + event.target.textContent;
            }
            if(monthTime < 10)
            {
            	monthTime = "0" + (today.getMonth() + 1);
            }
            var newdate = dayTime + "/" + monthTime + "/" + today.getFullYear();
            displayDate(newdate);
        }

    }
};


function displayDate(value) {
    document.getElementsByClassName("inputBox")[1].value = value;
}


function prevMonth() {
    var realDay = new Date();
    if (today.getFullYear() == realDay.getFullYear() && (today.getMonth() - 1) < realDay.getMonth()) {
        console.log("Unable to go months before.");
    } else {
        today.setMonth(today.getMonth() - 1);
        myCalendar();
    }

}

function nextMonth() {
    var realDay = new Date();
    if (today.getFullYear() > realDay.getFullYear() && (today.getMonth() + 1) == realDay.getMonth()) {

    } else {
        today.setMonth(today.getMonth() + 1);
        myCalendar();
    }

}

document.getElementById("prevmonth").addEventListener("click", prevMonth);
document.getElementById("nextmonth").addEventListener("click", nextMonth);


//THIS IS THE TIME SELECT MENU
function removeTime() {
	var dateBox = document.getElementsByClassName("inputBox")[1];

	var selectTimes = document.getElementsByClassName("inputBox")[2];
	var length = selectTimes.options.length;
    //day and month the same
    if(new Date().getDate() == dateBox.value.substring(0, 2) && new Date().getMonth()+1 == dateBox.value.substring(3,5))
    {
        for (i = length-1; i >= 1; i--)
        {
            selectTimes.remove(i);
        }
        selectTimes.options[0].selected = "true";
    }
    else if(length <= 1)
    {
		for(var i = 0; i<8;i++)
		{
			if(i == 0)
			{
				var option = document.createElement("option");
				option.text = "12:00 PM";
				option.value = "1200";
				var option2 = document.createElement("option");
				option2.text = "12:30 PM";
				option2.value = "1230";
				selectTimes.add(option);
				selectTimes.add(option2);
			}
			else if(i == 2)
			{
				i += 2;
			}
			else
			{
				var option = document.createElement("option");
				option.text = i + ":00 PM";
				option.value = (i+12) + "00";
				var option2 = document.createElement("option");
				option2.text = i + ":30 PM";
				option2.value = (i+12) + "30";
				selectTimes.add(option);
				selectTimes.add(option2);
			}
			
		}
		
	}
}

// Collect information from Facebook Events and display them here