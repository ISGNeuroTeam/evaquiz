<template>
  <div>
    <DialogDelete
      v-if="isDeleteModal"
      :dialog="isDeleteModal"
      :quiz="activeItem"
      @close-dialog="closeDeleteModal"
    />
    <DialogAnswers
      v-if="isAnswerModal"
      :dialog="isAnswerModal"
      :quiz="activeItem"
      @close-dialog="closeAnswerModal"
    />
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="quizs.data"
      :items-per-page="50"
    >
      <template v-slot:item.cheeck="{ item }">
        <v-checkbox v-model="item.isMulti" @change="changeCheckbox(item)" />
      </template>

      <template v-slot:item.name="{ item }">
        <span
          class="tv_name"
          :class="item.isMulti ? 'tv_name_isMulti' : null"
          @click="clickAnswer(item)"
        >
          {{ item.name }}
        </span>
      </template>

      <template v-slot:item.mutli="{ item }">
        <span class="tv_multi_number">{{ item.multi }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="clickCopy(item)"> mdi-content-copy</v-icon>
        <v-icon class="mr-2" @click="clickEdit(item)"> mdi-pencil</v-icon>
        <v-icon class="mr-2" @click="clickDelete(item)"> mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import DialogDelete from "../modals/DialogDelete";
import DialogAnswers from "../modals/DialogAnswers";

export default {
  name: "TableView",
  components: {
    DialogDelete,
    DialogAnswers
  },
  data() {
    return {
      headers: [
        {
          text: "",
          sortable: false,
          value: "cheeck",
          width: "60px"
        },
        {
          text: "",
          sortable: false,
          align: "end",
          value: "mutli",
          width: "45px"
        },
        {
          text: "Название",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "150px"
        }
      ],
      isDeleteModal: false,
      isAnswerModal: false,
      activeItem: null
    };
  },
  computed: {
    ...mapGetters({
      quizs: "quiz/filterQuizs"
    })
  },
  methods: {
    ...mapActions({
      getQuestions: "quiz/getQuestions"
    }),

    changeCheckbox(item) {
      if (item.isMulti === true) {
        this.$store.commit("quiz/ADD_MULTICOUNT", item.id);
      }
      if (item.isMulti === false) {
        this.$store.commit("quiz/DELETE_MULTICOUNT", {
          multi: item.multi,
          id: item.id
        });
      }
    },
    clickDelete(item) {
      this.activeItem = item;
      this.isDeleteModal = true;
    },
    closeDeleteModal() {
      this.isDeleteModal = false;
      this.activeItem = null;
    },
    clickAnswer(item) {
      this.activeItem = item;
      this.isAnswerModal = true;
    },
    closeAnswerModal() {
      this.isAnswerModal = false;
      this.activeItem = null;
    },
    clickCopy(item) {
      this.getQuestions(item);
      this.$router.push({
        path: "/qconstructor/copy"
      });
    },
    clickEdit(item) {
      this.getQuestions(item);
      this.$router.push({
        path: "/qconstructor/edit"
      });
    }
  }
};
</script>

<style scoped>
.tv_name_isMulti {
  border-bottom: 2px solid #1976d2;
  font-weight: 600;
}
.tv_name {
  cursor: pointer;
}
.tv_multi_number {
  font-weight: 600;
  color: #1976d2;
}
</style>
