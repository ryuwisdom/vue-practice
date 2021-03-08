<template>
  <div class="home_container">
    <div class="list_container">
      <h1>Customer List</h1>
      <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false">
        <Content :nameOfChild="modalContentList" />
      </ModalView>

      <ul>
        <li v-for="item in list" :key="item.id">
          {{ item.ShipName }}
          <button @click="handleClickButton(item.id)">
            open
          </button>

          <!-- <router-link :to="`/home/${id}`">{{ id }}</router-link> -->
        </li>
      </ul>
    </div>
  </div>

  <!-- <h1>Bitcoin Price Index</h1> -->
  <!-- <MainView /> -->
  <!-- <div id="app" v-for="currency in info" :key="currency" class="currency">
      {{ (currency.code, currency.description) }}:
      <span class="lighten">
        <router-link :to="`home/${code}`">
          <span v-html="currency.symbol"
            >{{ currency.symbol }}
          </span></router-link
        >
      </span>
    </div> -->
</template>

<script>
import ModalView from '../src/components/ModalView.vue';
import Content from '../src/components/Content.vue';
import axios from 'axios';
import mockData from '../src/api/mockData.js';

export default {
  name: 'App',
  components: {
    ModalView,
    Content,
  },
  // 함수로 인해 추출되는 데이터, (computed로 산출된 데이터는 구조가 달라진다? )
  // 값이 또 변경되기 전의 값을 캐싱한다.
  computed: {
    // list: () => mockData.fetch(),
    modalContentList() {
      return this.list.find((item) => this.selectedId === item.id);
    },
  },
  // 애플리케이션에서 사용할 데이터 (대부분 객체 또는 배열 )
  data() {
    return {
      isModalViewed: false,
      list: mockData.fetch(),
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
  },

  mounted() {
    axios;
    // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    // .get('https://jsonplaceholder.typicode.com/posts')
    // .then((response) => ((this.info = response.data), console.log(response)))
    // .catch((error) => console.log(error));
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
