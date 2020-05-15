import Vue from "vue";
import Vuex from "vuex";

import quiz from "./quiz";
import snack from "./snack";
import answer from "./answer";
import catalog from "./catalog";
import generator from "./generator";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    quiz,
    answer,
    snack,
    catalog,
    generator
  }
});
