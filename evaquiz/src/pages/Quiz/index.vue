<template>
  <v-card>
    <QuizHeader
      :is-table-view="isTableView"
      @changeTableView="changeTableView"
    />
    <TableView v-if="isTableView" :offset="offset" />
    <BrickView v-else />
    <v-pagination
      v-model="page"
      :length="countPage"
      :total-visible="7"
      @input="changePagination"
    />
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
      page: 1,
      isTableView: true,
      search: null,
      offset: null
    };
  },
  computed: {
    ...mapState({
      countQuiz: state => state.quiz.quizs.count
    }),
    countPage() {
      if (this.countQuiz) {
        return Math.ceil(this.countQuiz / 10);
      } else {
        return 1;
      }
    }
  },
  mounted() {
    if (this.$route.params.offset) {
      this.page = Number(this.$route.params.offset) + 1;
    } else {
      this.page = 1;
    }
    if (this.$route.params.search) {
      this.search = this.$route.params.search;
    } else {
      this.search = null;
    }
    this.getQuizs({
      offset: this.$route.params.offset
    });
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
    },
    changePagination(page) {
      this.getQuizs(page - 1);

      this.$router.replace({
        path: `/list/${page - 1}`
      });
    }
  }
};
</script>
