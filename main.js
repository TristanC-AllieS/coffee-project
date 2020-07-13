"use strict"

var localCoffees;

var tbody = document.querySelector('#coffees');
var searchBar = document.querySelector("#search");
var roastSelection = document.querySelector('#roast-selection');
var modal = document.querySelector('#add-modal');
var modalName = document.querySelector('#modal-name');
var modalRoastSelection = document.querySelector('#modal-roast-selection');
var addCoffeeButton = document.querySelector('#add-coffee-btn');

function renderCoffee(coffee) {

    var html = '<div class="coffee col s4"><div class="card hoverable scale-transition scale-out"><div class="card-content">';

    html += '<span class="card-title">' + coffee.name;

    switch (coffee.roast){
        case "light":
            html += '<i class="tooltipped fa fa-rebel"></i>';
            break;
        case "medium":
            html += '<i class="tooltipped fa fa-first-order"></i>';
            break;
        case "dark":
            html += '<i class="tooltipped fa fa-empire"></i>';
            break;
    }

    html += '</span></div>';
    html += '<div class="card-action center-align"><a href="#!" class="btn-flat waves-effect">Buy Now</a></div>'
    html += '</div></div>';

    return html;
}

function renderCoffees(coffees) {

    var html = '';

    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }

    setTimeout(function () {
        $('.card').removeClass('scale-out');
        $('.tooltipped.fa-rebel').tooltip({delay: 30, tooltip: "Light Roast", position: "top"});
        $('.tooltipped.fa-first-order').tooltip({delay: 30, tooltip: "Medium Roast", position: "top"});
        $('.tooltipped.fa-empire').tooltip({delay: 30, tooltip: "Dark Roast", position:"top"});
    }, 30);

    return html;
}

function updateCoffees(e) {

    if (e) e.preventDefault(); // don't submit the form, we just want to update the data

    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];

    coffees.forEach(function(coffee) {

        var regex = new RegExp(`${searchBar.value}`, 'gi');

        if (selectedRoast != "") {
            if (regex.test(coffee.name) && coffee.roast === selectedRoast)
                filteredCoffees.push(coffee);
        } else {
            if (regex.test(coffee.name))
                filteredCoffees.push(coffee);
        }
    });

    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function addCoffee(name, roast) {
    if( modalName.checkValidity() )
        coffees.push({id: coffees.length + 1, name: name, roast: roast});
}

var coffees = [
    {id: 1, name: 'Skywalker Sunrise', roast: 'light'},
    {id: 2, name: 'Yoda\'s Force Blend', roast: 'light'},
    {id: 3, name: 'Jedi Brew', roast: 'light'},
    {id: 4, name: 'Kylo Joe', roast: 'medium'},
    {id: 5, name: 'Snoke\'s Breakfast Blend', roast: 'medium'},
    {id: 6, name: 'TR-8Roast', roast: 'medium'},
    {id: 7, name: 'Java the Hutt', roast: 'dark'},
    {id: 8, name: 'Palpatine\'s Electric Blend', roast: 'dark'},
    {id: 9, name: 'Lord Vader\'s Espresso', roast: 'dark'},
];

$(document).ready(function() {

    localCoffees = localStorage.getItem("custom-coffees");

    if (localCoffees !== null) {
        coffees = JSON.parse(localCoffees);
        updateCoffees();
    }

    $('.modal').modal();
    $('select').material_select();
    $('#roast-selection').on('change', function (e) {
        updateCoffees(e);
    });
});

tbody.innerHTML = renderCoffees(coffees);

searchBar.addEventListener('input', function (e) {
    updateCoffees(e);
});

addCoffeeButton.addEventListener('click', function (e) {
    if (!$("#modal-name").hasClass("invalid")) {
        addCoffee(modalName.value, modalRoastSelection.value);
        updateCoffees(e);
        localStorage.setItem("custom-coffees", JSON.stringify(coffees));
        $('#add-modal').modal('close');
    } else {
        Materialize.toast("Please Enter A Valid Coffee Name", 2000);
    }
});

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 220) {
        localStorage.removeItem("custom-coffees");
        console.log("localStorage cleared");
    }
};
