document.getElementById("addChallenge").addEventListener("click", () => {
  const name = document.getElementById("challengeName").value.trim() || "Unnamed Challenge";
  const days = parseInt(document.getElementById("daysInput").value) || 0;
  const hours = parseInt(document.getElementById("hoursInput").value) || 0;
  const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
  const seconds = parseInt(document.getElementById("secondsInput").value) || 0;
  
  const totalMilliseconds = ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
  const targetTime = Date.now() + totalMilliseconds;
  
  const challengeDiv = document.createElement("div");
  challengeDiv.classList.add("challenge");
  challengeDiv.innerHTML = `<strong>${name}</strong>: <span class="countdown"></span>`;
  document.getElementById("challenges").appendChild(challengeDiv);
  
  function updateCountdown() {
    const now = Date.now();
    const diff = targetTime - now;
    if (diff <= 0) {
      challengeDiv.querySelector(".countdown").textContent = "Time's up!";
      clearInterval(interval);
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    challengeDiv.querySelector(".countdown").textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
});

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  // document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  // document.getElementById("main").style.marginLeft= "0";
}