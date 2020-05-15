import Vue from "vue";
import Vuex from "vuex";

import quiz from "./quiz";
import snack from "./snack";
import answer from "./answer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    quiz,
    answer,
    snack
  }
});
