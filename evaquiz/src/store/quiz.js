import Api from "@/api";
import Common from "./common";

const quiz = {
  namespaced: true,
  state: {
    quizs: {},
    quetions: [],
    answers: [],
    filter: null,
    multi: {
      count: 0,
      array: []
    },
    constructorCount: 0,
    editAll: true,
    quizEditor: null
  },
  mutations: {
    SET_QUIZS(state, payload) {
      payload.data.forEach(q => {
        q.multi = null;
      });
      state.quizs = payload;
      state.multi.count = 0;
      state.multi.array = [];
    },
    SET_QUETIONS(state, payload) {
      state.quetions = payload[0];
      if (Number(payload[1]) === Number(0)) {
        state.editAll = false;
      } else {
        state.editAll = true;
      }
    },

    SET_QUIZ_EDITOR(state, payload) {
      state.quizEditor = payload[0][0];
      if (Number(payload[1]) === Number(0)) {
        state.editAll = false;
      } else {
        state.editAll = true;
      }
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
      state.quizs.data.forEach(quiz => {
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

      state.quizs.data.forEach(quiz => {
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
      //TODO:сделать!
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
    },
    qetQuizName(state) {
      if (state.quizEditor) {
        return state.quizEditor.name;
      }
    }
  },
  actions: {
    getQuizs(context, offset) {
      return Api.getQuizs(offset ? offset * 10 : 0).then(data => {
        context.commit("SET_QUIZS", data.data);
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
      Promise.all([Api.getQuestions(quiz.id), Api.getAnswer(quiz.id)]).then(
        data => {
          context.commit("SET_QUETIONS", [
            data[0].data.data,
            data[1].data.count
          ]);
        }
      );
    },

    getQuizEditor(context, quiz) {
      Promise.all([Api.getQuestions(quiz.id), Api.getAnswer(quiz.id)]).then(
        data => {
          context.commit("SET_QUIZ_EDITOR", [
            data[0].data.data,
            data[1].data.count
          ]);
        }
      );
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
        //очищаем мульти
        context.state.multi.count = 0;
        context.state.multi.array = [];
        context.state.quizs.data.forEach(q => {
          q.multi = null;
          q.isMulti = false;
        });

        Api.downloadFromUrl(data.data).then(response => {
          Common.download(
            { name: new Date().toLocaleString("ru-RU"), format: "eva.quiz" },
            response
          );
        });
      });
    },
    importQuetions(context, file) {
      return Api.importQuetions(file);
    }
  }
};
export default quiz;
