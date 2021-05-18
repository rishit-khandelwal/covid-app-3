const app = Vue.createApp({
  data() {
    return {
      latestConfirmed: undefined,
      totalConfirmed: undefined,
    };
  },
  methods: {
    main(data) {
      this.totalConfirmed = data.map((v) => v["Confirmed"]);
      this.totalConfirmed = this.growthArray(this.totalConfirmed);
      this.latestConfirmed = data[data.length - 1]["Confirmed"];

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

      // canvas.width = window.innerWidth;
      // canvas.height = window.innerHeight;

      // canvasCtx.moveTo(0, 0);
      // canvasCtx.lineTo(canvas.width, canvas.height);
      // canvasCtx.stroke();

      new Chart(canvasCtx, {
        type: "line",
        data: {
          labels: this.totalConfirmed.map((_, i) => i + 1),
          datasets: [
            {
              label: "New Confirmed Cases",
              data: this.totalConfirmed,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
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
