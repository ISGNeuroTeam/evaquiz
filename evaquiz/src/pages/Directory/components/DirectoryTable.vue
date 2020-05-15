<template>
  <div>
    <DirectoryDelete
      v-if="isDeleteModal"
      :dialog="isDeleteModal"
      :catalog="activeItem"
      @close-dialog="closeDeleteModal"
    />
    <DirectoryUpdate
      v-if="isEditModal"
      :dialog="isEditModal"
      :catalog-i-d="activeItem.id"
      @close-dialog="closeEditModal"
    />
    <v-data-table
      :headers="headers"
      :search="search"
      :items="catalogs"
      hide-default-footer
      :items-per-page="100"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="clickEdit(item)"> mdi-pencil</v-icon>
        <v-icon class="mr-2" @click="clickDelete(item)"> mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DirectoryDelete from "../modals/DirectoryDelete";
import DirectoryUpdate from "../modals/DirectoryUpdate";

export default {
  name: "DirectoryTable",
  components: {
    DirectoryDelete,
    DirectoryUpdate
  },
  props: {
    search: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      headers: [
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
      isEditModal: false,
      activeItem: null
    };
  },
  computed: {
    ...mapState({
      catalogs: state => state.catalog.catalogs
    })
  },
  methods: {
    clickDelete(item) {
      this.activeItem = item;
      this.isDeleteModal = true;
    },
    closeDeleteModal() {
      this.isDeleteModal = false;
      this.activeItem = null;
    },
    clickEdit(item) {
      this.activeItem = item;
      this.isEditModal = true;
    },
    closeEditModal() {
      this.isEditModal = false;
      this.activeItem = null;
    }
  }
};
</script>
