<template>
  <v-alert type="error" v-show="errorMessage">{{ msg }}</v-alert>
</template>

<script>
export default {
  name: "errorMessage",
  props: {
    msg: String
  }
};
</script>
