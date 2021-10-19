import Vue from 'vue'
import Vuex from 'vuex'
import { fakeData } from '@/store/fake-data'
import { Athlete, Entry, Sport, Team } from './types'
import { keyBy } from 'lodash'

export interface OlympicsStore {
  athletes: Athlete[]
  entries: Entry[]
  sports: Sport[]
  teams: Team[]
}

Vue.use(Vuex)
const { teams, athletes, sports, entries } = fakeData

export default new Vuex.Store<OlympicsStore>({
  state: {
    athletes,
    entries,
    sports,
    teams
  },
  getters: {
    athletesBySlug: (state) => keyBy(state.athletes, 'slug'),
    athletesById: (_, getters) => getters.athletesBySlug, // alias
    entriesBySlug: (state) => keyBy(state.entries, 'slug'),
    entriesById: (_, getters) => getters.entrysBySlug, // alias
    sportsBySlug: (state) => keyBy(state.sports, 'slug'),
    sportsById: (_, getters) => getters.sportsBySlug, // alias
    teamsBySlug: (state) => keyBy(state.teams, 'slug'),
    teamsById: (_, getters) => getters.teamsBySlug // alias
  },
  mutations: {
    'athletes/push': (state, athlete: Athlete) => {
      const index = state.athletes.findIndex(a => a.slug === athlete.slug)
      if (index !== -1) { state.athletes.splice(index, 1, athlete) } else { state.athletes.push(athlete) }
    },
    'entries/push': (state, entry: Entry) => {
      const index = state.entries.findIndex(e => e.slug === entry.slug)
      if (index !== -1) { state.entries.splice(index, 1, entry) } else { state.entries.push(entry) }
    },
    'sports/push': (state, sport: Sport) => {
      const index = state.sports.findIndex(s => s.slug === sport.slug)
      if (index !== -1) { state.sports.splice(index, 1, sport) } else { state.sports.push(sport) }
    },
    'teams/push': (state, team: Team) => {
      const index = state.teams.findIndex(t => t.slug === team.slug)
      if (index !== -1) { state.teams.splice(index, 1, team) } else { state.teams.push(team) }
    }
  },
  actions: {
    'create-athlete': ({ commit }, athlete: Athlete) => commit('athletes/push', athlete),
    'create-entry': ({ commit }, entry: Entry) => commit('entries/push', entry),
    'create-sport': ({ commit }, sport: Sport) => commit('sports/push', sport),
    'create-team': ({ commit }, team: Team) => commit('teams/push', team)
  }
})
