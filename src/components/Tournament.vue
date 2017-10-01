<template>
  <div class="tournament s-content">
    <div class="container">
      <h1 class="s-title">{{ msg }}</h1>
    </div>

    <div class="divider"></div>

    <div class="container">
      <h2 class="s-title">Teams</h2>
      <draggable :list="teams" @start="drag=true" @end="drag=false" :options="{group: 'teams', sort: false}">
        <div class="chip team c-hand" v-for="team in teams" :key="team.id">{{ team.name }}</div>
      </draggable>
    </div>

    <div class="divider"></div>

    <div class="container">
      <h2 class="s-title">Rounds</h2>
      <div class="empty" v-if="noRounds()">
        <p class="empty-title h5">No rounds</p>
        <p class="empty-subtitle">Let's start by creating one</p>
        <div class="empty-action">
          <button class="btn btn-primary" v-on:click="createRound">Add round</button>
        </div>
      </div><!-- .empty -->
      <div class="columns" v-else="noRounds()">
        <div class="column col-4" v-for="round in rounds">
          <round v-bind:roundProp="round" :key="round.id">
          </round>
        </div><!-- .columns -->
        <div class="column col-4 empty">
          <div class="empty-icon">
            <i class="icon icon-plus"></i>
          </div>
          <p class="empty-subtitle">Click the button to add a round</p>
          <div class="empty-action">
            <button class="btn btn-primary" v-on:click="createRound">Add Round</button>
          </div>
        </div><!-- .column -->
      </div><!-- .columns -->
    </div><!-- .container -->

    <div class="divider"></div>

    <!--<div class="container">-->
      <!--<h2 class="s-title">Fixtures</h2>-->
      <!--<div v-for="round in rounds" :key="round.id">-->
          <!--<h4 class="s-title">Round {{ round.name }}</h4>-->
          <!--<div class="columns">-->
            <!--<div class="column col-sm-12 col-xl-6 col-4" v-for="fixture in round.fixtures">-->
              <!--<fixture :key="fixture.id"></fixture>-->
            <!--</div>-->
          <!--</div>-->
        <!--<div class="divider"></div>-->
      <!--</div>&lt;!&ndash; .columns &ndash;&gt;-->
    <!--</div>&lt;!&ndash; .container &ndash;&gt;-->
  </div><!-- .tournament -->
</template>

<script>
  import Round from './Round.vue'
  import Fixture from './Fixture.vue'
  import draggable from 'vuedraggable'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        msg: 'Extraordinary League'
      } // end return
    }, // end data()
    computed: {
      ...mapGetters([
        'rounds',
        'teams'
      ])
    },
    methods: {
      ...mapActions([
        'createRound'
      ]),
      noRounds () {
        return this.rounds.length === 0
      }
    },
    components: {
      Round, Fixture, draggable
    }
  }
</script>

<style scoped>
  .team:hover {
    background-color: lightgrey;
  }
  .s-content .s-title {
    padding: 0.5em 0;
  }
  .divider {
    margin: 1.5em 0;
  }
</style>
