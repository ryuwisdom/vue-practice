<template>
  <div class="home_container">
    <div class="list_container">
      <h1>Project List</h1>
      <input
        class="filter_side"
        type="text"
        v-model="name"
        placeholder="Filter by name"
      />

      <table id="list" class="list">
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
          <!-- 캐싱으로 성능개선 -->
          <tr v-for="(item, id) in filterCoinByName" :key="item.project_id">
            <td>{{ id }}</td>
            <td><img :src="item.logo" alt="logo" /></td>
            <td>{{ item.name }}</td>
            <td>{{ item.slug }}</td>
            <td>{{ item.is_verified ? 'O' : 'X' }}</td>
            <!-- numberWithCommas 메서드를 js에서 모두 처리 -> 예시 찾아보기, 코인별 통화단위 split 고민해보기 -->
            <!-- 통화단위 구분 함수 소수점 이전 이후 나누어서 -->
            <td>{{ item.current_price.USD }}</td>
            <td>{{ item.market_cap.USD }}</td>
            <router-link :to="`/home/${item.name}`" exact>
              {{ item.name }}
            </router-link>
          </tr>

          <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
            <!-- slot 학습 -->
            <!-- style inline 지양 -->
            <div
              slot="no-more"
              style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
            >
              목록의 끝입니다 :)
            </div>
          </infinite-loading>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    InfiniteLoading,
  },

  computed: {
    filterCoinByName: function() {
      // 이전 코드랑 비교
      return this.info.filter((item) => item.name.includes(this.name));
    },
  },
  // 애플리케이션에서 사용할 데이터 (대부분 객체 또는 배열 )
  data() {
    return {
      info: [],
      page: 0,
      name: '',
    };
  },
  // 애플리케이션에서 사용할 메서드
  methods: {
    async infiniteHandler($state) {
      // EACH_LEN 변수명 고려
      // 변수명은 명사형 메서드는 동사형 지향
      //requestingItemLength
      const willFetchItemLength = 30;
      const response = await axios.get('https://api.xangle.io/project/list', {
        params: {
          page: this.page,
          items_per_page: 30,
        },
      });
      setTimeout(() => {
        // if 중첩 줄이기, asyc/await
        if (response.data.length) {
          response.data.map((item) => {
            item.current_price.USD = this.numberWithCommas(
              item.current_price.USD
            );
            item.market_cap.USD = this.numberWithCommas(item.market_cap.USD);
            return item;
          });

          this.info = this.info.concat(response.data);
          $state.loaded();
          this.page += 1;
          console.log('after', this.info.length, this.page);
          // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면
          if (response.data.length / willFetchItemLength < 1) {
            $state.complete();
          }
        } else {
          // 끝 지정(No more data)
          $state.complete();
        }
      }, 1000);
    },

    // 에러 처리학;

    numberWithCommas(item) {
      console.log('+_+');
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },

  mounted() {},
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

    .filter_side {
      width: 300px;
      height: 25px;
      border-radius: 4px;
      border: 0.6px solid gray;
    }

    input::placeholder {
      padding-left: 5px;
      letter-spacing: 1px;
    }
    .list {
      padding-top: 50px;

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
}
</style>
