moment.locale("is");
const search = document.getElementById("search");
const conList = document.getElementById("list");
const searchBar = document.getElementById("searchBar");
const dates = document.getElementById("dateSearch");

const concerts = [];

flatpickr(dates,{
    mode: "range",
    onChange: searchCons
});

async function getConcerts() {
    const response = await fetch("https://apis.is/concerts");//Nær í gögn frá apis
    const data = await response.json();
    let rowCount = Math.ceil(data.results.length / 3);//Reiknar hversu margar raðir þurfa að vera í grid
    conList.style = `display:grid; grid-template-rows: repeat(${rowCount}, 1fr);`;//Setur inn hversu margar raðir þurfa að vera í gridinu
    for (let i = 0; i < data.results.length; i++) {//Fer í gegnum gögnin og setur upp HTML element og framsetningu
        const con = document.createElement("div");//div fyrir eitt stak
        con.classList.add("con");

        const conImg = document.createElement("img");
        conImg.src = data.results[i].imageSource;//Setur inn mynd
        conImg.classList.add("conImg");

        const labels = document.createElement("div");
        labels.classList.add("labels");

        const title = document.createElement("h4");
        title.textContent = data.results[i].eventDateName;

        const date = document.createElement("p");
        date.textContent = moment(data.results[i].dateOfShow).format("ll").substr(0,7).toUpperCase();//Setur inn dagsetningu á íslensku

        const link = document.createElement("a");//Link sem er bara þarna
        link.href = "#index.html";
        link.textContent = "SEE MORE";

        labels.append(title,date,link);
        con.append(conImg,labels);
        labels.addEventListener("mouseover", function() { conImg.style="filter: brightness(30%);"}, false);
        conImg.addEventListener("mouseout",function() { conImg.style="filter: brightness(100%)"}, false);
        conImg.addEventListener("mouseover",function() { conImg.style="filter: brightness(30%)"}, false);
        conList.append(con);
        concerts.push({"element":con,"concert":data.results[i]});//Listi af tónleikum með element saman til að geta leitað í gegn eftir einhverjum skilyrðum
    }
}
getConcerts();
console.log(concerts);

function getSort() {
    const searchOptions = document.getElementById("searchBy");
    const radioList = searchOptions.getElementsByTagName("input");

    for (let i = 0; i < radioList.length; i++) {//tékkar hvaða radio takki er kveiktur og skilar honum
        if (radioList[i].checked) {
            return radioList[i].value;
        }
    }
}

function searchCons() {
    let dateList = dates.value.split(" to ");//Splittar inputtinu frá flatpickr calendar sem skilar "dagsetning to dagsetning"
    let dateFrom = "";
    let dateTo = "";
    if (dateList.length >= 1) {
        dateFrom = dateList[0] + " 00:00:00";

    }
    if (dateList.length == 2) {
        dateTo = dateList[1] + " 23:59:59";
    }


    if (getSort() == "eventName") {//Tékkar hvaða search option er settur upp og leitar eftir honum
        concerts.forEach(function(con) {
            if (!con.concert.eventDateName.toLowerCase().includes(searchBar.value.toLowerCase())) {
                if (searchBar.value.replace(/\s/g,"").length > 0) {//Ef search er ekki bara whitespace og það passar ekki þá fær það display: none
                    con.element.style = "display: none";
                }
            }
            else {
                if (dateFrom.length == 0 && dateTo.length == 0) {//Ef það er engin date sett og textinn passar þá sýnir það tónleikana
                    con.element.style = "display: inline-block";
                }
                else {//Þetta fer í gegnum date ef eitthvað date er sett upp
                    if (dateFrom.length > 0 && dateTo.length > 0 && !(moment(con.concert.dateOfShow) >= moment(dateFrom) && moment(con.concert.dateOfShow) <= moment(dateTo))) {
                        con.element.style = "display: none";
                    }
                    else if (dateFrom.length > 0 && moment(con.concert.dateOfShow) < moment(dateFrom)) {
                        con.element.style = "display: none";
                    }
                    else if (dateTo.length > 0 && moment(con.concert.dateOfShow) > moment(dateTo)) {
                        con.element.style = "display: none";
                    }
                    else {//Ef þetta passar sýnir það tónleikana
                        con.element.style = "display: inline-block";
                    }
                }
            }
        }
        )
    }//Fyrir neðan er bara sama nema með öðruvísi search option
    else if (getSort() == "eventHall") {
        concerts.forEach(function(con) {
            if (!con.concert.eventHallName.toLowerCase().includes(searchBar.value.toLowerCase())) {
                if (searchBar.value.replace(/\s/g,"").length > 0) {
                    con.element.style = "display: none";
                }
            }
            else {
                if (dateFrom.length == 0 && dateTo.length == 0) {
                    con.element.style = "display: inline-block";
                }
                else {
                    if (dateFrom.length > 0 && dateTo.length > 0 && !(moment(con.concert.dateOfShow) >= moment(dateFrom) && moment(con.concert.dateOfShow) <= moment(dateTo))) {
                        con.element.style = "display: none";
                    }
                    else if (dateFrom.length > 0 && moment(con.concert.dateOfShow) < moment(dateFrom)) {
                        con.element.style = "display: none";
                    }
                    else if (dateTo.length > 0 && moment(con.concert.dateOfShow) > moment(dateTo)) {
                        con.element.style = "display: none";
                    }
                    else {
                        con.element.style = "display: inline-block";
                    }
                }
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
                if (dateFrom.length == 0 && dateTo.length == 0) {
                    con.element.style = "display: inline-block";
                }
                else {
                    if (dateFrom.length > 0 && dateTo.length > 0 && !(moment(con.concert.dateOfShow) >= moment(dateFrom) && moment(con.concert.dateOfShow) <= moment(dateTo))) {
                        con.element.style = "display: none";
                    }
                    else if (dateFrom.length > 0 && moment(con.concert.dateOfShow) < moment(dateFrom)) {
                        con.element.style = "display: none";
                    }
                    else if (dateTo.length > 0 && moment(con.concert.dateOfShow) > moment(dateTo)) {
                        con.element.style = "display: none";
                    }
                    else {
                        con.element.style = "display: inline-block";
                    }
                }
            }
        }
        )
    }
}
//Event listenerar til að vita hvort input updatear
searchBar.addEventListener("input",searchCons);