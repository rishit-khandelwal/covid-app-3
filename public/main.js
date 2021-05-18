var chart;
const app = Vue.createApp({
  data() {
    return {
      latestConfirmed: undefined,
      totalConfirmedGrowthArray: undefined,
      showNewCases: true,
    };
  },
  methods: {
    main(data) {
      this.totalConfirmedGrowthArray = data.map((v) => v["Confirmed"]);
      this.totalConfirmedGrowthArray = this.growthArray(
        this.totalConfirmedGrowthArray
      );
      this.latestConfirmed =
        data[data.length - 1]["Confirmed"] - data[data.length - 2]["Confirmed"];

      this.drawChart();
    },
    growthArray(arr) {
      return arr.map((v, i, ar) => {
        if (i == 0) {
          return v;
        }

        return v - ar[i - 1];
      });
    },
    drawChart() {
      const canvas = document.getElementById("chart");
      const canvasCtx = canvas.getContext("2d");

      chart = new Chart(canvasCtx, {
        type: "line",
        data: {
          labels: this.totalConfirmedGrowthArray.map((_, i) => i + 1),
          datasets: [
            {
              label: "New Confirmed Cases",
              data: this.totalConfirmedGrowthArray,
              backgroundColor: ["rgba(0, 132, 255, 1)"],
            },
          ],
        },
      });
    },
  },
  mounted() {
    fetch("https://api.covid19api.com/total/country/india")
      .then((r) => r.json())
      .then(this.main);
  },
}).mount("#root");
