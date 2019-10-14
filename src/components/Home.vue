<template>
  <div class="posts">
    <h1 > <img src="../assets/compact-disc-solid.svg" alt="" class="musicIcon">&nbsp; IBM Music Awards 2019 &nbsp; <img src="../assets/compact-disc-solid.svg" alt="" class="musicIcon"> </h1>

    <b-collapse id="collapse-4" v-model="showLogin" class="mt-2">
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="validateVoter">
      <b-container>
        <b-row>
          <!-- <b-col sm="3">
            <label>Ingresa tu RFC:</label>
          </b-col> -->
          <b-col sm="4"></b-col>

          <b-col sm="4">
            <b-form-input type="text" v-model="loginData.voterId" placeholder="Ingresa tu RFC /VoterID"></b-form-input>
          </b-col>
        </b-row><br>

        <b-button variant="outline-primary" type="submit" value="Login">Login</b-button> &nbsp;&nbsp;&nbsp;
        <b-button variant="outline-primary" @click="showRegister = !showRegister, showLogin = !showLogin">Regístrate</b-button>
        <br>
        <br>
        <span v-if="loginReponse">
          <b>{{ loginReponse.data }}</b>
        </span>
        <br>
      </b-container>
    </form>
    </b-collapse>

    <br>
    <b-collapse id="collapse-4" v-model="showRegister" class="mt-2">
    <h2>Ingresa tus datos para registrarte</h2>
    <form v-on:submit="registerVoter"  >
      <b-container>
        <b-row>
          <b-col sm="4">
          </b-col>
          <b-col sm="4">
            <b-form-input type="text" v-model="registerData.voterId" placeholder="Ingresa tu RFC"></b-form-input>
          </b-col>
        </b-row><br>
        <b-row>
          <b-col sm="4">
          </b-col>
          <b-col sm="4">
            <b-form-input type="text" v-model="registerData.registrarId" placeholder="Ingresa tu número de teléfono"></b-form-input>
          </b-col>
        </b-row><br>
        <b-row>
          <b-col sm="4">
          </b-col>
          <b-col sm="4">
            <b-form-input type="text" v-model="registerData.firstName" placeholder="Ingresa tu nombre"></b-form-input>
          </b-col>
        </b-row><br>
        <b-row>
          <b-col sm="4">
          </b-col>
          <b-col sm="4">
            <b-form-input type="text" v-model="registerData.lastName" placeholder="Ingresa tu apellido"></b-form-input>
          </b-col>
        </b-row><br>
      </b-container>

      <b-button variant="outline-primary" type="submit" value="Registrar">Registrar</b-button>  &nbsp;&nbsp;&nbsp;
      <b-button variant="outline-primary" @click="showRegister = !showRegister, showLogin = !showLogin"> Volver al Login</b-button> 

    </form>
    <br>
    <span v-if="registerReponse">
      <b>{{ registerReponse.data }}</b>
    </span>
    <br>    
    </b-collapse>

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
      },
      showRegister: false,
      showLogin: true
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
        let response = "Ingresa un ID valido";
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
<style>
 .posts{
   margin-top: 10%;
 }
 .musicIcon{
   width: 3%;
 }
 .posts h1{
    color: black;
    font-weight: 100;
    font-size: 50px;
    margin-bottom: 1em;
 }

</style>
