<template>
  <div v-if="quizs">
    <v-data-table
      multi-sort
      :headers="headers"
      hide-default-footer
      :items="quizs.data"
      :items-per-page="50"
      @click:row="clickRow"
    >
      <template v-slot:item.fill_date="{ item }">
        <p>{{ formatDate(item.fill_date) }}</p>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="countPage"
      :total-visible="7"
      @input="changePagination"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "TableAll",
  data() {
    return {
      page: 1,
      headers: [
        {
          text: "Название",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "Последнее заполнение",
          sortable: true,
          value: "fill_date"
        },
        {
          text: "Последний заполняющий",
          sortable: true,
          value: "filler"
        }
      ]
    };
  },

  computed: {
    ...mapState({
      quizs: state => state.answer.quizs
    }),
    countPage() {
      if (this.quizs) {
        return Math.ceil(this.quizs.count / 10);
      } else {
        return 1;
      }
    }
  },
  methods: {
    ...mapActions({
      getAnswer: "answer/getAnswer"
    }),
    clickRow(value) {
      this.$router.push({ path: "/filled/" + value.quiz_id });
    },
    formatDate(date) {
      return new Date(date).toLocaleString("ru-RU");
    },
    changePagination(page) {
      this.getAnswer({
        id: this.$route.params.id,
        offset: page - 1
      });
    }
  }
};
</script>
