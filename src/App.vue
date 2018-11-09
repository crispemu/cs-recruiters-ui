<template>
  <div class="container-fluid" v-else>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <div class="navbar-nav">
          <img src="./assets/comscore-logo.png" alt="Smiley face" height="42" width="42">
          <li class="nav-item active text-light">
            <h2>&nbsp;comScore Recruitment Tool</h2>
          </li>
        </div>
      </div>
      <button  class="btn btn-link text-light" @click="login = false">Logout</button>
    </nav>

    <div class="container-fluid">

      <b-navbar type="light" variant="light" toggleable>
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Applicants" right>
              <b-dropdown-item to="/ApplicantGrid">View</b-dropdown-item>
              <b-dropdown-item to="/Applicant">Create</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Processes" right>
              <b-dropdown-item :to="{name: 'ProcessGrid'}">View</b-dropdown-item> 
              <b-dropdown-item :to="{name: 'ProcessEdit'}">Create</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Interviews" right>
              <b-dropdown-item :to="{name: 'InterviewGrid'}">View</b-dropdown-item>
              <b-dropdown-item :to="{name: 'Interview'}">Create</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <main role="main">
        <div class="jumbotron">
          <transition name="moveInUp">
          <router-view/>
          </transition>
        </div>
      </main>
    </div>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      login: false,
      username: '',
      password: '',
      authError: false
    }
  },
  methods: {
    validate: function() {
      if (this.username == 'admin' && this.password == 'admin') {
        this.login = true
        this.$router.replace({ name: "/" })
      }
      else {
        this.authError = true
      }
    },
    logout: function() {
      this.login = false
      this.username = ''
      this.password = ''
      this.authError = false
    }
  }
}
</script>

<style>
</style>
