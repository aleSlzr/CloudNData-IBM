<template>
  <div class="posts">
    <h1>Consulta por ID</h1>

    <b-container>
      <b-row>
        <b-col sm="5" class="alignForm">
          <form v-on:submit="queryByKey">
            <b-form-input type="text" v-model="input.key" placeholder="Ingresa tu RFC"></b-form-input>
            <br>

            <b-button variant="outline-primary" type="submit" value="Consultar">Consultar</b-button>
            <br>
            <br>
            <span v-if="input">
              <b>{{ input.data }}</b>
            </span>  
            <br>
          </form>
        </b-col>
      </b-row>
    </b-container>

    <br>
      <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from 'vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue'

export default {
  name: "response",
  data() {
    return {
     input: {
        data: ""
      }
    };
  },
  name: 'app',
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async queryByKey() {
        this.runSpinner();
      console.log('this.input: ');
      console.log(this.input);
      if (!this.input.key) {
        console.log('this.input$#: ');
        let response = 'Ingresa algo para buscar';
        this.input.data = response;
        this.hideSpinner();
      } else {
        this.runSpinner();
        const apiResponse = await PostsService.queryByKey(this.input.key);
        console.log(apiResponse);
        this.input = apiResponse;
        this.hideSpinner();
      }
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

<style>
.alignForm{
  margin-left: 30%;
}
</style>
