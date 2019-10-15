<template>
  <div class="posts">
    <h1>Ver las votaciones</h1>

    <b-button variant="outline-primary" v-on:click="getCurrentStanding()">Verificar votaciones</b-button>

    <br />
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br />
    <vue-instant-loading-spinner id="loader" ref="Spinner"></vue-instant-loading-spinner>
    <div class="chart-wrapper">
      <chart :options="chartOptionsBar"></chart>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "response",
  data() {
    return {
      response: null,
      chartOptionsBar: {}
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async getCurrentStanding() {
      this.response = null;

      this.runSpinner();

      // console.log(`this.selected ${this.selected}`);
      const apiResponse = await PostsService.getCurrentStanding();
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log("ApiResponse", apiResponse);
      console.log("Record", apiResponse.data[0].Record);
      let currentStanding = [];
      let data = [];
      for (let i = 0; i < apiResponse.data.length; i++) {
        currentStanding[i] = apiResponse.data[i].Record.count;
        data.push(apiResponse.data[i].Record.description);
      }

      console.log("curStanding: ");
      console.log(currentStanding);

      this.chartOptionsBar = {
        xAxis: {
          data: data,
          ticks: {
            stepSize: 50,
            maxTicksLimit: 3
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            data: currentStanding
          }
        ],

        title: {
          text: "2020 ",
          x: "center",
          textStyle: {
            fontSize: 24
          }
        },
        color: ["#127ac2"]
      };
      // this.response = apiResponse.data;
      // this.renderChart(this.datacollection, this.options)
      this.hideSpinner();
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>
