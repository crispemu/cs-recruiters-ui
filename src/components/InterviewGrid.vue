<template>
    <div class="table-responsive">
        <div class="row ml-2">
          <h1>Interviews</h1>
        </div>
        <div class="row">
            <input type="text" class="form-control col-3 m-4" v-model="filter" placeholder="Search...">
            <b-button class="col-3 m-4" style="white-space: normal" variant="primary" :to="{name: 'Interview'}">Start New Interview</b-button>
        </div>
        <b-table bordered striped hover stacked="sm" :items="allInterview" :fields="fields" :filter="filter">
            <template slot="date" slot-scope="data">
                <b-link :to="{name: 'Interview', params: { interviewId: data.item._id }}">{{data.item.date}}</b-link>
            </template>
            <template slot="applicant._id" slot-scope="data">
                <b-link :to="{name: 'Applicant', params: { _id: data.item.applicant._id }}">{{data.item.applicant.name + " " + data.item.applicant.lastname}}</b-link>
            </template>
            <template slot="process.description" slot-scope="data">
                <b-link :to="{name: 'ProcessEdit', params: { processId: data.item.process._id }}">{{data.item.process.description}}</b-link>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
  name: 'InterviewGrid',
  props: ['processName'],
  data () {
    return {
        allInterview: [],
        fields: [
            { key: 'date', label: 'Date', sortable: true, sortDirection: 'desc' },
            { key: 'applicant._id', label: 'Applicant', sortable: true, sortDirection: 'desc' },
            { key: 'process.description', label: 'Process', sortable: true, sortDirection: 'desc' },
            { key: 'psychological', label: 'Psychological', sortable: true, sortDirection: 'desc' },
            { key: 'technicalqualification', label: 'Technical Qualification', sortable: true, sortDirection: 'desc' },
            { key: 'logicalqualification', label: 'Logical Qualification', sortable: true, sortDirection: 'desc' },
            { key: 'comment', label: 'Comment', sortable: true, sortDirection: 'desc' },
            { key: 'status', label: 'Status', sortable: true, sortDirection: 'desc' }
        ],
        filter: null
    }
  },
  props: [
    'processDesc'
  ],
  created: function () {
        this.getInterviewData()
        if (this.processName)
            this.filter = this.processName
  },
  methods: {
    getInterviewData: function () {
        var self = this
        var url = process.env.ROOT_API + 'interview/'

        self.filter = self.processDesc;
        this.axios.get(url)
        .then(function (response) {
            self.allInterview = response.data.interview
        })
    }
  }
}
</script>

<style>
</style>