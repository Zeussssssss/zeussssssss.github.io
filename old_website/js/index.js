//The bouncy dot animation
function animateStartScreen() {
    [...document.getElementsByTagName("section")].forEach((element) => {
        element.style.visibility = "hidden";
    });
    document.getElementById("intro-sect").style.visibility = "visible";
    [...document.getElementsByClassName("character")].forEach((element) => {
        element.style.fill = "black";
    });
    [...document.getElementsByClassName("bouncy")].forEach((element) => {
        element.style.fill = "rgb(249, 252, 33)";
    });
    document.body.style.overflowY = "hidden";
    document.body.style.backgroundImage =
        "linear-gradient(to bottom right, black, black)";
    document.getElementById("skills").style.visibility = "hidden";
    document.getElementById("intro-sect").style.color = "black";
    const myTimeout = setTimeout(() => {
        document.body.style.overflowY = "scroll";
        document.body.style.backgroundImage =
            "linear-gradient(to bottom right, black, rgb(55, 55, 55))";
        document.getElementById("skills").style.visibility = "visible";
        [...document.getElementsByClassName("character")].forEach((element) => {
            element.style.fill = "white";
        });
        document.getElementById("intro-sect").style.color = "white";
        [...document.getElementsByClassName("bouncy")].forEach((element) => {
            element.style.fill = "rgb(249, 252, 33)";
        });
        [...document.getElementsByTagName("section")].forEach((element) => {
            element.style.visibility = "visible";
        });
    }, 3200);
}

/**CODE OUTSIDE OF FUNCTIONS HERE */

const skills = [
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "C",
    "C++",
    "PYTHON",
    "SASS",
    "MERN",
    "MySQL",
    "JAVA",
    "GIT",
    "DSA",
    "UNITY",
    "VERILOG",
    "AGILE",
    "SCRUM",
    "UNIX",
];

var requiredRadius =
    window.innerWidth < 480
        ? (45 * window.innerWidth) / 100
        : (20 * window.innerWidth) / 100;

//Skill section cloud
var skillCloud = TagCloud(".skill-sphere", skills, {
    radius: requiredRadius,
    maxSpeed: "medium",
    initSpeed: "medium",
    direction: 180,
    keep: true,
});

//Scroll Progress bar
const scrollProgress = document.getElementById("scroll-progress");
const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
    const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
    scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
    if (scrollTop / height > 0.95) {
        staggersAnimation.play();
    }
});

if (!sessionStorage.getItem("visited")) {
    window.onload = animateStartScreen();
    sessionStorage.setItem("visited", true);
}

window.onresize = function () {
    skillCloud.destroy();
    newRequiredRadius =
        window.innerWidth < 480
            ? (45 * window.innerWidth) / 100
            : (20 * window.innerWidth) / 100;
    skillCloud = TagCloud(".skill-sphere", skills, {
        radius: newRequiredRadius,
        maxSpeed: "medium",
        initSpeed: "medium",
        direction: 180,
        keep: true,
    });
};

//Anime js used for this staggered grid animation
//Thanks Julian Garnier for your help!
const staggerVisualizerEl = document.querySelector(".stagger-visualizer");
const fragment = document.createDocumentFragment();
const grid = [9, 9];
const col = grid[0];
const row = grid[1];
const numberOfElements = col * row;

for (let i = 0; i < numberOfElements; i++) {
    fragment.appendChild(document.createElement("div"));
}

staggerVisualizerEl.appendChild(fragment);

const staggersAnimation = anime
    .timeline({
        targets: ".stagger-visualizer div",
        easing: "easeInOutSine",
        delay: anime.stagger(60),
        loop: true,
        autoplay: false,
    })
    .add({
        translateX: [
            {
                value: anime.stagger("-.3vw", {
                    grid: grid,
                    from: "center",
                    axis: "x",
                }),
            },
            {
                value: anime.stagger(".3vw", {
                    grid: grid,
                    from: "center",
                    axis: "x",
                }),
            },
        ],
        translateY: [
            {
                value: anime.stagger("-.3vw", {
                    grid: grid,
                    from: "center",
                    axis: "y",
                }),
            },
            {
                value: anime.stagger(".3vw", {
                    grid: grid,
                    from: "center",
                    axis: "y",
                }),
            },
        ],
        duration: 1000,
        scale: 0.5,
        delay: anime.stagger(100, { grid: grid, from: "center" }),
    })
    .add({
        translateX: 0,
        translateY: 0,
        scale: 0.5,
        scaleX: 1,
        rotate: 180,
        duration: 1000,
        delay: anime.stagger(100, { grid: grid, from: "center" }),
    })
    .add({
        scaleY: 1,
        scale: 1,
        delay: anime.stagger(20, { grid: grid, from: "center" }),
    });
