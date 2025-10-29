document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startTraining").addEventListener("click", calculateFitness);
    document.getElementById("analyzeLookmaxing").addEventListener("click", analyzeLookmaxing);
    document.getElementById("completeWorkout").addEventListener("click", updateProgress);
});

// Progress Tracking Variables
let currentProgress = 0;
let currentRank = "C-Rank";  
let daysRequired = 0;  
let rankMilestones = { "E-Rank": 40, "D-Rank": 30, "C-Rank": 25, "B-Rank": 20, "A-Rank": 15 };

function calculateFitness() {
    let age = parseInt(document.getElementById("age").value);
    let height = parseFloat(document.getElementById("height").value) / 100;
    let weight = parseFloat(document.getElementById("weight").value);
    let gender = document.getElementById("gender").value;

    if (!age || !height || !weight || !gender) {
        alert("⚠ Please fill all fields correctly!");
        return;
    }

    let bmi = (weight / (height * height)).toFixed(1);

    if (bmi < 18.5) {
        currentRank = "E-Rank (Underweight)";
        daysRequired = 120;
    } else if (bmi < 22.0) {
        currentRank = "D-Rank";
        daysRequired = 90;
    } else if (bmi < 25.0) {
        currentRank = "C-Rank (Healthy)";
        daysRequired = 75;
    } else if (bmi < 30.0) {
        currentRank = "B-Rank (Fit)";
        daysRequired = 60;
    } else {
        currentRank = "A-Rank (Overweight)";
        daysRequired = 45;
    }

    document.getElementById("rank-section").innerHTML = `<h2>🏆 Your Rank: ${currentRank}</h2>`;
    document.getElementById("progressText").innerText = `Progress: ${currentProgress} / ${daysRequired} days`;

    let { workoutPlan, dietPlan } = getPlanByRank(currentRank, bmi, weight);
    document.getElementById("plan-section").innerHTML = `
        <h2>🔥 Your Personalized Plan</h2>
        ${workoutPlan}
        ${dietPlan}
    `;
}

function updateProgress() {
    if (currentProgress < daysRequired) {
        currentProgress++;
        let progressPercent = Math.round((currentProgress / daysRequired) * 100);
        document.getElementById("progressFill").style.width = `${progressPercent}%`;
        document.getElementById("progressFill").innerText = `${progressPercent}%`;
        document.getElementById("progressText").innerText = `Progress: ${currentProgress} / ${daysRequired} days`;

        motivateUser(progressPercent);

        if (currentProgress >= rankMilestones[currentRank]) {
            promoteRank();
        }
    }
}

function promoteRank() {
    let ranks = ["E-Rank", "D-Rank", "C-Rank", "B-Rank", "A-Rank", "S-Rank"];
    let currentIndex = ranks.indexOf(currentRank);
    if (currentIndex < ranks.length - 1) {
        currentRank = ranks[currentIndex + 1];
        alert(`🔥 Congratulations! You've ranked up to ${currentRank} 🔥`);
        document.getElementById("rank-section").innerHTML = `<h2>🏆 Your Rank: ${currentRank}</h2>`;
        let { workoutPlan, dietPlan } = getPlanByRank(currentRank);
        document.getElementById("plan-section").innerHTML = `
            <h2>🔥 Your New Training Plan</h2>
            ${workoutPlan}
            ${dietPlan}
        `;
    }
}

function motivateUser(progress) {
    let messages = [
        "🔥 Keep pushing! Every rep counts!",
        "💪 You're making progress! Don't stop now!",
        "🏆 Just a little more effort and you'll level up!",
        "💥 Your strength is awakening! Keep going!",
        "⚡ Feel the power rising inside you!"
    ];
    let randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById("progressText").innerText += `\n${randomMessage}`;
}

function getPlanByRank(rank, bmi, weight) {
    let proteinIntake = (1.2 * weight).toFixed(1);
    let carbIntake = (bmi < 22.0 ? "High" : "Moderate");

    let workoutPlan = `<p>💪 <strong>Workout Plan:</strong> 
        <ul>
            <li>${rank === "E-Rank" ? "Strength Training (3 days/week)" : "Strength & Endurance (5 days/week)"}</li>
            <li>${rank === "A-Rank" ? "HIIT & Sprint Cardio (45 min/day)" : "Moderate Cardio (30 min/day)"}</li>
            <li>${rank === "S-Rank" ? "Elite Level Training - Mixed Martial Arts + Strength Drills" : "Progressive Muscle Building"}</li>
        </ul>
    </p>`;

    let dietPlan = `<p>🥗 <strong>Diet Plan:</strong>
        <ul>
            <li>Protein Intake: ${proteinIntake}g per day</li>
            <li>Carb Intake: ${carbIntake}</li>
            <li><strong>Meal Plan:</strong>
                <ul>
                    <li>🍳 Breakfast: ${rank === "E-Rank" ? "Oats, Peanut Butter, Banana, Eggs" : "Oats, Eggs, Greek Yogurt"}</li>
                    <li>🍗 Lunch: ${rank === "D-Rank" ? "Chicken Breast, Brown Rice, Vegetables" : "Grilled Fish, Quinoa, Salad"}</li>
                    <li>🥩 Dinner: ${rank === "C-Rank" ? "Lean Meat, Sweet Potatoes, Greens" : "Salmon, Steamed Veggies, Whole Grain Bread"}</li>
                </ul>
            </li>
        </ul>
    </p>`;

    return { workoutPlan, dietPlan };
}

function analyzeLookmaxing() {
    let photo = document.getElementById("photo-upload").files[0];
    if (!photo) {
        alert("⚠ Please upload a photo first!");
        return;
    }

    // Simulate AI-based lookmaxing analysis
    let suggestions = `
        <h2>👁 Lookmaxing Analysis</h2>
        <p>📌 Improve Jawline Definition: Chewing gum & Facial exercises</p>
        <p>📌 Better Skin Quality: Hydration & Skincare Routine</p>
        <p>📌 Symmetry Enhancement: Good Posture & Grooming</p>
    `;

    document.getElementById("lookmaxing-output").innerHTML = suggestions;
}
