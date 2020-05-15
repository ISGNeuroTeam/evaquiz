import Vue from "vue";
import Router from "vue-router";
import QuizPage from "@/pages/Quiz";
import InfoPage from "@/pages/Info";
import QuizConstructorPage from "@/pages/QuizConstructor";
import DirectoryPage from "@/pages/Directory";
import GeneratorPage from "@/pages/Generator";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/quiz",
      component: QuizPage
    },
    {
      path: "/qconstructor",
      component: QuizConstructorPage,
      children: [
        {
          path: ":type"
        }
      ]
    },
    {
      path: "/generator/:id",
      component: GeneratorPage
    },
    {
      path: "/directory",
      component: DirectoryPage
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
