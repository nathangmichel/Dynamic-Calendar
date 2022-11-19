
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
            var className = String(i+1) + ":" + "1"
            element.setAttribute("class", className);
            element.setAttribute("VALIGN", "TOP");
            element.textContent = String(Math.ceil(timeSlotHr)) + ":" + timeSlotMin[i % 2]
            timeSlotHr += 0.5 
            document.getElementById("rw" + (i + 1)).appendChild(element);
            for(var j=1; j<8;j++)
            {
                // create an element
                var element = document.createElement("td")
                var className = String(i+1) + ":" + String(j+1)
                element.setAttribute("class", className);
                document.getElementById("rw" + (i + 1)).appendChild(element);
            }
    }

};


// document.getElementById("weekCalendar").onclick = function (event) {
//     if (event.target.nodeName.toLowerCase() == "td" && event.target.className.toLowerCase() == "futuredays") {
//         if (document.getElementById("selectedDay") != null) {
//             document.getElementById("selectedDay").removeAttribute("id");
//             event.target.id = "selectedDay";
//             var dayTime = event.target.textContent;
//             var monthTime = (today.getMonth() + 1);
//             if(dayTime < 10)
//             {
//             	dayTime = "0" + event.target.textContent;
//             }
//             if(monthTime < 10)
//             {
//             	monthTime = "0" + (today.getMonth() + 1);
//             }
//             var newdate = dayTime + "/" + monthTime + "/" + today.getFullYear();
//             displayDate(newdate);
//         } else {
//             event.target.id = "selectedDay";
//             var dayTime = event.target.textContent;
//             var monthTime = (today.getMonth() + 1);
//             if(dayTime.length == 1)
//             {
//             	dayTime = "0" + event.target.textContent;
//             }
//             if(monthTime < 10)
//             {
//             	monthTime = "0" + (today.getMonth() + 1);
//             }
//             var newdate = dayTime + "/" + monthTime + "/" + today.getFullYear();
//             displayDate(newdate);
//         }

//     }
// };


function displayDate(value) {
    document.getElementsByClassName("inputBox")[1].value = value;
}

document.getElementById("back").addEventListener("click", goBack);

function goBack()
{
    console.log("WIP")
}


// //THIS IS THE TIME SELECT MENU
// function removeTime() {
// 	var dateBox = document.getElementsByClassName("inputBox")[1];

// 	var selectTimes = document.getElementsByClassName("inputBox")[2];
// 	var length = selectTimes.options.length;
//     //day and month the same
//     if(new Date().getDate() == dateBox.value.substring(0, 2) && new Date().getMonth()+1 == dateBox.value.substring(3,5))
//     {
//         for (i = length-1; i >= 1; i--)
//         {
//             selectTimes.remove(i);
//         }
//         selectTimes.options[0].selected = "true";
//     }
//     else if(length <= 1)
//     {
// 		for(var i = 0; i<8;i++)
// 		{
// 			if(i == 0)
// 			{
// 				var option = document.createElement("option");
// 				option.text = "12:00 PM";
// 				option.value = "1200";
// 				var option2 = document.createElement("option");
// 				option2.text = "12:30 PM";
// 				option2.value = "1230";
// 				selectTimes.add(option);
// 				selectTimes.add(option2);
// 			}
// 			else if(i == 2)
// 			{
// 				i += 2;
// 			}
// 			else
// 			{
// 				var option = document.createElement("option");
// 				option.text = i + ":00 PM";
// 				option.value = (i+12) + "00";
// 				var option2 = document.createElement("option");
// 				option2.text = i + ":30 PM";
// 				option2.value = (i+12) + "30";
// 				selectTimes.add(option);
// 				selectTimes.add(option2);
// 			}
			
// 		}
		
// 	}
// }

// Collect information from Facebook Events and display them here