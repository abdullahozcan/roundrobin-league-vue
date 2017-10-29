<template>
  <tr>
    <td class="col-1">
      <button v-if="hasOneFieldSelected" class="btn btn-link btn-action btn-sm" v-on:click="editMatch"><i class="icon icon-edit"></i></button>
      <button v-if="editingMode" class="btn btn-link btn-action btn-sm" v-on:click="stopEditing"><i class="icon icon-check"></i></button>
      <button class="btn btn-link btn-action btn-sm" v-on:click="deleteMe"><i class="icon icon-cross"></i></button>
    </td>
    <td class="col-5" v-bind:class="{ selected: !homeEmpty }">
      <!--<v-select :on-change="changeHomeTeam" label="name" :options="availableTeams"></v-select>-->
      <v-select :on-change="changeHomeTeam" v-show="homeNotSelected" label="name" :options="availableTeams"></v-select>
      <span v-show="!homeNotSelected">{{ match.home.name }}</span>
    </td>
    <td class="col-1">
      <input class="form-input text-center" v-if="hasNotResult" v-on:keyup.enter="updateResult" :value="tempScore" placeholder="x-x"/>
      <span v-else="hasNotResult">{{ match.score }}</span>
    </td>
    <td class="col-5" v-bind:class="{ selected: !awayEmpty }">
      <v-select :on-change="changeAwayTeam" v-show="awayNotSelected" label="name" :options="availableTeams"></v-select>
      <span v-show="!awayNotSelected">{{ match.away.name }}</span>
    </td>
  </tr>
</template>

<script>
  import vSelect from 'vue-select'

  export default {
    props: {
      matchProp: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        match: this.matchProp,
        availableTeams: [],
        teams: [],
        tempScore: '',
        tempHome: {},
        tempAway: {},
        homeNotSelected: true,
        awayNotSelected: true,
        editingMode: false
      }
    },
    computed: {
      homeEmpty () {
        return Object.keys(this.match.home).length === 0
      },
      awayEmpty () {
        return Object.keys(this.match.away).length === 0
      },
      hasNotResult () {
        return this.match.score === ''
      },
      hasOneFieldSelected () {
        return (!this.hasNotResult || !this.homeNotSelected || !this.awayNotSelected)
      }
    },
    mounted () {
      this.teams = this.$parent.$props.teams
      this.availableTeams = this.teams
    },
    methods: {
      changeHomeTeam (team) {
        if (team) {
          this.match.home = team
          this.homeNotSelected = false
        }
      },
      changeAwayTeam (team) {
        this.match.away = team
        this.awayNotSelected = false
      },
      updateResult (event) {
        this.tempScore = event.target.value
        let pattern = new RegExp('^([0-9]{1,3}-[0-9]{1,3})$|^(n-d)$|^(p-p)$')
        let result = pattern.test(this.tempScore)
        if (!result) {
          return false
        }
        this.match.score = this.tempScore
      },
      deleteMe () {
        this.$emit('deleteMe', this.match)
      },
      editMatch () {
        this.editingMode = true
        this.tempScore = this.match.score
        this.match.score = ''
        this.homeNotSelected = true
        this.awayNotSelected = true
      },
      stopEditing () {
        this.editingMode = false
        this.match.score = this.tempScore
        if (!this.homeEmpty) this.homeNotSelected = false
        if (!this.awayEmpty) this.awayNotSelected = false
      }
    },
    components: {
      vSelect
    }
  }
</script>

<style>
  .v-select {
    width: 100%;
  }
  .v-select * {
    font-size: 0.8rem;
    float: none;
  }
  .v-select .selected-tag {
    height: auto;
  }
  .selected .v-select input[type=search] {
    display: none;
  }
</style>
