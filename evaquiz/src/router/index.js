import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/quiz",
  routes: [
    {
      path: "/list",
      component: () => import("@/pages/Quiz"),
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
      component: () => import("@/pages/QuizConstructor"),
      children: [
        {
          path: ":type"
        }
      ]
    },
    {
      path: "/generator/:id",
      component: () => import("@/pages/Generator")
    },
    {
      path: "/directory",
      component: () => import("@/pages/Directory"),
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
      path: "/filleds",
      component: () => import("@/pages/Info"),
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
      path: "/filled/:id",
      component: () => import("@/pages/Info"),
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
