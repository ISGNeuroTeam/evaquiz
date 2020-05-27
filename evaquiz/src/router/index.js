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
      name: "LIST",
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
      name: "CONSTRUCTOR",
      children: [
        {
          path: ":type"
        }
      ]
    },
    {
      path: "/generator/:id",
      name: "GENERATOR",
      component: () => import("@/pages/Generator")
    },
    {
      path: "/directory",
      name: "DIRECTORY",
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
      name: "FILLEDS",
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
      name: "FILLED",
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
