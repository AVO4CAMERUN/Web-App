<template>
    <div id="" class="w-full h-full">{{nomeCorso}}</div>
    <!-- Da mettere charts.js https://www.chartjs.org/docs/latest/
const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

const labels = ['AAA', 'AAA', 'AAA', 'AAA', 'AAA', 'AAA'];
    const data = {
    labels: labels,
    datasets: [{
        label: 'Database',
        data: [100, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};-->
</template>

<script>
export default {
  props: {
    nomeCorso: String
  }
}
</script>
