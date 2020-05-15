import Api from "@/api";

const quiz = {
  namespaced: true,
  state: {
    quizs: [],
    quetions: [],
    answers: [],
    multi: {
      count: 0,
      array: []
    }
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
    }
  }
};
export default quiz;
