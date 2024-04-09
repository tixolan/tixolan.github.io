const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
let darkMode = localStorage.getItem("darkMode");

if(darkMode == null) {
    darkMode = darkModeMediaQuery.matches;
} else {
    darkMode = darkMode === "true";
}

let darkIcon = document.getElementById("darkIcon");
let lightIcon = document.getElementById("lightIcon");

let toggle = document.getElementById("dark-mode");

if(darkMode) {
    toggle.checked = true;
}

function updateDarkMode() {
    if (darkMode) {
        document.documentElement.style.setProperty("--bg-color", "#141414");
        document.documentElement.style.setProperty("--window-bg-color", "#222");
        document.documentElement.style.setProperty("--border-color", "#3b3b3b");
        document.documentElement.style.setProperty("--text-color", "#fff");
        darkIcon.style.display = "none";
        lightIcon.style.display = "inline";
        localStorage.setItem("darkMode", "true");
    } else {
        document.documentElement.style.setProperty("--bg-color", "#e9e6e2");
        document.documentElement.style.setProperty("--window-bg-color", "#f9f6f2");
        document.documentElement.style.setProperty("--border-color", "#bfbfbf");
        document.documentElement.style.setProperty("--text-color", "#000");
        lightIcon.style.display = "none";
        darkIcon.style.display = "inline";
        localStorage.setItem("darkMode", "false");
    }
}

function toggleDarkMode() { 
    darkMode = !darkMode;

    updateDarkMode();
}

toggle.addEventListener("click", (e)=> {
    toggleDarkMode()
});

updateDarkMode();