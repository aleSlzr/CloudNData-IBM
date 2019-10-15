<template>
  <div class="posts">
    <h1>¡Bandas participantes!</h1>
    <input type="radio" id="one" value="radiohead" v-model="picked">
    <label for="one">Radiohead</label>
    <br>
    <input type="radio" id="two" value="the1975" v-model="picked">
    <label for="two">The 1975</label>
    <br>
    <input type="radio" id="two" value="interpol" v-model="picked">
    <label for="two">Interpol</label>
    <br>
    <input type="radio" id="two" value="queen" v-model="picked">
    <label for="two">Queen</label>
    <br>
    <input type="radio" id="two" value="taylorswift" v-model="picked">
    <label for="two">Taylor Swift</label>
    <br>
    <input type="radio" id="two" value="jonas" v-model="picked">
    <label for="two">Jonas Brothers</label>
    <br>
    <input type="radio" id="two" value="juanes" v-model="picked">
    <label for="two">Juanes</label>
    <br>
    <input type="radio" id="two" value="jbalvin" v-model="picked">
    <label for="two">J Balvin</label>
    <br>
    <br>
    <span v-if="picked">
      Picked:
      <b>{{ picked }}</b>
    </span>
    <br>
    <br>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="castBallot">
      <!-- <input type="text" value="2sww593dc034wb2twdk91r" v-model="input.electionId"  >
      <br>-->
      <input type="text" v-model="input.voterId" placeholder="Ingresa tu ID">
      <br>
      <input type="submit" value="Votar">
      <br>
    </form>

    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id="loader" ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      input: {},
      picked: null,
      response: null
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async castBallot() {
      await this.runSpinner();

      const electionRes = await PostsService.queryWithQueryString('election');

      let electionId = electionRes.data[0].Key;

      console.log("picked: ");
      console.log(this.picked);
      console.log("voterId: ");
      console.log(this.input.voterId);
      this.response = null;

 

      //error checking for making sure to vote for a valid party
      if (this.picked === null ) {
        console.log('this.picked === null')

        let response = "¡Necesitas elegir una opción para votar!";
        this.response = response;
        await this.hideSpinner();
      
      } else if (this.input.voterId === undefined) {
        console.log('this.voterId === undefined')

        let response = "¡Necesitas ingresar tu ID para votar!";
        this.response = response;
        await this.hideSpinner();

      } else {

        const apiResponse = await PostsService.castBallot(
          electionId,
          this.input.voterId,
          this.picked
        );

        console.log('apiResponse: &&&&&&&&&&&&&&&&&&&&&&&');
        console.log(apiResponse);

        if (apiResponse.data.error) {
          this.response= apiResponse.data.error;
          await this.hideSpinner();
        } else if (apiResponse.data.message) {
          this.response= `No pudimos encontrar al votante ${this.input.voterId}
            . Asegurate de ingresar correctamente tu ID`;
          await this.hideSpinner();
        } 
        else {
          let response = `Voto correctamente hecho para ${this.picked} 
            realizado por ${apiResponse.data.voterId}. ¡Gracias por 
            participar!`;

          this.response = response;

          console.log("cast ballot");
          console.log(this.input);
          await this.hideSpinner();
        }
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
