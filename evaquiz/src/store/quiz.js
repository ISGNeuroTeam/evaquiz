import Api from "@/api";
import Common from "./common";

const quiz = {
  namespaced: true,
  state: {
    quizs: [],
    quetions: [],
    answers: [],
    filter: null,
    multi: {
      count: 0,
      array: []
    },
    constructorCount: 0
  },
  mutations: {
    SET_QUIZS(state, payload) {
      payload.forEach(q => {
        q.multi = null;
      });
      state.quizs = payload;
      state.multi.count = 0;
      state.multi.array = [];
    },
    SET_QUETIONS(state, payload) {
      state.quetions = payload;
    },
    SET_QUETIONS_MULTI(state, payload) {
      payload.forEach(p => {
        p.questions.forEach(question => {
          question.answer = { value: null, description: null };
        });
      });

      state.quetions = payload;
    },
    PUSH_ANSWER(state, payload) {
      state.answers.push(payload);
    },
    POP_ANSWER(state) {
      state.answers.pop();
    },
    ADD_MULTICOUNT(state, payload) {
      state.multi.count++;
      state.multi.array.push(payload);
      state.quizs.forEach(quiz => {
        if (quiz.id === payload) {
          quiz.multi = state.multi.count;
        }
      });
    },
    DELETE_MULTICOUNT(state, payload) {
      state.multi.count--;
      state.multi.array.splice(payload.id, 1);
      const _index = state.multi.array.indexOf(payload.id);
      if (_index > -1) {
        state.multi.array.splice(_index, 1);
      }

      state.quizs.forEach(quiz => {
        if (quiz.id === payload.id) {
          quiz.multi = null;
        }
        if (quiz.multi > payload.multi) {
          quiz.multi--;
        }
      });
    },
    SET_FILTER(state, payload) {
      state.filter = payload;
    },
    CONSTRUCTORCOUNT_PLUS(state) {
      state.constructorCount++;
    },
    CONSTRUCTORCOUNT_ZERO(state) {
      state.constructorCount = 0;
    }
  },
  getters: {
    filterQuizs(state) {
      if (!state.filter) {
        return state.quizs;
      } else {
        let _filterQuizs = [];
        state.quizs.map(q => {
          if (q.name.toLowerCase().includes(state.filter.toLowerCase())) {
            _filterQuizs.push(q);
          }
        });
        return _filterQuizs;
      }
    }
  },
  actions: {
    getQuizs(context) {
      return Api.getQuizs().then(data => {
        context.commit("SET_QUIZS", data.data.data);
      });
    },

    getQuestionsMulti(context, quiz) {
      return Api.getQuestions(
        quiz.multi ? context.state.multi.array : quiz.id
      ).then(data => {
        context.commit("SET_QUETIONS_MULTI", data.data.data);
      });
    },

    getQuestions(context, quiz) {
      return Api.getQuestions(quiz.id).then(data => {
        context.commit("SET_QUETIONS", data.data.data);
      });
    },

    deleteQuiz(context, quizID) {
      return Api.deleteQuiz(quizID);
    },

    saveAnswers(context, quiz) {
      return Api.saveAnswers(quiz);
    },

    createQuiz(context, quiz) {
      return Api.createQuiz(quiz);
    },

    editQuiz(context, quiz) {
      return Api.editQuiz(quiz);
    },

    exportQuetions(context) {
      return Api.exportQuetions(context.state.multi.array).then(data => {
        let _file = Common.getNameAndFormat(data.data);
        _file = Common.getNameAndFormat(_file.name);
        Api.downloadFromUrl(data.data).then(response => {
          Common.download({ name: _file.name, format: "eva.quiz" }, response);
        });
      });
    },
    importQuetions(context, file) {
      return Api.importQuetions(file);
    }
  }
};
export default quiz;
