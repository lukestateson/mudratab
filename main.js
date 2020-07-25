var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var days3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function cl(d) {
	return console.log(d);
}

function makenight(change) {
	var night = localStorage.getItem("night");
	if(night == null) {
		night = 0;
	}
	if(night == 1) {
		// Night
		if(change === true) {
			localStorage.setItem("night", 0);
			document.getElementsByTagName("body")[0].classList.remove("night");
		} else {
			document.getElementsByTagName("body")[0].classList.add("night");
		}
	} else {
		// Day
		if(change === true) {
			localStorage.setItem("night", 1);
			document.getElementsByTagName("body")[0].classList.add("night");
		} else {
			document.getElementsByTagName("body")[0].classList.remove("night");
		}
	}
}

makenight(false);

var hideauthor = localStorage.getItem("hideauthor");
if(hideauthor == null) {
	document.getElementsByTagName("body")[0].classList.add("showauthor");
}

function add_zero(data) {
	if(data < 10) {
		data = '0' + data;
	}
	return data;
}

function isEven(n) {
	return n % 2 == 0;
}

function hours12(data) {
	return (data + 24) % 12 || 12;
}

function cal_info(month, year) {
	var d1 = new Date(year, month, 0);
	return { days: d1.getDate(), firstday: d1.getDay() + 1 };
}


function get_date() {
	var d = new Date();

	var minutes = add_zero(d.getMinutes());
	var hours = hours12(d.getHours());
	var monthraw = d.getMonth();
	var month = months[monthraw];
	var weekday = days[d.getDay()];
	var day = d.getDate();
	var year = d.getFullYear();
	var seconds = d.getSeconds();
	var sep = '<span>:</span>';

	var calinfo = cal_info(monthraw, year);

	var cal = '';

	for (var i = 0; i < calinfo.firstday; i++) {
		cal = cal + `<div></div>`;
	}

	for (var i = 1; i < calinfo.days + 1; i++) {
		if(i == day) {
			cal = cal + `<div class='curr'>${i}</div>`;
		} else {
			cal = cal + `<div>${i}</div>`;
		}
	}
	//document.getElementsByClassName("calendar")[0].innerHTML = `${cal}`;

	var calhead = '';
	for (var i = 0; i < days3.length; i++) {
		calhead = calhead + `<div>${days3[i]}</div>`;
	}
	document.getElementsByClassName("calhead")[0].innerHTML = `${calhead}`;

	document.getElementById("line1").innerHTML = `${hours}${sep}${minutes}`;
	document.getElementById("line2").innerHTML = `${weekday}, ${day} ${month} ${year}`;
}

document.addEventListener("DOMContentLoaded", function() {
	get_date();
	var it = setInterval(function() {
		get_date();
	}, 1000);
	document.getElementsByClassName("switchnight")[0].addEventListener("click", function() {
		makenight(true);
	});
	document.getElementsByClassName("authorbutton")[0].addEventListener("click", function() {
		localStorage.setItem("hideauthor", 1);
		document.getElementsByTagName("body")[0].classList.remove("showauthor");
	});
});
