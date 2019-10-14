<template>
  <div id="app">
      <!-- Image and text -->
      <b-navbar variant="faded" type="dark" sticky="true">
        <b-navbar-brand href="/">
          <img src="./assets/logo.svg" class="d-inline-block align-top logo" alt="Kitten">
          Music Awards
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item><router-link to="/QueryAll">QueryAll</router-link></b-nav-item>
          <b-nav-item><router-link to="/queryWithQueryString">Query by Type</router-link></b-nav-item>
          <b-nav-item><router-link to="/queryByKey">Query by Key</router-link></b-nav-item>
          <b-nav-item><router-link to="/getCurrentStanding">Get Poll Standings</router-link></b-nav-item>
        </b-navbar-nav>
      </b-navbar>
        <!-- <p><router-link to="/">Home</router-link>&nbsp;           -->
        <!-- <router-link to="/castBallot">Cast Ballot</router-link>&nbsp; -->
        <!-- <router-link to="/QueryAll">QueryAll</router-link></p>
        <router-link to="/queryWithQueryString">Query by Type</router-link>&nbsp;
        <router-link to="/queryByKey">Query by Key</router-link>&nbsp;
        <router-link to="/getCurrentStanding">Get Poll Standings</router-link>&nbsp; -->
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app'  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets/whiteTexture.png')
}
.chart-wrapper {
  width: 100%;
  height: 700px;
}
.echarts {
  width: 100%;
  height: 100%;
}

#loader {
  position:fixed;
  padding-top: 250px;
}

.chart-wrapper {
  position:fixed;
  padding-left:32%;
}
.logo{
  width: 20%;
}
.navbar{
  background-color: black;
}
.navbar-brand{
  width: 25%;
}
</style>
