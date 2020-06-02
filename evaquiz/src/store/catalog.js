import Api from "@/api";

function catalogItemsContent(content) {
  return content.split("\n");
}

const catalog = {
  namespaced: true,
  state: {
    catalogs: {},
    catalog: {}
  },
  mutations: {
    SET_CATALOGS(state, payload) {
      state.catalogs = payload;
    },
    SET_CATALOG(state, payload) {
      state.catalog = payload;
    }
  },
  getters: {
    catalogItems(state) {
      if ("content" in state.catalog) {
        return catalogItemsContent(state.catalog.content);
      }
    }
  },
  actions: {
    getCatalogs(context, params) {
      return Api.getCatalogs(
        params.offset ? params.offset * 10 : 0,
        params.search ? params.search : ""
      ).then(data => {
        context.commit("SET_CATALOGS", data.data);
      });
    },
    createCatalog(context, catalog) {
      return Api.createCatalog(catalog);
    },
    getCatalog(context, catalogID) {
      return Api.getCatalog(catalogID).then(data => {
        context.commit("SET_CATALOG", data.data.data);
      });
    },
    deleteCatalog(context, catalogID) {
      return Api.deleteCatalog(catalogID);
    },
    editCatalog(context, catalog) {
      return Api.editCatalog(catalog);
    }
  }
};
export default catalog;
