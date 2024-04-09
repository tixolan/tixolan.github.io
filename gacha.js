let animation_interval = null;
let auto_interval = null;

let element = document.getElementById("gacha-result");
let button = document.getElementById("gacha-button");
let auto_toggle = document.getElementById("auto-pull-toggle");



const rarities = {
    Transcendental: {
        weight: 0.0005,
        color: "#00C3FF"
    },
    Mythic: {
        weight: 0.01,
        color: "#B4009E"
    },
    Legendary: {
        weight: 0.1,
        color: "#C19C00"
    },
    Epic: {
        weight: 1,
        color: "#881798"
    },
    Rare: {
        weight: 10,
        color: "#3A96DD"
    },
    Uncommon: {
        weight: 40,
        color: "#13A10E"
    },
    Common: {
        weight: 70,
        color: "#767676"
    }
}

let pull_history = document.getElementById("pull-history");
let gacha_history = localStorage.getItem("gacha-history");

if(gacha_history == null) {
    gacha_history = [];
} else {
    gacha_history = gacha_history.split(",")
}

function addPullToHistory(item) {
    const para = document.createElement("span");
    para.appendChild(document.createTextNode(item));
    para.style.color = rarities[item]["color"];
    pull_history.prepend(para);
}

for(i in gacha_history) {
    addPullToHistory(gacha_history[i]);
}

function generateRanges(spec) {
    var obj = {};
    var i = 0;
    Object.keys(rarities).forEach((k) => {
        let value = rarities[k]["weight"] * 10000;
        obj[k] = [i, value];
        i += value;
    });
    i+=1;

    return function() {
        let value = Math.floor(Math.random() * i);
        for(r in obj) {
            if(value >= obj[r][0] && value < obj[r][1]) {
                return r;
            }
        }
        return "Common";
    }
}

var pull = generateRanges(rarities)

function createRandomString(length) {
    const chars = ' #$%&?@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    return result;
}

function animation() {
    let iteration = 0;
    element.style.color = getComputedStyle(element).getPropertyValue("--text-color");
    
    clearInterval(animation_interval);
    
    animation_interval = setInterval(() => {
        element.innerText = createRandomString(Math.floor(Math.random() * 10 + 5))
        
        iteration += 1;

        if(iteration == 20) {
            clearInterval(animation_interval);
            let result = pull();
            gacha_history.push(result);
            if(gacha_history.length > 100) {
                gacha_history.shift();
            }
            localStorage.setItem("gacha-history", gacha_history.toString());
            addPullToHistory(result);
            element.innerText = result;
            element.style.color = rarities[result]["color"];
            setTimeout(() => {
                if(!auto_toggle.checked) {
                    button.removeAttribute("disabled");
                }
            }, 500);
        }
    }, 30);
}

button.addEventListener("click", (event) => { event.target.setAttribute("disabled", "true"); animation(); });

auto_toggle.addEventListener("click", (event) => {
    if(event.target.checked) {
        button.setAttribute("disabled", "");
        animation();
        auto_interval = setInterval(() => {
            animation();
        }, 1000);
    } else {
        clearInterval(auto_interval);
        button.removeAttribute("disabled");
    }
});