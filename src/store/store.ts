import Vue from 'vue';
import Vuex from 'vuex';
import LotterySettings from '../interfaces/LotterySettings';
import * as types from './mutation-types';

Vue.use(Vuex);

interface State {
  settings: LotterySettings;
  historyResult: number[];
}

const initState: State = {
  settings: {
    minID: 1,
    maxID: 100,
  },
  historyResult: [],
};

const mutations = {
  [types.SAVE_SETTINGS](state: State, newSettings: LotterySettings) {
    state.settings.minID = newSettings.minID;
    state.settings.maxID = newSettings.maxID;
  },
  [types.SAVE_RESULT](state: State, result: number) {
    state.historyResult.push(result);
  },
  [types.CLEAR_HISTORY_RESULT](state: State) {
    state.historyResult = [];
  },
};

const getters = {
  disableLottery: (state: State) => {
    return state.historyResult.length === (state.settings.maxID - state.settings.minID + 1);
  },
};

export default new Vuex.Store({
  state: initState,
  mutations,
  getters,
  actions: {},
});
