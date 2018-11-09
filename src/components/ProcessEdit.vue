<template>
    <div class="container-liquid">
        <div class="row ml-2 mb-4">
                <h1>Process</h1>
        </div>
        <form class="ml-1" style="width:400px">
            <div class="form-group row">
                <label for="descriptionInput" class="col-sm-4 col-form-label">Description</label>
                <div class="col-sm-8">
                    <input :disabled="processData.status === 'Closed'" type="text" class="form-control" id="descriptionInput" v-model="processData.description">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Status</label>
                <label class="col-sm-8 col-form-label">{{processData.status}}</label>
            </div>
            <div class="form-group row">
                <label for="positionInput" class="col-sm-4 col-form-label">Position</label>
                <div class="col-sm-8">
                    <model-select :options="positionsArray"
                                :isDisabled="processData.status === 'Closed'"
                                v-model="selectedPosition"
                                placeholder="Select a position">
                    </model-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="experienceInput" class="col-sm-4 col-form-label">Experience</label>
                <div class="col-sm-8">
                    <input :disabled="processData.status === 'Closed'" type="text" class="form-control" id="experienceInput" v-model="processData.experience">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Start Date</label>
                <label class="col-sm-8 col-form-label">{{processData.startdate}}</label>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">End Date</label>
                <label class="col-sm-8 col-form-label">{{processData.enddate}}</label>
            </div>
            <div class="form-group row">
                <label for="areaInput" class="col-sm-4 col-form-label">Area</label>
                <div class="col-sm-8">
                    <input :disabled="processData.status === 'Closed'" type="text" class="form-control" id="areaInput" v-model="processData.department">
                </div>
            </div>
            <div class="form-group row">
                <label for="ownerInput" class="col-sm-4 col-form-label">Owner</label>
                <div class="col-sm-8">
                    <model-select id="ownerInput"
                                :isDisabled="processData.status === 'Closed'"
                                :options="ownersArray"
                                v-model="selectedOwner"
                                placeholder="Select owner">
                    </model-select>
                </div>
            </div>
            <fieldset class="form-group">
                <div class="row">
                    <legend class="col-form-label col-sm-4 pt-0">Skills</legend>
                    <div class="col-sm-8">
                        <div class="form-check" v-for="(position, index) in positionsArray">
                            <input :disabled="processData.status === 'Closed'" class="form-check-input" type="checkbox" ref="skillsInput" :name="position.text" 
                                    v-on:click="updateSkills(position.text, index)"
                                    :checked="processData.length > 1 ? false : processData.skills.includes(position.text)">
                            <label class="form-check-label">
                                {{ position.text }}
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="form-group row">
                <label for="applicantInput" class="col-sm-4 col-form-label">Applicant</label>
                <div class="col-sm-8">
                    <model-list-select id="applicantInput"
                                :isDisabled="processData.status === 'Closed'"
                                :list="applicantsList"
                                v-model="selectedApplicant"
                                option-value="rut"
                                :custom-text="getApplicantFullName"
                                placeholder="Select applicant">
                    </model-list-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="textareaInput" class="col-sm-4">Result</label>
                <textarea :disabled="processData.status === 'Closed'" class="form-control col-sm-8" id="textareaInput" rows="3" v-model="processData.result"></textarea>
            </div>
            <div class="form-group row">
                <div v-if="processData.status !== 'Closed'" class="col-sm-4 mb-3">
                    <button type="button" class="btn btn-primary mt-3" @click="saveProcess(false, true)">Add Interview</button>
                </div>
                <div v-if="!newProcess && processData.status !== 'Closed'" class="col-sm-4 mb-3">
                    <button type="button" class="btn btn-primary mt-3" @click="saveProcess(true, false)">Close Process</button>
                </div>
                <div v-if="processData.status !== 'Closed'" class="col-sm-4 mb-3">
                    <button type="button" class="btn btn-primary mt-3" @click="saveProcess(false, false)">Save Process</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'ProcessEdit',
  props: ['processId'],
  data () {
    return {
        newProcess: this.processId ? false : true,
        processData: {
            position: '',
            description: '',
            experience: '',
            profile: '',
            startdate: '',
            enddate: '',
            department: '',
            result: '',
            owner: '',
            skills: [],
            applicant: '',
            status: 'In creation'
        },
        positionsArray: [
            {value: '1', text: 'Web Developer'},
            {value: '2', text: 'DB Developer'},
            {value: '3', text: 'Full Stack Developer'},
            {value: '4', text: 'Team Lead'},
            {value: '5', text: 'API Developer'},
            {value: '6', text: 'QA Engineer'}
        ],
        ownersArray: [
            {value: '1', text: 'Cristian Peña'},
            {value: '2', text: 'Miguel Salom'},
            {value: '3', text: 'Daniel Pons'},
            {value: '4', text: 'Felipe Rivera'}
        ],
        applicantsList: [],
        results: '',
        selectedPosition: {value: '', text: ''},
        selectedOwner: {value: '', text: ''},
        selectedApplicant: {
            _id: '',
            email: '',
            lastname: '',
            name: '',
            phone: '',
            reference: '',
            request: {
                type: '',
                url: ''
            },
            rut: '',
            skills: ''
        }
        //selectedApplicant: null
    }
  },
  created: function () {
      this.getApplicantsList()
      this.getProcessData()
  },
  methods: {
      getProcessData: function () {
          var self = this
          if (this.processId) {
            var url = process.env.ROOT_API + 'process/' + this.processId
            this.axios.get(url)
            .then(function (response) {
                self.processData = response.data.process
                if (self.positionsArray.find(x => x.text === self.processData.position))
                    self.selectedPosition = self.positionsArray.find(x => x.text === self.processData.position)
                if (self.ownersArray.find(x => x.text === self.processData.owner))
                    self.selectedOwner = self.ownersArray.find(x => x.text === self.processData.owner)
                if (self.processData.applicant) {
                    if (self.applicantsList.find(x => x._id == self.processData.applicant._id))
                        self.selectedApplicant = self.applicantsList.find(x => x._id == self.processData.applicant._id)
                }
                self.processData.skills = self.processData.skills.split(',')
            })
          }
      },
      getApplicantFullName: function (item) {
          return item.name + ' ' + item.lastname
      },
      getApplicantsList: function () {
            var self = this
            if (this.processId) {
                this.axios.get(process.env.ROOT_API + 'interview/byprocess/' + self.processId)
                .then(function (response) {
                    response.data.interview.forEach(function (interview) {
                        self.applicantsList.push(interview.applicant)
                    })
                })
            } else {
                this.axios.get(process.env.ROOT_API + 'applicant/')
                .then(function (response) {
                    self.applicantsList = response.data.applicant
                })
            }
      },
      updateSkills: function (position, index) {
          if (this.$refs.skillsInput[index].checked)
            this.processData.skills.push(position)
          else
            var arrayIndex = this.processData.skills.indexOf(position)
            if (arrayIndex > -1)
                this.processData.skills.splice(arrayIndex, 1)
      },
      saveProcess: function (close, addInterview) {
          var self = this
          if (this.processId) {
            this.axios.put(process.env.ROOT_API + 'process/' + self.processId, {
                description: self.processData.description,
                position: self.selectedPosition.text,
                experience: self.processData.experience,
                profile: self.processData.profile,
                department: self.processData.department,
                result: self.processData.result,
                owner: self.selectedOwner.text,
                startdate: self.processData.startdate,
                skills: typeof(self.processData.skills) === 'string' ? self.processData : self.processData.skills.join(','),
                status: close ? 'Closed' : 'Open',
                applicant: close ? self.selectedApplicant._id != '' ? self.selectedApplicant._id : null : null
            })
            .then(function (response) {
                var routeName = addInterview ? 'Interview' : 'ProcessGrid'
                self.$router.push({
                    name: routeName
                })
            })
          } else {
              this.axios.post(process.env.ROOT_API + 'process/', {
                description: self.processData.description,
                position: self.selectedPosition.text,
                experience: self.processData.experience,
                profile: self.processData.profile,
                department: self.processData.department,
                result: self.processData.result,
                owner: self.selectedOwner.text,
                skills: self.processData.skills.join(','),
                status: 'Open'
            })
            .then(function (response) {
                var routeName = addInterview ? 'Interview' : 'ProcessGrid'
                self.$router.push({
                    name: routeName
                })
            })
          }
      }
  }
}
</script>

<style>
</style>