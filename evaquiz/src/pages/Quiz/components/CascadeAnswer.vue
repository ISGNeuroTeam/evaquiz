<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <v-select
          v-model="selectValue"
          :items="childs"
          item-text="text"
          return-object
          label="Выберите ответ"
          @change="changeValue"
        />
      </v-col>
    </v-row>
    <v-row v-if="selectValue && selectValue.type === 'text'" align="center">
      <v-col cols="12">
        <v-textarea
          label="Ответ"
          :auto-grow="true"
          :clearable="true"
          :rows="1"
          @input="inputValue"
        />
      </v-col>
    </v-row>
    <v-row v-if="selectValue && selectValue.type === 'cascade'" align="center">
      <v-col cols="12">
        <CascadeAnswer
          :childs="selectValue.childs"
          :prev-text="selectText"
          @end-cascade="endCascade"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CascadeAnswer",
  props: {
    childs: {
      type: Array,
      required: true
    },
    prevText: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      selectValue: null,
      timeout: null,
      selectText: ""
    };
  },
  methods: {
    changeValue() {
      if (this.selectValue.type !== "text") {
        this.selectText = this.prevText
          ? this.prevText + "-->" + this.selectValue.text
          : this.selectValue.text;
        this.$emit("end-cascade", this.selectText);
      }
    },
    inputValue(val) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.selectText = this.prevText ? this.prevText + "-->" + val : val;
        this.$emit("end-cascade", this.selectText);
      }, 1000);
    },
    endCascade(val) {
      this.$emit("end-cascade", val);
    }
  }
};
</script>
