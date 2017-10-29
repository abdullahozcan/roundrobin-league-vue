import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rounds: [],
    teams: [
      { id: 1, name: 'Juventus' }, { id: 2, name: 'Milan' }, { id: 3, name: 'Inter' }, { id: 4, name: 'Napoli' }, { id: 5, name: 'Roma' },
      { id: 6, name: 'Manchester United' }, { id: 7, name: 'Liverpool' }, { id: 8, name: 'Chelsea' }, { id: 9, name: 'Arsenal' }, { id: 10, name: 'Tottenham' },
      { id: 11, name: 'Atletico Madrid' }, { id: 12, name: 'Real Madrid' }, { id: 13, name: 'Barcelona' },
      { id: 14, name: 'Bayern Munchen' }, { id: 15, name: 'Borussia Dortmund' },
      { id: 16, name: 'Paris Saint-Germain' }, { id: 17, name: 'Monaco' }, { id: 18, name: 'Atletico Bilbao' }
    ],
    keyword: '',
    roundIdFilter: 0,
    lastFixtureId: 0
  },
  getters: {
    rounds: (state) => {
      return state.rounds
    },
    teams: (state) => {
      return state.teams.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
    }
  },
  mutations: {
    addTeam: (state, team) => {
      state.teams.push(team)
    },
    createRound: (state) => {
      let lastRoundId = state.rounds.length > 0 ? state.rounds[state.rounds.length - 1].id : 0
      lastRoundId++
      let round = {
        id: lastRoundId,
        name: '',
        teams: [],
        fixtures: []
      }
      state.rounds.push(round)
    },
    editRound: (state, round) => {
      let rounds = state.rounds
      let index = rounds.indexOf(rounds.find((x) => x.id === round.id))
      rounds.splice(index, 1, round)
      state.rounds = rounds
    },
    deleteRound: (state, round) => {
      let rounds = state.rounds
      let index = rounds.indexOf(rounds.find((x) => x.id === round.id))
      rounds.splice(index, 1)
      state.rounds = rounds
    },
    createFixture: (state, round) => {
      let fixture = {
        id: state.lastFixtureId++,
        matches: []
      }
      round.fixtures.push(fixture)
      this.a.dispatch('createMatch', fixture)
    },
    createMatch: (state, fixture) => {
      let match = {
        home: {},
        away: {},
        score: ''
      }
      fixture.matches.push(match)
    },
    deleteFixture: (state, {roundId, fixture}) => {
      let rounds = state.rounds
      let round = rounds.find((x) => x.id === roundId)
      let fixtureIndex = round.fixtures.indexOf(fixture)
      round.fixtures.splice(fixtureIndex, 1)
      state.rounds = rounds
    }
  },
  actions: {
    addTeam: ({ commit }, team) => {
      commit('addTeam', team)
    },
    createRound: ({ commit }) => {
      commit('createRound')
    },
    editRound: ({ commit }, round) => {
      commit('editRound', round)
    },
    deleteRound: ({ commit }, round) => {
      commit('deleteRound', round)
    },
    createFixture: ({ commit }, round) => {
      commit('createFixture', round)
    },
    createMatch: ({ commit }, fixture) => {
      commit('createMatch', fixture)
    },
    deleteFixture: ({ commit }, payload) => {
      commit('deleteFixture', payload)
    }
  }
})

