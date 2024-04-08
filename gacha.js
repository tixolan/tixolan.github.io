let animation_interval = null;
let auto_interval = null;

let element = document.getElementById("gacha-result");
let button = document.getElementById("gacha-button");
let toggle = document.getElementById("auto-pull-toggle");

const rarities = {
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

function generateTable(spec) {
    var i, j, table=[];
    for (i in spec) {
        for (j=0; j < spec[i]["weight"]*100; j++) {
            table.push(i);
        }
    }

    return function() {
        return table[Math.floor(Math.random() * table.length)];
    }
}

var pull = generateTable(rarities)

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
    element.style.color = "black";
    
    clearInterval(animation_interval);
    
    animation_interval = setInterval(() => {
        element.innerText = createRandomString(Math.floor(Math.random() * 10 + 5))
        
        iteration += 1;

        if(iteration == 20) {
            clearInterval(animation_interval);
            let result = pull();
            element.innerText = result;
            element.style.color = rarities[result]["color"];
            setTimeout(() => {
                if(!toggle.checked) {
                    button.removeAttribute("disabled");
                }
            }, 500);
        }
    }, 30);
}

button.addEventListener("click", (event) => { event.target.setAttribute("disabled", "true"); animation(); });
toggle.addEventListener("click", (event) => {
    if(event.target.checked) {
        button.setAttribute("disabled", "");
        auto_interval = setInterval(() => {
            animation();
        }, 1000);
    } else {
        clearInterval(auto_interval);
        button.removeAttribute("disabled");
    }
});