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
      component: QuizPage,
      children: [
        {
          path: ":offset/:search"
        }
      ]
    },
    {
      path: "/quiz/qconstructor",
      component: QuizConstructorPage,
      children: [
        {
          path: ":type"
        }
      ]
    },
    {
      path: "/quiz/generator/:id",
      component: GeneratorPage
    },
    {
      path: "/quiz/directory",
      component: DirectoryPage,
      children: [
        {
          path: ":offset",
          children: [
            {
              path: ":search"
            }
          ]
        }
      ]
    },
    {
      path: "/quiz/filleds",
      component: InfoPage,
      children: [
        {
          path: ":offset",
          children: [
            {
              path: ":search"
            }
          ]
        }
      ]
    },
    {
      path: "/quiz/filled/:id",
      component: InfoPage,
      children: [
        {
          path: ":offset",
          children: [
            {
              path: ":search"
            }
          ]
        }
      ]
    }
  ]
});
