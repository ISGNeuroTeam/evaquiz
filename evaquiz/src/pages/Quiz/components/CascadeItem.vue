<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-textarea
          ref="cascadeText"
          v-model="child.text"
          label="Ответ"
          :auto-grow="true"
          :clearable="true"
          :rows="1"
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="child.type"
          label="Тип ответа"
          item-text="text"
          item-value="value"
          :items="types"
          @change="changeSelect"
        />
      </v-col>

      <v-col cols="1">
        <v-btn icon>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="child.type === 'cascade'" :key="cid" align="center">
      <CascadeItem
        v-for="c in child.childs"
        :key="c.id"
        :child="c"
        class="ci_container"
      />
    </v-row>
    <v-row v-if="child.type === 'cascade'" align="center">
      <v-btn icon @click="plusCascadeElement">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CascadeItem",
  props: {
    child: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cid: 0,
      types: [
        {
          value: "select",
          text: "Из списка"
        },
        {
          value: "text",
          text: "Текстовый"
        },
        {
          value: "cascade",
          text: "Каскадный"
        }
      ]
    };
  },
  mounted() {
    this.$refs.cascadeText.focus();
  },
  methods: {
    changeSelect() {
      if (this.child.type === "cascade") {
        this.cid = 0;
        this.child.childs = [];
        this.child.childs.push({ type: "select", text: "", id: this.cid });
      } else {
        this.child.childs = [];
        this.cid = 0;
      }
    },
    plusCascadeElement() {
      console.log("plus");
      this.cid++;
      this.child.childs.push({ type: "select", text: "", id: this.cid });
    }
  }
};
</script>
<style scoped>
.ci_container {
  border: 1px solid black;
  margin-left: 10px;
}
</style>
