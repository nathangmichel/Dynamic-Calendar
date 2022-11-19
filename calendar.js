// CLASSES AND CONSTANTS

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

class Task {
    constructor(name, est_length, importance, date){
        this.name = name;
        this.date = date;
        this.importance = importance;
        this.est_length = est_length;
    }
}

class Event {
    constructor(name, date, start, end){
        this.name = name;
        this.date = date;
        this.start = start;
        this.end = end;
    }
    
}

var result = []; // THE ACTUAL FINAL ARRAY
var event_calendar = []; // ARRAY WITH EVENTS

for (var i = 0; i < 48; i++) {
    result[i] = null;
    event_calendar[i] = null;
}

// IF DUE DATE NEEDS TO BE ADDED OR REMOVED

document.getElementById('add_date_button').onclick = function() {
 
    document.getElementById("add_date_button").style.display = "none";
    document.getElementById("urgency_date").value = "";
    document.getElementById("add_date_button_break").style.display = "none";
    document.getElementById("task_date").style.display = "block";
    
 };

 document.getElementById('remove_date_button').onclick = function() {
 
    document.getElementById("add_date_button").style.display = "block";
    document.getElementById("urgency_date").value = "";
    document.getElementById("task_date").style.display = "none";
    
 };

// TASKSSSSS

var tasks = [];

document.getElementById('add_task_button').onclick = function() {

   if (document.getElementById("task_name").value == "" || (document.getElementById("urgency_date").value == "" && document.getElementById("task_date").style.display == "block")){
        document.getElementById("missing_info").style.display = "block";
        return; 
   } 

   document.getElementById("missing_info").style.display = "none";

   const task = new Task(document.getElementById("task_name").value, parseInt(document.getElementById("est_length").value), parseInt(document.getElementById("importance_slider").value), new Date(document.getElementById("urgency_date").value));
   tasks.push(task);

   document.getElementById("add_date_button").style.display = "block";
   document.getElementById("urgency_date").value = "";
   document.getElementById("task_date").style.display = "none";
   document.getElementById("add_date_button_break").style.display = "none";

   document.getElementById("task_name").value = "";
   document.getElementById("est_length").value = "30";
   document.getElementById("est_sli_text").innerHTML = "30";
   document.getElementById("importance_slider").value = "50";
   document.getElementById("imp_sli_text").innerHTML = "50";

   updateTasks();
};

function updateTasks() {

    let list = document.getElementById("list_of_tasks");
    list.innerHTML = "";

    var i = 0;
    
    tasks.forEach((item) => {
        let li = document.createElement("li");

        if (isNaN(item.date.getDate())) {
            li.innerText = item.name + " (Importance: " + item.importance + ") ";
        } else {
            li.innerText = item.name + " (Importance: " + item.importance + ") Due: " + (item.date.getDate() + 1) + " " + month[item.date.getMonth()] + " ";
        }

        
        let x = document.createElement("button");
        x.innerHTML = "X";
        li.appendChild(x);
        
        x.onclick = function() {
            this.parentElement.style.display = "none";
            var i;
            for (i =0; i < tasks.length; i++) {
                if (tasks[i] == item) {
                    break;
                }
            }
            tasks.splice(i, 1);
            updateTasks();
        }
        list.appendChild(li);
    })

    //document.getElementById("alltasks").innerHTML = JSON.stringify(tasks, null, 2);
}

//

var events = [];

document.getElementById('button2').onclick = function() {

   const event = new Event(document.getElementById("fevent").value, document.getElementById("date").value, 
   [parseInt(document.getElementById("start").value.substring(0,2)), parseInt(document.getElementById("start").value.substring(3,5))], 
   [parseInt(document.getElementById("end").value.substring(0,2)), parseInt(document.getElementById("end").value.substring(3,5))]);
   events.push(event);

   console.log((event.start[0] * 60 + event.start[1]) / 30);

   for (var i = (event.start[0] * 60 + event.start[1]) / 30; i < (event.end[0] * 60 + event.end[1]) / 30; i++) {
        event_calendar[i] = event;
   }

   document.getElementById("fevent").value = "";
   document.getElementById("date").value = "";
   document.getElementById("start").value = "";
   document.getElementById("end").value = "";
   
   updateEvents();
};

function updateEvents() {

    let list = document.getElementById("list_of_events");
    list.innerHTML = "";

    var i = 0;
    
    events.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item.name + " " + item.start[0] + ":" + item.start[1] + "-" +  item.end[0] + ":" + item.end[1] +  " ";
        let x = document.createElement("button");
        x.innerHTML = "X";
        li.appendChild(x);
        
        x.onclick = function() {
            this.parentElement.style.display = "none";
            var i;
            for (i =0; i < events.length; i++) {
                if (events[i] == item) {
                    for (var j = i; j < (item.end[0] * 60 + item.end[1]) / 30; j++) {
                        event_calendar[j] = null;
                    }
                    break;
                }
            }
            events.splice(i, 1);
            updateTasks();
            updateCalendar();
        }
        list.appendChild(li);
    })

    updateCalendar();
    //document.getElementById("allevents").innerHTML = JSON.stringify(events, null, 2);
}

function updateCalendar(){
    document.getElementById("cal_array").innerHTML = JSON.stringify(event_calendar, null, 2);
}


