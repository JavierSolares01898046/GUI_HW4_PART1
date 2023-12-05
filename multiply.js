// <!--
// File: multiply.js
// GUI Assignment: Creating an Interactive Dynamic Table
// Javier Solares, UMass Lowell Computer Science, Javier_Solares@student.uml.edu
// Copyright (c) 2023 by Javier. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by JS on December, 2023 at 11:38 PM
// Description: This is the javascript code for the Dynamic Multiplication Table.
// I create a dynamic table and its elements inside to append to my div. I also
// added the jquery validation and its conditions to validate the form.
// -->

$(document).ready(function () {
    $("#row_column_form").validate({
        rules: {
            numMinColumn: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanMaxColumn: true
            },
            numMaxColumn: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            numMinRow: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanMaxRow: true
            },
            numMaxRow: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            numMinColumn: {
                required: "Please enter a value for Minimum Column.",
                range: "Please enter a value between -50 and 50 for Minimum Column.",
                lessThanMaxColumn: "Minimum column must be less than or equal to maximum column."
            },
            numMaxColumn: {
                required: "Please enter a value for Maximum Column.",
                range: "Please enter a value between -50 and 50 for Maximum Column."
            },
            numMinRow: {
                required: "Please enter a value for Minimum Row.",
                range: "Please enter a value between -50 and 50 for Minimum Row.",
                lessThanMaxRow: "Minimum row must be less than or equal to maximum row."
            },
            numMaxRow: {
                required: "Please enter a value for Maximum Row.",
                range: "Please enter a value between -50 and 50 for Maximum Row."
            }
        }
    });
});


function createMultTable(event) {  
    if (!$("#row_column_form").valid()) {
        return;
    }

     // creating and styling the dynamic table
    let tableDiv = document.getElementById('dynamic-table');
    tableDiv.classList.add('table', 'table-bordered', 'border-primary');

    // clear the existing table
    tableDiv.innerHTML = '';

    // prevents the page from refreshing
    event.preventDefault();

    // variable to create the table body
    var tbody = document.createElement('tbody');

    // variable to keep of track of the numbers in the top of the header and update it
    var topHeaderCounter = document.getElementById('numMinColumn').value;

    // variable to keep of track of the numbers in the left of the header and update it
    var leftHeaderCounter = document.getElementById('numMinRow').value;

    // getting the number of columns needed (max - min = # of rows)
    var num_cols = document.getElementById('numMaxColumn').value - document.getElementById('numMinColumn').value + 1;

    // getting the number of rows needed (max - min = # of rows)
    var num_rows = document.getElementById('numMaxRow').value - document.getElementById('numMinRow').value + 1;

    for (var i = 0; i <= num_rows; i++) {
        var rows = document.createElement('tr');

        for (var j = 0; j <= num_cols; j++) {
            // creating cells
            if (i === 0 && j === 0) {       // this is for the top-left of the header
                var topLeftHeader = document.createElement('th');
                topLeftHeader.textContent = 'x';
                rows.appendChild(topLeftHeader)
            } else if (i === 0) {       // this is for the top row of numbers
                var topHeader = document.createElement('th');
                topHeader.textContent = topHeaderCounter;
                topHeaderCounter++;
                rows.appendChild(topHeader);
            } else if (j === 0) {       // this is for the left-most column of numbers
                var leftHeader = document.createElement('th');
                leftHeader.textContent = leftHeaderCounter;
                leftHeaderCounter++;
                rows.appendChild(leftHeader);
            } else {                    // this is for the table data when the left and top numbers multiply
                var multiply = document.createElement('td');
                multiply.textContent = topHeaderCounter * (leftHeaderCounter - 1);
                topHeaderCounter++;
                rows.appendChild(multiply);
            }
        }
        topHeaderCounter = document.getElementById('numMinColumn').value;
        tbody.appendChild(rows)
    }
    tableDiv.appendChild(tbody);

    div.append(tableDiv);

    document.body.appendChild(div);
}


// This function is to check if the minimum value for column is less than or equal to their maximum counterpart
$.validator.addMethod("lessThanMaxColumn", function (value) {
    return parseInt(value) <= parseInt($("#numMaxColumn").val());
});

// This function is to check if the minimum value for row is less than or equal to its maximum counterpart
$.validator.addMethod("lessThanMaxRow", function (value) {
    return parseInt(value) <= parseInt($("#numMaxRow").val());
});
