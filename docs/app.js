
const search = document.getElementById("search");
const conList = document.getElementById("list");
const searchBar = document.getElementById("searchBar");

const concerts = [];
const rows = [];

async function getConcerts() {
    const response = await fetch("https://apis.is/concerts");
    const data = await response.json();
    let rowCount = Math.ceil(data.results.length / 3);
    conList.style = `display:grid; grid-template-rows: repeat(${rowCount}, 1fr);`;
    for (let i = 0; i < data.results.length; i++) {
        const con = document.createElement("div");
        con.classList.add("con");

        const conImg = document.createElement("img");
        conImg.src = data.results[i].imageSource;

        const labels = document.createElement("div");
        labels.classList.add("labels");

        const title = document.createElement("h4");
        title.textContent = data.results[i].eventDateName;

        const date = document.createElement("p");
        date.textContent = data.results[i].dateOfShow;

        const link = document.createElement("a");
        link.href = "index.html";
        link.textContent = "SEE MORE";

        labels.append(title,date,link);
        con.append(conImg,labels);
        conImg.addEventListener("mouseover", function() {labels.style="visibility: visible;"; conImg.style="filter: brightness(30%);"}, false);
        conImg.addEventListener("mouseout", function() {labels.style="visibility: hidden;"; conImg.style="filter: brightness(100%);"}, false);
        labels.addEventListener("mouseover", function() {labels.style="visibility: visible;"; conImg.style="filter: brightness(30%);"}, false);
        labels.addEventListener("mouseout", function() {labels.style="visibility: hidden;"; conImg.style="filter: brightness(100%);"}, false);
        conList.append(con);
        concerts.push({"element":con,"concert":data.results[i]});
    }
}
getConcerts();
console.log(concerts);

function getSort() {
    const searchOptions = document.getElementById("searchBy");
    const radioList = searchOptions.getElementsByTagName("input");

    for (let i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
            return radioList[i].value;
        }
    }
}

console.log(getSort());

function searchCons() {
    if (getSort() == "eventName") {
        concerts.forEach(function(con) {
            if (!con.concert.eventDateName.toLowerCase().includes(searchBar.value.toLowerCase())) {
                if (searchBar.value.replace(/\s/g,"").length > 0) {
                    con.element.style = "display: none";
                }
            }
            else {
                con.element.style = "display: inline-block";
            }
        }
        )
    }
    else if (getSort() == "eventHall") {
        concerts.forEach(function(con) {
            if (!con.concert.eventHallName.toLowerCase().includes(searchBar.value.toLowerCase())) {
                if (searchBar.value.replace(/\s/g,"").length > 0) {
                    con.element.style = "display: none";
                }
            }
            else {
                con.element.style = "display: inline-block";
            }
        }
        )
    }
    else if (getSort() == "organizer") {
        concerts.forEach(function(con) {
            if (!con.concert.userGroupName.toLowerCase().includes(searchBar.value.toLowerCase())) {
                if (searchBar.value.replace(/\s/g,"").length > 0) {
                    con.element.style = "display: none";
                }
            }
            else {
                con.element.style = "display: inline-block";
            }
        }
        )
    }
}

searchBar.addEventListener("input",searchCons);