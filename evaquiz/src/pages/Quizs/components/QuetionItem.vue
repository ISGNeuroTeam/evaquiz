<template>
  <div>
    <v-row align="center" class="pr-3">
      <v-col class="d-flex pl-0" cols="11">
        <v-row>
          <v-col cols="8">
            <v-textarea
              ref="text"
              v-model="quetion.text"
              label="Вопрос"
              :auto-grow="true"
              :clearable="true"
              :rows="1"
            />
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="quetion.type"
              label="Тип ответа"
              :items="typesAnswer"
              item-text="text"
              item-value="value"
              @change="changeSelect"
            />
          </v-col>
          <v-col cols="1">
            <v-btn
              :color="quetion.is_sign ? 'primary' : 'gray'"
              icon
              @click="key"
            >
              <v-icon>mdi-key</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="11">
            <v-text-field
              v-if="quetion.is_sign"
              v-model="quetion.label"
              label="Сокращенное название"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col class="d-flex pl-0" cols="1">
        <v-btn icon @click="minus">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-container
      v-if="quetion.type === 'cascade'"
      :key="cid"
      class="qi_container"
    >
      <v-row align="center">
        <CascadeItem
          v-for="child in quetion.childs"
          :key="child.id"
          :child="child"
        />
      </v-row>
      <v-row v-if="quetion.type === 'cascade'" align="center">
        <v-btn icon @click="plusCascadeElement">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CascadeItem from "./CascadeItem";

export default {
  name: "QuetionItem",
  components: { CascadeItem },
  props: {
    quetion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cid: 0,
      typesAnswer: [
        {
          value: "bool",
          text: "Логический"
        },
        {
          value: "text",
          text: "Текст"
        },
        {
          value: "date",
          text: "Дата"
        },
        {
          value: "cascade",
          text: "Каскадный"
        }
      ]
    };
  },
  mounted() {
    this.$refs.text.focus();
  },
  methods: {
    minus() {
      this.$emit("minus", this.quetion.sid);
    },
    key() {
      this.quetion.is_sign = !this.quetion.is_sign;
      this.quetion.label = "";
    },
    changeSelect() {
      if (this.quetion.type === "cascade") {
        this.cid = 0;
        this.quetion.childs = [];
        this.quetion.childs.push({ type: "select", text: "", id: this.cid });
      } else {
        this.quetion.childs = [];
        this.cid = 0;
      }
    },
    plusCascadeElement() {
      this.cid++;
      this.quetion.childs.push({ type: "select", text: "", id: this.cid });
    }
  }
};
</script>
<style scoped>
.qi_container {
  border: 1px solid black;
}
</style>
