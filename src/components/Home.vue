<template>
  <div class="posts">
    <h1>2019 IBM Music Awards!</h1>
    <h3>Si eres un votante registrado, solo agrega tu voterId</h3>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="validateVoter">
      <input type="text" v-model="loginData.voterId" placeholder="Ingresa tu ID">
      <br>

      <input type="submit" value="Login">
      <br>
      <br>
      <span v-if="loginReponse">
        <b>{{ loginReponse.data }}</b>
      </span>
      <br>
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input v-model="loginData.voterId" placeholder="Ingresa tu ID"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" type="submit" value="Login">Button</b-button>
        </b-input-group-append>
      </b-input-group>
    </form>

    <br>
    <h3>De lo contrario, ¡Registrate aqui!</h3>
    <form v-on:submit="registerVoter">
      <input type="text" v-model="registerData.voterId" placeholder="Ingresa tu RFC">
      <br>
      <input type="text" v-model="registerData.registrarId" placeholder="Ingresa tu número de telefono">
      <br>
      <input type="text" v-model="registerData.firstName" placeholder="Ingresa tu nombre">
      <br>
      <input type="text" v-model="registerData.lastName" placeholder="Ingresa tu apellido">
      <br>
      <input type="submit" value="Registrar">
    </form>
    <br>
    <span v-if="registerReponse">
      <b>{{ registerReponse.data }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      loginData: {},
      registerData: {},
      registerReponse: {
        data: ""
      },
      loginReponse: {
        data: ""
      }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async registerVoter() {

      await this.runSpinner();
      const apiResponse = await PostsService.registerVoter(
        this.registerData.voterId,
        this.registerData.registrarId,
        this.registerData.firstName,
        this.registerData.lastName
      );

      console.log(apiResponse);
      this.registerReponse = apiResponse;
      await this.hideSpinner();
    },

    async validateVoter() {
      await this.runSpinner();

      if (!this.loginData.voterId) {
        console.log("!thislogin");
        let response = 'Ingresa un ID valido';
        this.loginReponse.data = response;
        await this.hideSpinner();
      } else {
        const apiResponse = await PostsService.validateVoter(
          this.loginData.voterId
        );
        console.log("apiResponse");
        console.log(apiResponse.data);

        if (apiResponse.data.error) {
          // console.log(apiResponse);
          console.log(apiResponse.data.error);
          this.loginReponse = apiResponse.data.error;
        } else {
          this.$router.push("castBallot");
        }

        console.log(apiResponse);
        this.loginReponse = apiResponse;
        // this.$router.push('castBallot')
        await this.hideSpinner();
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
