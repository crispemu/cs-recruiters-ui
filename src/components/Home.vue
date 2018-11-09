<template>
  <div class="col-sm-8 mx-auto">
    <!--
    <div class="card text-center">
      <div class="card-header">
      DevOps
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">New DevOps Engineer</h5>
        <p class="card-text">Senior DevOps Engineer</p>
        <a href="#" class="btn btn-primary">Interviews</a>&nbsp;
        <a href="#" class="btn btn-primary">Applicants</a>
      </div>
      <div class="card-footer text-muted">
      Closed
      </div>
    </div>
    <br>
  -->
    <div v-for="(item, index) in processList">
      <div class="card text-center">
        <div class="card-header">
        {{item.department}}
        </div>
        <div class="card-body">
          <h5 class="card-title font-weight-bold">{{item.description}}</h5>
          <p class="card-text">{{item.position}}</p>
          <router-link class="btn btn-primary" tag="button" :to="{name: 'ProcessEdit', params: { processId: item._id }}"> Process</router-link>
          <router-link class="btn btn-primary" tag="button" :to="{name: 'InterviewGrid', params: { processDesc: item.description }}"> Interviews</router-link>
        </div>
        <div v-if="item.status === 'Closed' && item.applicant" class="card-footer" style="background-color:#D8F6CE;">
          Process finished with new hire:<br>
          <h4><b-link :to="{name: 'Applicant', params: { _id: item.applicant._id }}">{{item.applicant.name}} {{item.applicant.lastname}}</b-link></h4>
        </div>
        <div v-if="item.status === 'Closed' && !item.applicant" class="card-footer" style="background-color:#F6CECE;">
          Process finished without new hire
        </div>
        <div class="card-footer text-muted">
          {{item.status}}
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      processList: []
    }
  },
  created: function () {
    this.getData();
  },
  methods: {
    getData: function () {
      var self = this;
      console.log("api url: " + process.env.ROOT_API + 'process/')
      this.axios.get(process.env.ROOT_API + 'process/')
      .then(function (response) {
          self.processList = response.data.process;
          self.processList.forEach(function (proc) {
            if (proc.applicant) {
              self.axios.get(process.env.ROOT_API + 'applicant/' + proc.applicant)
              .then(function (response) {
                  proc.applicant = response.data.applicant
              });
            }
          })
      });
    },
    goInterview: function(id) {
      alert(id);
    },
    goApplicant: function(id) {
      alert(id);
    }
  }      
}
</script>
