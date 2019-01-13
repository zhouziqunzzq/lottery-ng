<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center fill-height wrap>
      <v-flex xs12 class="text-xs-center">
        <h1 :style="{fontSize: fontSize + fontUnit}"
            class="no-select transition-ease-in-out">
          {{nowResult}}
        </h1>
      </v-flex>
      <v-snackbar
          v-model="disableLotterySnackbar"
          bottom
          color="info"
      >
        抽奖结束，可前往“设置 - 清空中奖记录”重置抽奖系统
        <v-btn
            color="white"
            flat
            @click="disableLotterySnackbar = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-layout>

    <v-layout
        column
        align-center
        justify-center
        class="toolbar">
      <v-btn
          fab
          color="blue"
          @click="toggle"
          v-bind="{disabled: disableLottery}"
          class="text-white"
      >
        {{ctlBtnText}}
      </v-btn>
      <v-btn
          fab
          color="blue"
          @click="fontSize += 1"
          class="text-white"
      >
        <v-icon>zoom_in</v-icon>
      </v-btn>
      <v-btn
          fab
          color="blue"
          @click="fontSize = fontSize - 1 < 1 ? 1 : fontSize - 1"
          class="text-white"
      >
        <v-icon>zoom_out</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import LotterySettings from '@/interfaces/LotterySettings';
  import {State, Getter, Mutation} from 'vuex-class';
  import * as types from '@/store/mutation-types';

  @Component({
    name: 'Home',
    components: {},
  })
  export default class Home extends Vue {
    @State('settings') private globalSettings!: LotterySettings;
    @State('historyResult') private historyResult!: number[];
    @Getter('disableLottery') private disableLottery!: boolean;
    @Mutation(types.SAVE_RESULT) private mutationSaveResult!: any;
    private fontSize: number = 4;
    private fontUnit: string = 'em';
    private isRunning: boolean = false;
    private nowResult: number = 0;
    private intervalID: any;
    private disableLotterySnackbar: boolean = false;

    get ctlBtnText(): string {
      if (!this.isRunning) {
        return '开始';
      } else {
        return '停止';
      }
    }

    private toggle() {
      if (!this.isRunning) {
        // start lottery
        this.intervalID = setInterval(() => {
          this.nowResult = this.getRandomInt(
              this.globalSettings.minID,
              this.globalSettings.maxID,
          );
        }, 10);
      } else {
        // stop lottery
        clearInterval(this.intervalID);
        // check unique
        while (this.historyResult.findIndex((v: number) => {
          return v === this.nowResult;
        }) !== -1) {
          this.nowResult = this.getRandomInt(
              this.globalSettings.minID,
              this.globalSettings.maxID,
          );
        }
        // submit result mutation
        this.mutationSaveResult(this.nowResult);
        // show snackbar if finished
        if (this.disableLottery) {
          this.disableLotterySnackbar = true;
        }
      }
      this.isRunning = !this.isRunning;
    }

    private getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
</script>

<style lang="stylus">
  .toolbar
    position: absolute !important
    right: 1em

  .text-white
    color: white !important

  .no-select
    -webkit-touch-callout: none
    -webkit-user-select: none
    -khtml-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    user-select: none

  .history-result
    height: 50% !important
    overflow-y: auto;
    overflow-x: hidden;
</style>
