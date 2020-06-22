<template>
  <v-dialog v-model="dialog" persistent max-width="650" class="du_dialog">
    <v-card>
      <v-card-title>
        {{ catalogID ? "Изменить справочник" : "Создать новый справочник" }}
      </v-card-title>

      <v-card-text>
        <v-row align="center">
          <v-col cols="12">
            <v-textarea
              v-model="element.name"
              label="Название справочника"
              :auto-grow="true"
              :clearable="true"
              :rows="1"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12 pt-0 pb-0">
            <div>
              Содержимое
              <small>(новый элемент - новая сторока)</small>
            </div>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12 pt-0">
            <v-textarea
              v-model="element.content"
              class="du_area"
              :clearable="true"
              no-resize
              auto-grow
              :rows="3"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn color="gray" @click="close">Закрыть</v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled="isDisabled" @click="action">
          {{ catalogID ? "Изменить" : "Создать" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "DirectoryUpdate",
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    catalogID: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      directory: {
        name: null,
        content: null
      }
    };
  },
  computed: {
    ...mapState({
      catalog: state => state.catalog.catalog
    }),
    element() {
      if (this.catalogID) {
        return this.catalog;
      } else {
        return this.directory;
      }
    },
    isDisabled() {
      if (this.element.name && this.element.content) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    if (this.catalogID) {
      this.getCatalog(this.catalogID);
    }
  },

  methods: {
    ...mapActions({
      createCatalog: "catalog/createCatalog",
      editCatalog: "catalog/editCatalog",
      getCatalogs: "catalog/getCatalogs",
      getCatalog: "catalog/getCatalog"
    }),
    create() {
      this.createCatalog(this.element)
        .then(() => {
          this.getCatalogs({
            offset: this.$route.params.offset,
            search: this.$route.params.search
          });

          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно создали " + this.element.name
          });

          this.close();
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка создания справочника"
          });
        });
    },
    edit() {
      this.editCatalog(this.element)
        .then(() => {
          this.getCatalogs({
            offset: this.$route.params.offset,
            search: this.$route.params.search
          });

          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно изменили " + this.element.name
          });

          this.close();
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка редактирования справочника"
          });
        });
    },
    action() {
      if (this.catalogID) {
        this.edit();
      } else {
        this.create();
      }
    },
    close() {
      this.$emit("close-dialog");
    }
  }
};
</script>
<style scoped>
.du_dialog {
  overflow: hidden;
}
.du_area {
  max-height: 130px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0px;
}
</style>
