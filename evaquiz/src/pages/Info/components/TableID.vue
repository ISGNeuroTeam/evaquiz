<template>
  <div>
    <DialogFullAnswer
      :dialog="dialog"
      :fill-date="fillDate"
      @close-dialog="closeDialog"
    />
    <v-data-table
      multi-sort
      :headers="headers"
      hide-default-footer
      :items="items"
      :items-per-page="50"
      @click:row="clickRow"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click.stop="clickRow(item)">
          mdi-magnify
        </v-icon>
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
import { mapGetters, mapState, mapActions } from "vuex";
import DialogFullAnswer from "../modals/DialogFullAnswer";

export default {
  name: "TableID",
  components: {
    DialogFullAnswer
  },
  data() {
    return {
      page: 1,
      dialog: false,
      fillDate: null
    };
  },
  computed: {
    ...mapGetters({
      headers: "answer/getAnswersHeaders",
      items: "answer/getAnswersItems"
    }),
    ...mapState({
      answersCount: state => state.answer.answers.count
    }),
    countPage() {
      if (this.answersCount) {
        return Math.ceil(this.answersCount / 10);
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
      this.fillDate = value.fill_date;
      this.$store.commit("answer/SET_ANSWER_ID", value.id);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
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
