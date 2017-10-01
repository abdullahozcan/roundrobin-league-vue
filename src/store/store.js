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
      { id: 16, name: 'Paris Saint-Germain' }, { id: 17, name: 'Monaco' }
    ]
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
    }
  },
  actions: {
    createRound: ({ commit }) => {
      commit('createRound')
    },
    editRound: ({ commit }, round) => {
      commit('editRound', round)
    }
  }
})

