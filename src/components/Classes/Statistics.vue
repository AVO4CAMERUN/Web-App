<template>
    <div class="text-center text-gray-400 text-2xl" id="myChart">{{nomeCorso}}</div>
    <!-- Esempio del file messo su Drive
    Da mettere charts.js https://www.chartjs.org/docs/latest/
    Per provarlo con CDN: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      const labels = [
        // Qui andranno i nomi delle lezioni
        "Lezione 1",
        "Lezione 2",
        "Lezione 3",
        "Lezione 4",
        "Lezione 5",
        "Lezione 6",
      ];

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Risultati quiz", // Nome del dataset, non del grafico
            backgroundColor: [
              // Si possono anche mettere solo pochi colori
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
            data: [100, 83, 95, 60, 53, 78, 45], // Qui ci saranno le percetuali di tutte le lezioni: (risposte_giuste/risposte_totali) * 100
          },
        ],
      };

      const options = {
        apectRatio: 20 / 13, // Da decidere assieme
        scales: {
          y: {
            suggestedMax: 100,
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Nome Corso", // Da capire come ingrandire
          },
        },
      };

      const config = {
        type: "bar",
        data: data,
        options: options,
      };-->
</template>

<script>
export default {
  props: {
    nomeCorso: String
  }
}
</script>
