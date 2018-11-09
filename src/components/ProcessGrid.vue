<template>
    <div class="table-responsive">
        <div class="row ml-2">
            <h1>Processes</h1>
        </div>
        <div class="row">
            <input type="text" class="form-control col-3 m-4" v-model="filter" placeholder="Search...">
            <b-button class="responsive-width col-3 m-4"
                    style="white-space: normal"
                    variant="primary" 
                    :to="{name: 'ProcessEdit'}">
                Start New Process
            </b-button>
        </div>
        <b-table bordered striped hover stacked="sm" :items="allProcesses" :fields="fields" :filter="filter">
            <template slot="description" slot-scope="data">
                <b-link :to="{name: 'ProcessEdit', params: { processId: data.item._id }}">{{data.item.description}}</b-link>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
  name: 'ProcessGrid',
  data () {
    return {
        allProcesses: [],
        fields: [
            { key: 'description', label: 'Process', sortable: true, sortDirection: 'desc' },
            { key: 'status', sortable: true, sortDirection: 'desc' },
            { key: 'department', sortable: true, sortDirection: 'desc' },
            { key: 'position', sortable: true, sortDirection: 'desc' },
            { key: 'owner', sortable: true, sortDirection: 'desc' },
            { key: 'skills', sortable: true, sortDirection: 'desc' },
            { key: 'startdate', label: 'Start Date', sortable: true, sortDirection: 'desc' },
            { key: 'enddate', label: 'End Date', sortable: true, sortDirection: 'desc' }
        ],
        filter: null
    }
  },
  created: function () {
      this.getProcessData()
  },
  methods: {
    getProcessData: function () {
        var self = this
        var url = process.env.ROOT_API + 'process/'
        this.axios.get(url)
        .then(function (response) {
            self.allProcesses = response.data.process.sort(function (process1, process2) {
                if (process1.status < process2.status) return 1
                if (process1.status > process2.status) return -1
                return 0
            })
        })
    }
  }
}
</script>

<style>
</style>