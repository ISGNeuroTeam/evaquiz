<template>
  <v-card>
    <QuizHeader
      :is-table-view="isTableView"
      @changeTableView="changeTableView"
    />
    <TableView v-if="isTableView" />
    <BrickView v-else />
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import QuizHeader from "./components/QuizHeader";
import TableView from "./components/TableView";
import BrickView from "./components/BrickView";

export default {
  name: "QuizsPage",
  components: {
    QuizHeader,
    TableView,
    BrickView
  },
  data() {
    return {
      isTableView: true
    };
  },
  mounted() {
    this.getQuizs();
  },
  beforeDestroy() {
    this.$store.commit("quiz/SET_FILTER", null);
  },
  methods: {
    ...mapActions({
      getQuizs: "quiz/getQuizs"
    }),
    changeTableView(value) {
      this.isTableView = value;
    }
  }
};
</script>
