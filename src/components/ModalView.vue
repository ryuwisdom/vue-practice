<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card"><slot /></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;

  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.5;
    z-index: 5;
    background-color: black;
  }
  .modal-card {
    position: relative;
    max-width: 80%;
    margin: auto;
    margin-top: 30px;
    padding: 20px;
    background-color: white;
    min-height: 500px;
    z-index: 10;
    opacity: 1;
  }
}
</style>
