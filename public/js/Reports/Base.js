var weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
var rojo = 'rgb(255, 80, 72)';
var amarillo = 'rgb(255, 161, 46)';
var verde = 'rgb(56, 226, 148)';
var borderWidth = 2;

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: weeks,
        datasets: [{
                label: "P3",
                borderColor: rojo,
                backgroundColor: rojo,
                data: data[0],
                fill: false,
                borderWidth: borderWidth,
            },
            {
                label: "P15",
                borderColor: amarillo,
                backgroundColor: amarillo,
                data: data[1],
                fill: false,
                borderWidth: borderWidth,
            },
            {
                label: "P50",
                borderColor: verde,
                backgroundColor: verde,
                data: data[2],
                fill: false,
                borderWidth: borderWidth,
            },
            {
                label: "P85",
                borderColor: amarillo,
                backgroundColor: amarillo,
                data: data[3],
                fill: false,
                borderWidth: borderWidth,
            },
            {
                label: "P97",
                borderColor: rojo,
                backgroundColor: rojo,
                data: data[4],
                fill: false,
                borderWidth: borderWidth,
            }
        ]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: yLabel
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Edad (semanas)'
                }
            }]
        },
        title: {
            display: true,
            text: title
        }

    }
});