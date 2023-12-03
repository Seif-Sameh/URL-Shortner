let menu = document.querySelector(".menu");
let list = document.querySelector(".list")

menu.addEventListener("click", () => {
    let displaystyle = getComputedStyle(list);
    if (displaystyle.display === "none") {
        list.style.cssText = "display: flex;";
    }
    else if (displaystyle.display === "flex") {
        list.style.cssText = "display: none;";
    }
})

let input = document.querySelector(".link");
let shorten = document.querySelector(".shorten");
let emptyMsg = document.querySelector(".empty");

shorten.addEventListener("click", () => {
    let link = input.value;
    if (link === "") {
        input.style.cssText = "border: 1px solid hsl(0, 87%, 67%);";
        input.classList.add("invalid-input");
        emptyMsg.style.cssText = "display: block;";
    }
    else {
        input.style.cssText = "border: none;";
        input.classList.remove("invalid-input");
        emptyMsg.style.cssText = "display: none;";
        shortenFunc(link);
    }
})


function shortenFunc(url) {
    fetch(`https://is.gd/create.php?format=json&url=${url}`).then((result) => {
        let res = result.json();
        return res;
    }
    ).then((res) => {
        return res['shorturl'];
    }
    ).then((res) => {
        renderUrl(res)
    })
}

function renderUrl(url) {
    let container = document.createElement("div");
    let leftpart = document.createElement("div");
    leftpart.classList.add("leftpart");

    let longlink = document.createElement("span");
    let longlinkText = document.createTextNode(`${input.value.slice(0, 35) + (input.value.length > 30 ? "..." : "")}`);
    longlink.appendChild(longlinkText);
    container.appendChild(longlink);


    let shortlink = document.createElement("span");
    let shortlinkText = document.createTextNode(`${url}`);
    shortlink.id = "short-link";
    shortlink.appendChild(shortlinkText);
    leftpart.appendChild(shortlink)

    let copyBtn = document.createElement("div");
    copyBtn.classList.add("btn", "copyBtn");
    let copyBtnSpan = document.createElement("span")
    let copyBtnText = document.createTextNode("Copy");
    copyBtnSpan.appendChild(copyBtnText);
    copyBtn.appendChild(copyBtnSpan);
    leftpart.appendChild(copyBtn)

    copyBtn.addEventListener("click", () => {
        copyBtn.style.cssText = "background-color: hsl(257, 27%, 26%);"
        copyBtn.querySelector("span").innerText = "Copied!"
        navigator.clipboard.writeText(url);
    })

    container.appendChild(leftpart);
    container.classList.add("container", "result")
    document.querySelector(".url").appendChild(container);
    let padding = getComputedStyle(document.querySelector(".adv")).paddingTop;
    console.log(padding)
    document.querySelector(".adv").style.cssText = `padding-top: ${padding + 50}px;`;
}


