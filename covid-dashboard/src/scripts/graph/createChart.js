import Chart from 'chart.js';

export default function createChart(canvasNode, dataArray, dateArray, color, magnitude, chartType) {
  return new Chart(canvasNode, {
    type: chartType,

    data: {
      labels: dataArray,
      datasets: [{
        label: '',
        barPercentage: 1,
        backgroundColor: color,
        data: dataArray
      }]
    },

    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 11,
            fontSize: 14,
            callback: function xTips() {
              return null;
            }
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            fontSize: 12,
            callback: function xTips(value) {
              if (magnitude === 'per 100K') {
                return Math.round(value * 1000) / 1000;
              }
              return (Number.parseFloat(value)) / 1000 + 'k';
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem) {
            return dateArray[tooltipItem[0].index];
          },
          label: function label(tooltipItem) {
            if (magnitude === 'per 100K') {
              return Math.round(tooltipItem.value * 1000) / 1000;
            }
            return (Number.parseFloat(tooltipItem.value)) / 1000 + 'k';
          }
        },
        backgroundColor: '#343a40',
        titleFontColor: 'rgba(255, 255, 255)',
        displayColors: false,
        borderColor: color,
        borderWidth: 2
      }
    }
  });
}
