import baseUrl from "./baseUrl.js";
import downloadUrl from "./downloadUrl.js";

export default {
  getQuizs() {
    //получить все квизы
    return baseUrl().get("/qapi/quizs");
  },
  getQuestions(multi) {
    return baseUrl().get(`/qapi/quiz/questions?ids=${multi}`);
  },
  saveAnswers(quiz) {
    //послать ответы по квизу квизID
    return baseUrl().post("/qapi/quiz/filled/save", quiz);
  },
  deleteQuiz(quizID) {
    //удалить квиз по квизID
    return baseUrl().delete(`/qapi/quiz/delete?id=${quizID}`);
  },
  createQuiz(quiz) {
    //создать квиз
    return baseUrl().post("/qapi/quiz/create", quiz);
  },
  editQuiz(quiz) {
    //редактировать
    return baseUrl().put("/qapi/quiz/edit", quiz);
  },
  getAnswer(quizID) {
    return baseUrl().get(`/qapi/quiz/filled?id=${quizID}`);
  },
  getAnswerAll() {
    return baseUrl().get(`/qapi/quiz/filled`);
  },
  getUrlExel(answerID) {
    return baseUrl().get(`/qapi/quiz/filled/export?id=${answerID}`);
  },
  downloadExel(exelUrl) {
    return downloadUrl().get(exelUrl);
  }
};
