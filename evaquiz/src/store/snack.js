const snack = {
  namespaced: true,
  state: {
    snack: null
  },
  mutations: {
    SET_SNACK(state, payload) {
      state.snack = payload;
    }
  }
};
export default snack;
