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
  base: "/quiz",
  routes: [
    {
      path: "/list",
      component: QuizPage,
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
      component: DirectoryPage,
      children: [
        {
          path: ":offset/:search"
        }
      ]
    },
    {
      path: "/filleds",
      component: InfoPage,
      children: [
        {
          path: ":offset/:search"
        }
      ]
    },
    {
      path: "/filled/:id",
      component: InfoPage,
      children: [
        {
          path: ":offset/:search"
        }
      ]
    }
  ]
});
