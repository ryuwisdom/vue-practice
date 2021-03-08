<template>
  <div class="main_container">
    <Header />
    <div class="contents">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
html,
template,
body {
  padding: 0;
  margin: 0;
}
.main_container {
  padding: 0;
  margin: 0;
}
</style>
