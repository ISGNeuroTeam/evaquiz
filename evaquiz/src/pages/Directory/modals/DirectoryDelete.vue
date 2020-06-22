<template>
  <v-dialog v-model="dialog" max-width="450" @click:outside="close">
    <v-card>
      <v-card-title class="headline"> Удалить справочник? </v-card-title>
      <v-card-text>
        Вы точно хотите удалить справочник "{{ catalog.name }}" ?
      </v-card-text>
      <v-card-actions>
        <v-btn color="gray" @click="close">Закрыть</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="action">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DirectoryDelete",
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    catalog: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteCatalog: "catalog/deleteCatalog",
      getCatalogs: "catalog/getCatalogs"
    }),
    action() {
      this.deleteCatalog(this.catalog.id)
        .then(() => {
          this.getCatalogs({
            offset: this.$route.params.offset,
            search: this.$route.params.search
          });

          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно удалили " + this.catalog.name
          });

          this.close();
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка при удалении " + this.catalog.name
          });
        });
    },
    close() {
      this.$emit("close-dialog");
    }
  }
};
</script>
