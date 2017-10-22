<template>
  <tr>
    <td class="col-5">
      <v-select :on-change="changeHomeTeam" v-if="homeNotSelected" label="name" :options="availableTeams"></v-select>
      <span v-else="homeNotSelected">{{ match.home.name }}</span>
    </td>
    <td class="col-2">
      <span v-if="hasResult">{{ match.score }}</span>
      <input class="form-input text-center" v-else="hasResult" v-on:keyup.enter="updateResult"/>
    </td>
    <td class="col-5">
      <v-select :on-change="changeAwayTeam" v-if="awayNotSelected" label="name" :options="availableTeams"></v-select>
      <span v-else>{{ match.away.name }}</span>
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
        teams: []
      }
    },
    computed: {
      homeNotSelected () {
        return Object.keys(this.match.home).length === 0
      },
      awayNotSelected () {
        return Object.keys(this.match.away).length === 0
      },
      hasResult () {
        return this.match.score
      }
    },
    mounted () {
      this.teams = this.$parent.$props.teams
      this.availableTeams = this.teams
    },
    methods: {
      changeHomeTeam (team) {
        this.match.home = team
      },
      changeAwayTeam (team) {
        this.match.away = team
      },
      updateResult (event) {
        this.match.score = event.target.value
      }
    },
    components: {
      vSelect
    }
  }
</script>

<style scoped>
</style>
