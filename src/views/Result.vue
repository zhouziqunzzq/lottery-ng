<template>
  <v-container fluid fill-height>
    <v-layout row align-start justify-center fill-height>
      <v-flex xs12 md8>
        <v-data-table
            :headers="headers"
            :items="lotteryResults"
            rows-per-page-text="每页项数"
            :rows-per-page-items="rowsPerPageItems"
            class="elevation-1"
        >
          <template
              slot="items"
              slot-scope="props"
          >
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td class="text-xs-center">
              {{ props.item.result }}
            </td>
          </template>
          <template slot="no-data">
            <v-alert
                :value="true"
                color="warning"
                icon="warning"
            >
              暂无中奖记录
            </v-alert>
          </template>
          <template
              slot="pageText"
              slot-scope="props"
          >
            第 {{ props.pageStart }} - {{ props.pageStop }} 项，共 {{ props.itemsLength }} 项
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, Getter, Mutation} from 'vuex-class';

  @Component({
    name: 'Result',
    components: {},
  })
  export default class Result extends Vue {
    @State('historyResult') private historyResult!: number[];
    private rowsPerPageItems: any[] = [
      5,
      10,
      25,
      {text: '全部', value: -1},
    ];
    private headers: object[] = [
      {
        text: '编号',
        align: 'center',
        sortable: false,
        value: 'id',
      },
      {
        text: '中奖号码',
        align: 'center',
        sortable: false,
        value: 'result',
      },
    ];

    get lotteryResults(): object[] {
      const rst: object[] = [];
      for (let i = 0; i < this.historyResult.length; i++) {
        rst.push({
          value: false,
          id: i + 1,
          result: this.historyResult[i],
        });
      }
      return rst;
    }
  }
</script>

<style scoped lang="stylus">

</style>
