import Api from "@/api";

const user = {
  namespaced: true,
  state: {
    permissions: null
  },
  mutations: {
    SET_PERMISSIONS(state, payload) {
      state.permissions = payload;
    }
  },
  getters: {
    isQuizAdmin(state) {
      if (state.permissions === null) {
        return false;
      }

      let _isFind = state.permissions.find(
        item => item === "admin_quiz" || item === "admin_all"
      );

      if (_isFind) {
        return true;
      } else {
        return false;
      }
    }
  },
  actions: {
    getPermissions(context) {
      return Api.getPermissions().then(data => {
        context.commit("SET_PERMISSIONS", data.data.data);
      });
    }
  }
};
export default user;
