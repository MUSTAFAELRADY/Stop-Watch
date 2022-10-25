let secs = 00;
let mins = 00;
let hours = 00;
let mills = 00;
window.onload = function beginer() {
  sec.innerHTML = "00";
  min.innerHTML = "00";
  hour.innerHTML = "00";
  mill.innerHTML = "00";
};

let interval;
let datasave;
if (localStorage.product != null) {
  datasave = JSON.parse(localStorage.product);
} else {
  datasave = [];
}
console.log(datasave);
start.onclick = function () {
  clearInterval(interval);
  interval = setInterval(starter, 10);
};
pause.onclick = function () {
  clearInterval(interval);
};
end.onclick = function () {
  clearInterval(interval);
  start.style.pointerEvents = "none";
};
restart.onclick = function () {
  clearInterval(interval);
  secs = "00";
  mins = "00";
  hours = "00";
  mills = "00";
  sec.innerHTML = secs;
  min.innerHTML = mins;
  hour.innerHTML = hours;
  mill.innerHTML = mills;
  start.style.pointerEvents = "auto";
};

save.onclick = function () {
  let newsave = {
    milles: sec.innerHTML,
    second: min.innerHTML,
    minute: hour.innerHTML,
    houres: mill.innerHTML,
  };
  datasave.push(newsave);
  localStorage.setItem("product", JSON.stringify(datasave));
  clearInterval(interval);

  secs = "00";
  mins = "00";
  hours = "00";
  mills = "00";
  sec.innerHTML = secs;
  min.innerHTML = mins;
  hour.innerHTML = hours;
  mill.innerHTML = mills;
  start.style.pointerEvents = "auto";
  showdata();
};

function starter() {
  secs++;
  if (secs <= 9) {
    sec.innerHTML = "0" + secs;
  }
  if (secs > 9) {
    sec.innerHTML = secs;
  }
  if (secs > 99) {
    // console.log("seconds");
    mins++;
    min.innerHTML = "0" + mins;
    secs = 0;
    sec.innerHTML = "0" + 0;
  }
  if (mins > 9) {
    min.innerHTML = mins;
  }
  if (mins > 59) {
    hours++;
    hour.innerHTML = "0" + hours;
    mins = 0;
    min.innerHTML = "0" + 0;
  }
  if (hours > 59) {
    mills++;
    mill.innerHTML = "0" + mills;
    hours = 0;
    hour.innerHTML = "0" + 0;
  }
  if (mills > 23) {
    clearInterval(interval);
  }
}
function cleardata() {
  sec.innerHTML = ``;
  min.innerHTML = ``;
  hour.innerHTML = ``;
  mill.innerHTML = ``;
}

function showdata() {
  let table = ``;
  for (let i = 0; i < datasave.length; i++) {
    table += `
        <div id="conview">
        <div id="index">${i + 1}</div>
        <div id="saved">${datasave[i].houres} _ ${datasave[i].minute} _ ${
      datasave[i].second
    } _ ${datasave[i].milles}</div>
        <div onclick="deletedata(${i})" id="delete">delete</div>
        </div>

        `;
  }
  document.getElementById(`view`).innerHTML = table;
  let btndelete = document.getElementById(`deleteall`);
  if (datasave.length > 1) {
    btndelete.innerHTML = `
        <div onclick ="deleteall()">delete All (${datasave.length}) </div>
        `;
  } else {
    btndelete.innerHTML = ``;
  }
}
showdata();

function deletedata(i) {
  datasave.splice(i, 1);
  localStorage.product = JSON.stringify(datasave);
  showdata();
}

function deleteall() {
  localStorage.clear();
  datasave.splice(0);
  showdata();
}
