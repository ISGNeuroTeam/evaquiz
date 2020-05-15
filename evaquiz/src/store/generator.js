import Api from "@/api";

const generator = {
  namespaced: true,
  state: {
    questions: {},
    catalog: {}
  },
  mutations: {
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_CATALOG(state, payload) {
      state.catalog = payload;
    }
  },

  actions: {
    getQuestions(context, quizID) {
      return Api.getQuestions(quizID).then(data => {
        context.commit("SET_QUESTIONS", data.data.data[0]);
      });
    },
    getCatalog(context, catalogID) {
      return Api.getCatalog(catalogID).then(data => {
        context.commit("SET_CATALOG", data.data.data);
      });
    },
    saveAnswer(context, quiz) {
      return Api.saveAnswers(quiz);
    }
  }
};
export default generator;
