<template>
    <div class="table-responsive">
        <div class="row ml-2">
            <h1>Applicants</h1>
        </div>
        <div class="row">
            <input type="text" class="form-control col-3 m-4" v-model="filter" placeholder="Search...">
            <b-button class="responsive-width col-3 m-4"
                    style="white-space: normal"
                    variant="primary" 
                    :to="{name: 'Applicant'}">
                Add New Applicant
            </b-button>
        </div>
        <b-table striped hover stacked="sm" :items="allApplicants" :fields="fields" :filter="filter">
            <template slot="name" slot-scope="data">
                <b-link :to="{name: 'Applicant', params: { _id: data.item._id }}">{{data.item.name + " " + data.item.lastname}}</b-link>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
  name: 'ApplicantGrid',
  props: ['processName'],
  data () {
    return {
        fields: [
            { key: 'name', label: 'Name', sortable: true },
            { key: 'country', label: 'Office', sortable: true },
            { key: 'skills', sortable: true },
            { key: 'refer', sortable: true },
            { key: 'email', sortable: true },
            { key: 'phone', label: 'Phone', sortable: true }
        ],
        allApplicants: [],
        filter: null
    }
  },
  created: function () {
      this.getApplicantsData()
      if (this.processName)
        this.filter = this.processName
  },
  methods: {
    getApplicantsData: function () {
        var self = this
        var url = process.env.ROOT_API + 'applicant/'
        this.axios.get(url)
        .then(function (response) {
            self.allApplicants = response.data.applicant   
        })
    }
  }
}
</script>

<style>
</style>