import baseUrl from "./baseUrl.js";
import downloadUrl from "./downloadUrl.js";
import uploadFile from "./uploadFile.js";

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
  downloadFromUrl(Url) {
    return downloadUrl().get(Url);
  },
  exportQuetions(multi) {
    return baseUrl().get(`/qapi/quiz/export?ids=${multi}`);
  },
  importQuetions(file) {
    return uploadFile().post("/qapi/quiz/import", file);
  },
  getCatalogs() {
    return baseUrl().get("/qapi/catalogs");
  },
  createCatalog(catalog) {
    return baseUrl().post("/qapi/catalog/create", catalog);
  },
  getCatalog(catalogID) {
    return baseUrl().get(`/qapi/catalog?id=${catalogID}`);
  },
  editCatalog(catalog) {
    return baseUrl().put("/qapi/catalog/edit", catalog);
  },
  deleteCatalog(catalogID) {
    return baseUrl().delete(`/qapi/catalog/delete?id=${catalogID}`);
  }
};
