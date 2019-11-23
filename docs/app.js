
const header = document.getElementById("search");
const conList = document.getElementById("list");


async function getConcerts() {
    const response = await fetch("http://apis.is/concerts");
    const data = await response.json();
    let rowCount = Math.ceil(data.results.length / 3);
    let counter = 0;
    for (let i = 0; i < rowCount; i++) {
        const row = document.createElement("div");
        row.classList.add("conRow");

        for (let i = 0; i < 3; i++) {
            if (counter < data.results.length) {
                const con = document.createElement("div");
                con.classList.add("con");

                const conImg = document.createElement("img");
                conImg.src = data.results[counter].imageSource;

                const labels = document.createElement("div");
                labels.classList.add("labels");

                const title = document.createElement("h4");
                title.textContent = data.results[counter].eventDateName;

                const date = document.createElement("p");
                date.textContent = data.results[counter].dateOfShow;

                const link = document.createElement("a");
                link.href = "index.html";
                link.textContent = "SEE MORE";

                labels.append(title,date,link);
                con.append(conImg,labels);
                con.addEventListener("mouseenter", function() {labels.style="visibility: visible;"; conImg.style="filter: brightness(30%);"}, false);
                con.addEventListener("mouseleave", function() {labels.style="visibility: hidden;"; conImg.style="filter: brightness(100%);"}, false);
                row.append(con);
            } 
            else {
                const con = document.createElement("div");
                row.append(con);
            }
            counter++;
        }
        conList.append(row);
    }
}

getConcerts();
