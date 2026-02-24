

document.addEventListener("DOMContentLoaded", function () {
    const statsContainer = document.getElementById("stats-container");
    const chartTitle = document.getElementById("chart-title");
    const workoutChartCanvas = document.getElementById("workoutChart");
    let workoutChart;

    // Workout categories
    const workoutCategories = ["Running", "Cycling", "Strength Training", "Yoga", "Swimming"];

    // Retrieve workouts from local storage
    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    // Function to calculate stats for each category
    function calculateStats(category) {
        const categoryWorkouts = workouts.filter(workout => workout.type === category);
        const totalWorkouts = categoryWorkouts.length;
        const totalCalories = categoryWorkouts.reduce((sum, workout) => sum + parseInt(workout.calories), 0);
        const avgDuration = totalWorkouts > 0 ? (categoryWorkouts.reduce((sum, workout) => sum + parseInt(workout.duration), 0) / totalWorkouts).toFixed(2) : 0;
        return { totalWorkouts, totalCalories, avgDuration, categoryWorkouts };
    }

    // Generate carousel items
    workoutCategories.forEach((category, index) => {
        const stats = calculateStats(category);
        const isActive = index === 0 ? "active" : "";
        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${isActive}`;
        carouselItem.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="card shadow-sm" style="width: 18rem;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${category}</h5>
                        <p><strong>Total Workouts:</strong> ${stats.totalWorkouts}</p>
                        <p><strong>Total Calories:</strong> ${stats.totalCalories}</p>
                        <p><strong>Avg Duration:</strong> ${stats.avgDuration} min</p>
                        <button class="btn btn-primary btn-sm w-100 show-graph" onclick="showGraph('${category}')">Show Graph</button>
                    </div>
                </div>
            </div>
        `;
        statsContainer.appendChild(carouselItem);
    });

    // Function to show the graph for a selected category
    window.showGraph = function (category) {
        const stats = calculateStats(category);

        if (stats.categoryWorkouts.length === 0) {
            alert(`No data available for ${category}`);
            return;
        }

        const labels = stats.categoryWorkouts.map(workout => workout.date);
        const durations = stats.categoryWorkouts.map(workout => parseInt(workout.duration));
        const calories = stats.categoryWorkouts.map(workout => parseInt(workout.calories));

        chartTitle.classList.remove("d-none");
        workoutChartCanvas.classList.remove("d-none");

        if (workoutChart) {
            workoutChart.destroy();
        }

        const ctx = workoutChartCanvas.getContext("2d");
        workoutChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Duration (min)",
                        data: durations,
                        backgroundColor: "rgba(255, 119, 0, 0.5)",
                        borderColor: "rgb(255, 98, 0)",
                        borderWidth: 1
                    },
                    {
                        label: "Calories Burned",
                        data: calories,
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgb(255, 136, 0)",
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };
});


function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft= "0";
  }