import Api from "@/api";
import Common from "./common";

function items(answers) {
  let _items = [];
  answers.forEach(a => {
    let _item = {
      fill_date: new Date(a.fill_date).toLocaleString("ru-RU")
    };
    _item.id = a.id;
    _item.filler = a.filler;

    a.questions.forEach(q => {
      if (q.type === "date") {
        _item["sid" + q.sid] = new Date(q.answer.value).toLocaleDateString(
          "ru-RU"
        );
      }
      if (q.type === "multi") {
        if (q.answer.value.toLowerCase() === "yes") {
          _item["sid" + q.sid] = "Да";
        }
        if (q.answer.value.toLowerCase() === "no") {
          _item["sid" + q.sid] = "Нет, " + q.answer.description;
        }
        if (q.answer.value.toLowerCase() === "skip") {
          _item["sid" + q.sid] = "Не применимо";
        }
      }
      if (q.type !== "date" && q.type !== "multi") {
        _item["sid" + q.sid] = q.answer.value;
      }
    });
    _items.push(_item);
  });
  return _items;
}

function headers(answers) {
  let _headers = [
    {
      text: "Дата заполнения",
      value: "fill_date"
    },
    {
      text: "Заполняющий",
      value: "filler"
    }
  ];
  answers[0].questions.forEach(q => {
    if (q.is_sign) {
      _headers.push({
        text: q.label,
        value: "sid" + q.sid
      });
    }
  });
  _headers.push({
    text: "",
    value: "actions"
  });
  return _headers;
}

function answerByID(answers, id) {
  let _index = answers.findIndex(a => a.id === id);
  if (_index > -1) {
    return answers[_index].questions;
  }
}

const answer = {
  namespaced: true,
  state: {
    quizs: {},
    answers: [],
    answerID: null
  },
  mutations: {
    SET_QUIZS(state, payload) {
      state.quizs = payload;
    },
    SET_ANSWERS(state, payload) {
      state.answers = payload;
    },
    SET_ANSWER_ID(state, payload) {
      state.answerID = payload;
    }
  },
  getters: {
    getAnswersName(state) {
      if (state.answers.length) {
        return state.answers[0].name.trim();
      }
    },
    getAnswersItems(state) {
      if (state.answers.length) {
        return items(state.answers);
      }
    },
    getAnswersHeaders(state) {
      if (state.answers.length) {
        return headers(state.answers);
      }
    },
    getAllAnswerByID(state) {
      if (state.answers.length && state.answerID) {
        return answerByID(state.answers, state.answerID);
      }
    }
  },
  actions: {
    getAnswer(context, param) {
      if (param.id) {
        return Api.getAnswer(
          param.id,
          param.offset ? param.offset * 10 : 0
        ).then(data => {
          context.commit("SET_ANSWERS", data.data.data);
        });
      } else {
        return Api.getAnswerAll(param.offset ? param.offset * 10 : 0).then(
          data => {
            context.commit("SET_QUIZS", data.data);
          }
        );
      }
    },

    downloadExel(context) {
      Api.getUrlExel(context.state.answerID).then(data => {
        let _file = Common.getNameAndFormat(data.data);
        Api.downloadFromUrl(data.data).then(response => {
          Common.download(_file, response);
        });
      });
    }
  }
};
export default answer;
