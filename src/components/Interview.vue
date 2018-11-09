<template>
     <div class="container-liquid">
        <div class="row ml-2 mb-4">
            <h1>Interview</h1>
        </div>
        <form class="ml-1" style="width:400px">
            <div class="form-group row">
                <label for="dateInput" class="col-sm-4 col-form-label">Date</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="dateInput" v-model="interviewData.date">
                </div>
            </div>
            <div class="form-group row">
                <label for="applicantInput" class="col-sm-4 col-form-label">Applicant</label>
                <div class="col-sm-8">
                    <model-list-select id="applicantInput"
                                :list="applicantsList"
                                v-model="selectedApplicant"
                                option-value="rut"
                                :custom-text="getApplicantFullName"
                                placeholder="Select applicant">
                    </model-list-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="processInput" class="col-sm-4 col-form-label">Process</label>
                <div class="col-sm-8">
                    <model-list-select id="processInput"
                                :list="processList"
                                v-model="selectedProcess"
                                option-value="_id"
                                :custom-text="getProcessDescription"
                                placeholder="Select process">
                    </model-list-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="psychologicalInput" class="col-sm-4 col-form-label">Psychological Test</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="psychologicalInput" v-model="interviewData.psychological">
                </div>
            </div>
            <div class="form-group row">
                <label for="technicalqualificationInput" class="col-sm-4 col-form-label">Technical Qualification</label>
                <div class="col-sm-8">
                    <model-select id="technicalqualificationInput"
                                :options="technicalqualificationArray"
                                v-model="selectedTechnicalqualification"
                                placeholder="Select Technical Qualification">
                    </model-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="logicalqualificationInput" class="col-sm-4 col-form-label">Logical Qualification</label>
                <div class="col-sm-8">
                    <model-select id="logicalqualificationInput"
                                :options="logicalqualificationArray"
                                v-model="selectedLogicalqualification"
                                placeholder="Select Logical Qualification">
                    </model-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="commentInput" class="col-sm-4 col-form-label">Comment</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="commentInput" v-model="interviewData.comment">
                </div>
            </div>
            <div class="form-group row">
                <label for="statusInput" class="col-sm-4 col-form-label">Status</label>
                <div class="col-sm-8">
                    <model-select id="statusInput"
                                :options="statusArray"
                                v-model="selectedStatus"
                                placeholder="Select status">
                    </model-select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-4">
                    <button type="button" class="btn btn-primary mt-3 mb-3" @click="closeInterview">Close Interview</button>
                </div>
                <div class="col-sm-4">
                    <button type="button" class="btn btn-primary mt-3 mb-3" @click="saveInterview">Save Interview</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Interview',
  props: ['interviewId'],
  data () {
    return {
        interviewData: {    
            date: '',
            applicant: '',
            process: '',
            psychological: '',
            technicalqualification: '',
            logicalqualification: '',
            comment: '',
            status: 'Called'
        },
        statusArray: [
            {value: '1', text: 'Called'},
            {value: '2', text: 'Recruitment'},
            {value: '3', text: 'Face-to-face'},
            {value: '4', text: 'Selected'},
            {value: '5', text: 'Signed'},
            {value: '6', text: 'Rejected'}
        ],
        technicalqualificationArray: [
            {value: '1', text: '1'},
            {value: '2', text: '2'},
            {value: '3', text: '3'},
            {value: '4', text: '4'},
            {value: '5', text: '5'},
            {value: '6', text: '6'},
            {value: '7', text: '7'},
            {value: '8', text: '8'},
            {value: '9', text: '9'},
            {value: '10', text: '10'}
        ],
        logicalqualificationArray: [
            {value: '1', text: '1'},
            {value: '2', text: '2'},
            {value: '3', text: '3'},
            {value: '4', text: '4'},
            {value: '5', text: '5'},
            {value: '6', text: '6'},
            {value: '7', text: '7'},
            {value: '8', text: '8'},
            {value: '9', text: '9'},
            {value: '10', text: '10'}
        ],
        applicantsList: [],
        processList: [],
        selectedStatus: {value: '', text: ''},
        selectedTechnicalqualification: {value: '', text: ''},
        selectedLogicalqualification: {value: '', text: ''},
        selectedApplicant: {
            _id: "",
            email: "",
            lastname: "",
            name: "",
            phone: "",
            reference: "",
            request: {
                type:"",
                url:""
            },
            rut: "",
            skills: "",
            cvlink: "",
            country: ""
        },
        selectedProcess: {
            _id: "",
            position: "",
            description: "",
            experience: "",
            skills: "",
            startdate: "",
            enddate: "",
            department: "",
            result: "",
            owner: "",
            profile: "",
            status: "",
            request: {
                type:"",
                url:""
            },
        },
        date: '10/10/2018 18:21:10'
    }
  },
  created: function () {
      this.getApplicantsList()
      this.getProcessList()
      this.getInterviewData()
  },
  methods: {
      getInterviewData: function () {
        var self = this
        if(this.interviewId){ 
          var url = process.env.ROOT_API + 'interview/' + this.interviewId
          this.axios.get(url)
           .then(function (response) {
               self.interviewData = response.data.interview
                if (self.statusArray.find(x => x.text === self.interviewData.status))
                   {self.selectedStatus = self.statusArray.find(x => x.text === self.interviewData.status)}
                
                if (self.technicalqualificationArray.find(x => x.text == self.interviewData.technicalqualification))
                   {self.selectedTechnicalqualification = self.technicalqualificationArray.find(x => x.text == self.interviewData.technicalqualification)}
                
                if (self.logicalqualificationArray.find(x => x.text == self.interviewData.logicalqualification))
                   {self.selectedLogicalqualification = self.logicalqualificationArray.find(x => x.text == self.interviewData.logicalqualification)}

                if (self.applicantsList.find(x => x._id == self.interviewData.applicant._id))
                   {self.selectedApplicant = self.applicantsList.find(x => x._id == self.interviewData.applicant._id)}

                if (self.processList.find(x => x._id == self.interviewData.process._id))
                   {self.selectedProcess = self.processList.find(x => x._id == self.interviewData.process._id)}
           })
        }
      },
      getApplicantFullName: function (item) {
          return item.name + ' ' + item.lastname
      },
      getApplicantsList: function () {
            var self = this
            this.axios.get(process.env.ROOT_API + 'applicant/')
            .then(function (response) {
                self.applicantsList = response.data.applicant
            })
      },
      getProcessDescription: function (item) {
      		return item.description
      },
      getProcessList: function () {
            var self = this
            this.axios.get(process.env.ROOT_API + 'process/')
            .then(function (response) {
                self.processList = response.data.process
            })
      },
      saveInterview: function () {
          var self = this
          if (this.interviewId) {
            this.axios.put(process.env.ROOT_API + 'interview/' + self.interviewId, {
                //_id: self.interviewId,
                date: self.interviewData.date ? self.interviewData.date : '10-22-2018',
                applicant: self.selectedApplicant._id,
                process: self.selectedProcess._id,
                psychological: self.interviewData.psychological ? self.interviewData.psychological : '',
                technicalqualification: self.selectedTechnicalqualification.text ? self.selectedTechnicalqualification.text : '',
                logicalqualification: self.selectedLogicalqualification.text ? self.selectedLogicalqualification.text : '',
                comment: self.interviewData.comment ? self.interviewData.comment : '',
                status: self.selectedStatus.text
            })
            .then(function (response) {
                 self.$router.push({
                    name: 'InterviewGrid'
                })
           })
          } else {
              this.axios.post(process.env.ROOT_API + 'interview/', {
                _id: self.interviewId,
                date: self.interviewData.date ? self.interviewData.date : '10-22-2018',
                applicant: self.selectedApplicant._id,
                process: self.selectedProcess._id,
                psychological: self.interviewData.psychological ? self.interviewData.psychological: '',
                technicalqualification: self.selectedTechnicalqualification.text ? self.selectedTechnicalqualification.text : '',
                logicalqualification: self.selectedLogicalqualification.text ? self.selectedLogicalqualification.text : '',
                comment: self.interviewData.comment ? self.interviewData.comment : '',
                status: self.selectedStatus.text
            })
            .then(function (response) {
                self.$router.push({
                    name: 'InterviewGrid'
                })
            })
          }
          
      },
      addInterview: function () {

      },
      closeInterview: function () {

      }
  }
}
</script>
