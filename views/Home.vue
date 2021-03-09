<template>
  <div class="home_container">
    <div class="list_container">
      <h1>Project List</h1>
      <About :nameOfChild="modalContentList" />
      <!-- <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false">
        <Content :nameOfChild="modalContentList" />
      </ModalView> -->

      <table id="list">
        <thead>
          <tr>
            <th>No</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Verified</th>
            <th>Current Price(USD)</th>
            <th>Market Cap(USD)</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody id="items">
          <tr v-for="(item, id) in info" :key="id">
            <td>{{ id }}</td>
            <td><img :src="item.logo" alt="logo" /></td>
            <td>{{ item.name }}</td>
            <td>{{ item.slug }}</td>
            <td>{{ item.is_verified ? 'O' : 'X' }}</td>
            <td>{{ `${numberWithCommas(item.current_price.USD)}` }}</td>
            <td>{{ `${numberWithCommas(item.market_cap.USD)}` }}</td>
            <router-link :to="`/home/${item.id}`">{{ item.id }}</router-link>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import ModalView from '../src/components/ModalView.vue';
// import Content from '../src/components/Content.vue';
// import About from '../src/components/About';
import axios from 'axios';
// import mockData from '../src/api/mockData.js';

export default {
  name: 'App',
  components: {
    // About,
    // ModalView,
    // Content,
  },
  // 함수로 인해 추출되는 데이터, (computed로 산출된 데이터는 구조가 달라진다? )
  // 값이 또 변경되기 전의 값을 캐싱한다.
  computed: {
    // list: () => mockData.fetch(),
    modalContentList() {
      return this.info.find((item) => this.selectedId === item.id);
    },
  },
  // 애플리케이션에서 사용할 데이터 (대부분 객체 또는 배열 )
  data() {
    return {
      isModalViewed: false,
      selectedId: -1,
      info: [],
    };
  },
  // 애플리케이션에서 사용할 메서드
  methods: {
    // 버튼 클릭시 버튼에 명시된 메서드 실행
    handleClickButton(id) {
      this.isModalViewed = true;
      this.selectedId = id;
    },
    numberWithCommas(item) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },

  mounted() {
    axios
      .get('https://api.xangle.io/project/list')
      .then(
        (response) => ((this.info = response.data), console.log(response.data))
      )
      .catch((error) => console.log(error));
  },
  // filters: {
  //   currencydecimal(value) {
  //     return value.toFixed(2);
  //   },
  // },
};
</script>

<style lang="scss">
.home_container {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .list_container {
    width: 560px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ul {
      width: 560px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      li {
        width: 450px;
        padding: 10px;
        list-style: none;
        border: 1px solid #444444;
        position: relative;
        line-height: 20px;
        /* display: flex; */
        button {
          position: absolute;
          right: 10px;
          bottom: 5px;
          z-index: 0;
          height: 30px;
          width: 50px;
          border-radius: 10%;
          border: none;
          transition-duration: 0.8s;
          transform: rotateX(14deg);
          background-color: #bc4e9c;
          opacity: 0.75;
          letter-spacing: 1px;
          cursor: pointer;
          &:hover {
            transform: scale(0.8);
            box-shadow: none;
          }
        }
      }
    }
  }
}
</style>
