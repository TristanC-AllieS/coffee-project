"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee col s4"><div class="card"><div class="card-content">';
    html += '<span class="card-title">' + coffee.name + '</span>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div></div></div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    // e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        var regex = new RegExp(`^${searchBar.value}.*$`, 'gim');
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
    coffees.push({id: coffees.length + 1, name: name, roast: roast});
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

$(document).ready(function() {
    $('.modal').modal();
    $('select').material_select();
    $('#roast-selection').on('change', function (e) {
        updateCoffees(e);
    });
});

var tbody = document.querySelector('#coffees');
var searchBar = document.querySelector("#search");
var roastSelection = document.querySelector('#roast-selection');
var modal = document.querySelector('#add-modal');
var modalName = document.querySelector('#modal-name');
var modalRoastSelection = document.querySelector('#modal-roast-selection');
var addCoffeeButton = document.querySelector('#add-coffee-btn');

tbody.innerHTML = renderCoffees(coffees);

searchBar.addEventListener('input', function (e) {
    updateCoffees(e);
});

addCoffeeButton.addEventListener('click', function (e) {
    addCoffee(modalName.value, modalRoastSelection.value);
    updateCoffees(e);
    $('#add-modal').modal('close');
});