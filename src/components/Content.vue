<template>
  <div class="content_container">
    <h1>content</h1>

    <div class="customer">
      <h2>Ship Information</h2>
      <br />

      <tr>
        <td>Ship Id :</td>
        <td>{{ nameOfChild.id }}</td>
      </tr>
      <tr>
        <td>Ship Name :</td>
        <td>{{ nameOfChild.ShipName }}</td>
      </tr>
      <tr>
        <td>Ship City :</td>
        <td>{{ nameOfChild.ShipCity }}</td>
      </tr>

      <tr>
        <td>Ship Region :</td>
        <td>{{ nameOfChild.ShipRegion }}</td>
      </tr>
      <tr>
        <td>Ship Country :</td>
        <td>{{ nameOfChild.ShipCountry }}</td>
      </tr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  // props: ['nameOfChild'],
  props: {
    nameOfChild: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
.content_container {
  tr {
    margin-bottom: 5px;

    td {
      font-size: 15px;
      width: 250px;
      height: 30px;
      border: 1px solid #444444;
      text-align: left;
      line-height: 30px;
      padding-left: 10px;
      td:nth-last-child(odd) {
        border-bottom: none;
      }
    }
  }
}
</style>
