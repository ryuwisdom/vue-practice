<template>
  <div class="about_container">
    <div class="detail" v-if="item" key="detail">
      <!-- <h1>item infomation</h1>
      <br />
      <tr>
        <td> name :</td>
        <td>{{ item.name }}</td>
        <td>Ship slug :</td>
        <td>{{ item.slug }}</td>
   
      </tr> -->
    </div>

    <h1>about</h1>
    <ul>
      <li v-for="{ id, name } in list" :key="id">
        <router-link :to="`/home/${id}`">{{ name }}</router-link>
      </li>
    </ul>
    <!-- <MainView /> -->
  </div>
</template>

<script>
// import MainView from '@/components/MainView.vue';
import mockData from '../src/api/mockData.js';

export default {
  components: {
    // MainView,
  },
  props: {
    id: Number,
  },
  // data() {
  //   return {
  //     item: null,
  //   };
  // },
  data() {
    return {
      list: mockData.fetch(),
    };
    // return {
    //   item: null,
    //   list:
    //   axios
    //   .get('https://api.xangle.io/project/list')
    //   .then(
    //     (response) => ((this.info = response.data), console.log(response.data))
    //   )
    //   .catch((error) => console.log(error))

    // };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.item = vm.list.find((item) => Number(to.params.id) === item.id);
    });
  },

  watch: {
    id: {
      handler() {
        mockData.asyncFind(this.id, (item) => {
          this.item = item;
        });
      },
      // 네스트된 객체도 감시할지
      deep: true,
      // 처음 값을 읽어들이는 시점에도 호출할지
      immediate: true,

      //deep과 immediate를 지정하면 배열 요소 내부의 속성이 변경되도 watch안에 메서드 호출

      //created에서 watch 등록할때는 ()=>{$whtch(){~~~~}}

      // 입력방식 감시, 조건 사용하는 상품 검색 등
    },
  },
};
</script>

<style lang="scss">
.home_container {
  padding-top: 10px;
}
</style>
