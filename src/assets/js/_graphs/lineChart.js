/**
 * Created By: Sanjib Sonowal
 * Organization: rocery.in
 */

export function renderLineChart(id, metricName, rawdata, options) {
    var barChart = null;
    var ctx_barChart = null;
    ctx_barChart = $("#" + id);
    ctx_barChart.width = options.width;
    ctx_barChart.height = options.height;

    // Extract the data
    var labelColumn = "X-Axis", dataColumn = "Y-Axis";
    var ctx_labels, ctx_data = [];
    if (rawdata.length > 0) {
        var columnsIn = rawdata[0];//
        // Extract the labels column
        for (var key in columnsIn) {
            labelColumn = key;
            break
        }
        // Extract data column
        for (var key in columnsIn) {
            if (key != labelColumn) {
                dataColumn = key;
            }
        }
    }
    else {
        console.log("No data for metric " + metricName);
    }

    barChart = new Chart(ctx_barChart, {
        type: 'line',
        data: {
            labels: ctx_labels,
            data: ctx_data
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: labelColumn
                    },
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    },
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: dataColumn
                    },
                    stacked: true
                }],
            },
            legend: {
                display: true
            },
            title: {
                text: metricName,
                display: true
            }
        },
        error: function () { }
    });
}