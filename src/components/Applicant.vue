<template>
  <div class="container-liquid">
    <div class="row ml-2 mb-4">
        <h1>Applicant</h1>
    </div>
    <form class="ml-1" style="width:400px">
      <div v-if="selectedOffice.text === 'Santiago'" class="form-group row">
        <label for="colFormLabel" class="col-sm-4 col-form-label">Rut</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="colFormLabel" v-model="applicantData.rut">
        </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabel" class="col-sm-4 col-form-label">First Name</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="colFormLabel" v-model="applicantData.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabel" class="col-sm-4 col-form-label">Last Name</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="colFormLabel" v-model="applicantData.lastname">
        </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabel" class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-8">
          <input type="email" class="form-control" id="colFormLabel" v-model="applicantData.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabel" class="col-sm-4 col-form-label">Phone</label>
        <div class="col-sm-8">
          <input type="email" class="form-control" id="colFormLabel" v-model="applicantData.phone">
        </div>
      </div>
      <div class="form-group row">
          <label for="officeInput" class="col-sm-4 col-form-label">Office</label>
          <div class="col-sm-8">
              <model-select id="officeInput"
                          :options="officeArray"
                          v-model="selectedOffice"
                          placeholder="Select Office">
              </model-select>
          </div>
      </div>
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-label col-sm-4 pt-0">Origin</legend>
          <div class="col-sm-8">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="External Company" id="gridRadios1" value="option1" ref="externalRef" v-on:click="applicantData.reference = 'External Company'" :checked="applicantData.reference === 'External Company'">
              <label class="form-check-label" for="gridRadios1">
                External Company
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input referral" type="radio" name="Referral" id="gridRadios2" value="option2" ref="referralRef" v-on:click="applicantData.reference = 'Referral'" :checked="applicantData.reference === 'Referral'">
              <label class="form-check-label" for="gridRadios2">
                Referral
              </label>
            </div>
            <div class="form-check disabled">
              <input class="form-check-input" type="radio" name="Other" id="gridRadios3" value="option3" ref="otherRef" v-on:click="applicantData.reference = 'Other'" :checked="applicantData.reference === 'Other'">
              <label class="form-check-label" for="gridRadios3">
                Other
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="form-group row">
        <label for="colFormLabel" class="col-sm-4 col-form-label">Referral Name</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="colFormLabel" v-model="applicantData.refer">
        </div>
      </div>
      
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-label col-sm-4 pt-0">Profile</legend>
          <div class="col-sm-8">
            <div class="form-check" v-for="(skill, index) in skillsList">
              <input class="form-check-input" type="checkbox" :name="skill.name" id="'skill-' + index" ref="skillsRef" v-on:click="checkSkills(skill.name, index)" :checked="applicantData.skills.includes(skill.name)">
              <label class="form-check-label">
                {{ skill.name }}
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <div class="form-group row">
        <label for="colFormLabel" class="col-sm-4 col-form-label">CV</label>
        <div class="col-sm-8">
          <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
            <button v-on:click="submitFile()">Submit</button>
        </div>
      </div>


      <button type="button" class="btn btn-primary mb-3" v-on:click="submitProcess">Save Applicant</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Applicant',
  data () {
    return {   
        applicantData: {
          _id: '',
          email: '',
          lastname: '',
          name: '',
          phone: '',
          reference: '',
          rut: '',
          skills: [],
          refer: '',
          office: ''
        },
        skillsList: [],   
        msg: 'Applicant',
		search: 40,
    officeArray: [
            {value: '1', text: 'Amsterdam'},
            {value: '2', text: 'Reston'},
            {value: '3', text: 'New York'},
            {value: '4', text: 'Chicago'},
            {value: '5', text: 'Santiago'},
        ],
    selectedOffice: {value: '', text: ''},
    file: ''
    }
  },
  props: [
    '_id'
  ],
  created: function (){
    var self = this
    if (this._id){
      this.axios.get(process.env.ROOT_API + 'applicant/' + this._id)
      .then(function (response) {
        self.applicantData = response.data.applicant
        self.applicantData.skills = self.applicantData.skills.split(',')
        if (self.officeArray.find(x => x.text === self.applicantData.country))
          {self.selectedOffice = self.officeArray.find(x => x.text === self.applicantData.country)}
      })
    }
    
    this.skillsList = [
    {id: 1, name: "Web Developer"}, 
    {id: 2, name: "DB Developer"},
    {id: 3, name: "Full Stack Developer"},
    {id: 4, name: "Team Lead"},
    {id: 5, name: "API Developer"},
    {id: 6, name: "QA Engineer"}
  ]
  },
  methods: {
    checkSkills: function(skill, index){
      if (this.$refs.skillsRef[index].checked){
        this.applicantData.skills.push(skill)
      }else{
        var arrayIndex = this.applicantData.skills.indexOf(skill)
        if (arrayIndex > -1){
          this.applicantData.skills.splice(arrayIndex, 1)
        }
      }
    },    
    submitProcess: function () {
      var self = this
      if (self.applicantData._id && self.applicantData._id != ''){
        this.axios.put(process.env.ROOT_API + 'applicant/' + self.applicantData._id, 
        { 
          rut: self.applicantData.rut,
          name: self.applicantData.name,
          lastname: self.applicantData.lastname,
          email: self.applicantData.email,
          phone: self.applicantData.phone,
          skills: self.applicantData.skills.join(','),
          reference: self.applicantData.reference,
          refer: self.applicantData.refer,
          country: self.selectedOffice.text
        })
        .then(function (response) {
                 self.$router.push({
                    name: 'ApplicantGrid'
                })
        })
      }else{
        this.axios.post(process.env.ROOT_API + 'applicant/', 
        {
          rut: self.applicantData.rut,
          name: self.applicantData.name,
          lastname: self.applicantData.lastname,
          email: self.applicantData.email,
          phone: self.applicantData.phone,
          skills: self.applicantData.skills.join(','),
          reference: self.applicantData.reference,
          refer: self.applicantData.refer,
          country: self.selectedOffice.text
        })
        .then(function (response) {
                 self.$router.push({
                    name: 'ApplicantGrid'
                })
        })
      }      
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);

      this.axios.post(process.env.ROOT_API + 'applicant/upload', formData)
      .then(function(result){
          console.log('SUCCESS!!');
          console.log(result);
      })
      .catch(function(){
          console.log('FAILURE!!');
      });
    }
  }
}
</script>
