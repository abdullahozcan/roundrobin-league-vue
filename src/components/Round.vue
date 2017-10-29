<template>
  <div class="round card">
    <div class="card-header">
      <div class="card-title has-icon-left" v-if="nameEmpty">
        <input class="form-input input-lg" type="text" v-on:keyup.enter="setName" placeholder="Name of the round" :value="tempName" autofocus>
        <i class="form-icon icon icon-arrow-right"></i>
      </div>
      <div class="card-title text-center" v-else="nameEmpty">
        <span class="h5">{{ round.name }}</span>
        <button class="btn btn-link btn-action btn-lg" @click="renameTitle"><i class="icon icon-edit"></i></button>
        <button class="btn btn-link btn-action delete-btn btn-lg" v-on:click="deleteRound"><i class="icon icon-cross"></i></button>
      </div>
    </div>
    <div class="card-body">
      <p v-show="noTeams">Drag a team under here</p>
      <draggable class="dragzone" :class="{ empty: noTeams }" :list="round.teams"
                 :options="{group: 'teams', draggable:'.draggable-team'}"
                 @change="updateRound">
        <span class="chip draggable-team" :value="team" v-for="team in round.teams" :key="team.id">{{ team.name }}</span>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { mapActions } from 'vuex'

  export default {
    props: {
      roundProp: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        tempName: '',
        round: this.roundProp
      }
    },
    computed: {
      noTeams: {
        get () {
          return this.round.teams.length === 0
        }
      },
      nameEmpty () {
        return this.round.name === ''
      }
    },
    methods: {
      ...mapActions([
        'editRound', 'deleteRound'
      ]),
      setName (event) {
        this.round.name = event.target.value
        this.updateRound()
      },
      renameTitle () {
        this.tempName = this.round.name
        this.round.name = ''
      },
      updateRound (event) {
        if (event && event.hasOwnProperty('removed')) {
          this.removeTeamFromMatches(event.removed.element)
        }
        this.$store.dispatch('editRound', this.round)
      },
      deleteRound () {
        this.round.teams.forEach((team) => {
          this.$store.dispatch('addTeam', team)
        })
        this.$store.dispatch('deleteRound', this.round)
      },
      removeTeamFromMatches (team) {
        let fixtures = this.round.fixtures
        fixtures.forEach((fixture) => {
          fixture.matches.forEach((match) => {
            if (match.home.id === team.id) {
              match.home = {}
            }
            if (match.away.id === team.id) {
              match.away = {}
            }
          })
        })
        this.round.fixtures = fixtures
      }
    },
    components: {
      draggable
    }
  }
</script>

<style scoped>
  .dragzone {
    min-height: 100px;
  }
</style>
