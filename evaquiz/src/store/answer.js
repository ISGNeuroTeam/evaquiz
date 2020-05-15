import Api from "@/api";

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
      } else {
        _item["sid" + q.sid] =
          q.answer.value.toLowerCase() !== "false"
            ? q.answer.value
            : q.answer.value + ", " + q.answer.description;
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

function quizItems(quizs) {
  let _array = [];
  quizs.forEach(q => {
    _array.push({
      name: q.name,
      quiz_id: q.quiz_id
    });
  });

  let _uniq = [...new Set(_array.map(o => JSON.stringify(o)))].map(s =>
    JSON.parse(s)
  );

  _uniq.forEach(u => {
    const _index = quizs.reverse().findIndex(q => q.quiz_id === u.quiz_id);
    u.fill_date = quizs[_index].fill_date;
    u.filler = quizs[_index].filler;
  });

  return _uniq;
}

function answerByID(answers, id) {
  let _index = answers.findIndex(a => a.id === id);
  if (_index > -1) return answers[_index].questions;
}

function getNameAndFormat(fileUrl) {
  let _startIndex = fileUrl.indexOf("/", 1);
  let _fileReverse = fileUrl
    .slice(_startIndex + 1)
    .split("")
    .reverse()
    .join("");

  _startIndex = _fileReverse.indexOf(".", 1);

  let file = {};

  file.format = _fileReverse
    .slice(0, _startIndex)
    .split("")
    .reverse()
    .join("");

  file.name = _fileReverse
    .slice(_startIndex + 1)
    .split("")
    .reverse()
    .join("");

  return file;
}

function download(file, response) {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.setAttribute("download", file.name + "." + file.format);
  document.body.appendChild(link);
  link.click();
}

const answer = {
  namespaced: true,
  state: {
    quizs: [],
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
    getQuizsItems(state) {
      return quizItems(state.quizs);
    },
    getAllAnswerByID(state) {
      if (state.answers.length && state.answerID) {
        return answerByID(state.answers, state.answerID);
      }
    }
  },
  actions: {
    getAnswer(context, quizID) {
      if (quizID) {
        return Api.getAnswer(quizID).then(data => {
          context.commit("SET_ANSWERS", data.data.data);
        });
      } else {
        return Api.getAnswerAll().then(data => {
          context.commit("SET_QUIZS", data.data.data);
        });
      }
    },

    downloadExel(context) {
      Api.getUrlExel(context.state.answerID).then(data => {
        let _file = getNameAndFormat(data.data);
        Api.downloadExel(data.data).then(response => {
          download(_file, response);
        });
      });
    }
  }
};
export default answer;
