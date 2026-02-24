
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("workout-form");
    const workoutTableBody = document.querySelector("#workout-table tbody");
    const clearButton = document.getElementById("clear-button");
    
    loadWorkouts();
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const workoutType = document.getElementById("workout-type").value;
        const duration = document.getElementById("duration").value;
        const calories = document.getElementById("calories").value;
        const date = document.getElementById("date").value;
        
        if (!workoutType || !duration || !calories || !date) {
            alert("Please fill out all fields.");
            return;
        }
        
        // Store workout as an object
        const workout = {
            type: workoutType,
            duration: duration,
            calories: calories,
            date: date,
            likes: 0
        };
        
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.push(workout);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        
        form.reset();
        displayWorkouts();
    });

    function loadWorkouts() {
        displayWorkouts();
    }

    function displayWorkouts() {
        workoutTableBody.innerHTML = "";
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        
        workouts.forEach((workout, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${workout.type}</td>
                <td>${workout.duration} min</td>
                <td>${workout.calories} cal</td>
                <td>${workout.date}</td>
                <td><span id="like-count-${index}">${workout.likes}</span> <img src="./images/heart.svg" alt="" class="like" onclick="likeWorkout(${index})"></td>
                <td><button onclick="deleteWorkout(${index})">Delete</button></td>
            `;
            workoutTableBody.appendChild(row);
        });
    }
    
    window.deleteWorkout = function (index) {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.splice(index, 1);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        displayWorkouts();
    };
    
    window.likeWorkout = function (index) {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts[index].likes += 1;
        localStorage.setItem("workouts", JSON.stringify(workouts));
        document.getElementById(`like-count-${index}`).textContent = workouts[index].likes;
    };
    
    clearButton.addEventListener("click", function () {
        localStorage.removeItem("workouts");
        displayWorkouts();
    });
});


function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft= "0";
  }