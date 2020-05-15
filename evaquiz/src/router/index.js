import Vue from "vue";
import Router from "vue-router";
import QuizsPage from "@/pages/Quizs";
import InfoPage from "@/pages/Info";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/quizs"
    },
    {
      path: "/quizs",
      component: QuizsPage
    },
    {
      path: "/info",
      component: InfoPage,
      children: [
        {
          path: ":id",
          component: InfoPage
        }
      ]
    }
  ]
});
