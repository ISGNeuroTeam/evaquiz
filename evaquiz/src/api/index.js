import baseUrl from "./baseUrl.js";
import downloadUrl from "./downloadUrl.js";
import uploadFile from "./uploadFile.js";

export default {
  getQuizs(offset = 0, search = null) {
    //получить все квизы
    return baseUrl().get(
      `/qapi/quizs?limit=10&offset=${offset}${
        search ? "&search=" + search : ""
      }`
    );
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
  getAnswer(quizID, offset = 0, search = null) {
    return baseUrl().get(`/qapi/quiz/filled?id=${quizID}
&limit=10&offset=${offset}${search ? "&search=" + search : ""}`);
  },
  getAnswerAll(offset = 0, search = null) {
    return baseUrl().get(
      `/qapi/quiz/filled?limit=10&offset=${offset}${
        search ? "&search=" + search : ""
      }`
    );
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
  getCatalogs(offset = 0, search = null) {
    return baseUrl().get(
      `/qapi/catalogs?limit=10&offset=${offset}${
        search ? "&search=" + search : ""
      }`
    );
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
  },
  getPermissions() {
    return baseUrl().get("/api/user/permissions");
  }
};
