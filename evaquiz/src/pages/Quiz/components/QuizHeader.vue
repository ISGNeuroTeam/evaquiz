<template>
  <v-row align="center">
    <v-col cols="1">
      <div class="qh_switch_wrapper pr-4">
        <v-icon :color="isTableView ? 'primary' : 'gray'"> mdi-table</v-icon>
        <v-switch color="gray" @change="changeView" />
        <v-icon :color="isTableView ? 'gray' : 'primary'">
          mdi-arrange-bring-forward
        </v-icon>
      </div>
    </v-col>
    <v-col cols="1">
      <div v-if="isQuizAdmin">
        <v-icon v-if="multiCount" @click="clickExport">mdi-export</v-icon>
        <v-icon v-else @click="clickImport">mdi-import</v-icon>
      </div>

      <input
        ref="uploader"
        type="file"
        class="d-none"
        accept=".eva.quiz"
        @change="fileChange"
      />
    </v-col>

    <v-col offset="9" cols="1" class="qh_button  text-right pr-8">
      <v-btn v-if="isQuizAdmin" color="primary" @click="create">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "QuizHeader",
  props: {
    isTableView: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      filter: null,
      timeout: null
    };
  },
  computed: {
    ...mapGetters({
      isQuizAdmin: "user/isQuizAdmin"
    }),
    ...mapState({
      multiCount: state => state.quiz.multi.count
    })
  },
  methods: {
    ...mapActions({
      export: "quiz/exportQuetions",
      importFile: "quiz/importQuetions",
      getQuizs: "quiz/getQuizs"
    }),
    create() {
      this.$router.push({
        path: "/qconstructor/create"
      });
    },
    changeView(value) {
      this.$emit("changeTableView", !value);
    },
    clickExport() {
      this.export();
    },
    clickImport() {
      this.$refs.uploader.click();
    },
    fileChange(e) {
      const _file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", _file);
      this.importFile(formData)
        .then(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Чек-листы импортированы"
          });
          this.getQuizs(this.$route.params.offset);
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "При импорте произошла ошибка"
          });
        });
      this.$refs.uploader.value = null;
    }
  }
};
</script>
<style scoped>
.qh_switch_wrapper {
  display: flex;
}
.qh_text_field {
  margin-top: 0;
}
.qh_button {
  padding-top: 25px;
}
</style>
