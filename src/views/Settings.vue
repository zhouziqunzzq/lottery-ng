<template>
  <v-form xs-12
          ref="form"
          v-model="valid"
          lazy-validation
          class="fill-height"
  >
    <v-container fluid fill-height>
      <v-layout row align-center justify-center fill-height>
        <v-flex>
          <v-layout row justify-center wrap>
            <v-flex xs10 md3 class="mx-2">
              <v-text-field
                  v-model.number="settings.minID"
                  type="number"
                  name="settings.minID"
                  ref="settings.minID"
                  v-validate="'required|min_value:0|isSmallerOrEqual:settings.maxID'"
                  :error-messages="errors.collect('settings.minID')"
                  label="最小 ID"
                  required
              ></v-text-field>
            </v-flex>
            <v-flex xs10 md3 class="mx-2">
              <v-text-field
                  v-model.number="settings.maxID"
                  type="number"
                  name="settings.maxID"
                  ref="settings.maxID"
                  v-validate="'required|min_value:0|isBiggerOrEqual:settings.minID'"
                  :error-messages="errors.collect('settings.maxID')"
                  label="最大 ID"
                  required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center wrap>
            <v-flex xs10 md3 class="mx-2">
              <v-btn
                  block
                  :disabled="!valid"
                  color="success"
                  @click="save"
              >
                保存
              </v-btn>
            </v-flex>
            <v-flex xs10 md3 class="mx-2">
              <v-btn
                  block
                  color="error"
                  @click="clear"
              >
                重置
              </v-btn>
            </v-flex>
            <v-flex xs10 md3 class="mx-2">
              <v-btn
                  block
                  color="warning"
                  @click.stop="clearResultDialog = true"
              >
                清空中奖记录
              </v-btn>
            </v-flex>
            <v-dialog
                v-model="clearResultDialog"
                width="500"
            >
              <v-card>
                <v-card-title
                    class="grey lighten-2"
                    primary-title
                >
                  确认
                </v-card-title>
                <v-card-text class="text-xs-center">
                  您确认要清除中奖记录吗？
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="warning"
                      @click="clearResultDialog = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                      color="primary"
                      @click="clearHistoryResultAndCloseDialog"
                  >
                    确认
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-snackbar
          v-model="snackbar"
          bottom
          color="info"
      >
        {{ snackbarText }}
        <v-btn
            color="white"
            flat
            @click="snackbar = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
  </v-form>
</template>

<script lang="ts">
  import {Vue, Component, Mixins} from 'vue-property-decorator';
  import LotterySettings from '@/interfaces/LotterySettings';
  import {State, Getter, Mutation} from 'vuex-class';
  import * as types from '@/store/mutation-types';

  @Component({
    name: 'Settings',
    components: {},
  })
  export default class Settings extends Vue {
    @State('settings') private globalSettings!: LotterySettings;
    @Mutation(types.SAVE_SETTINGS) private mutationSettings!: any;
    @Mutation(types.CLEAR_HISTORY_RESULT) private mutationClearHistoryResult!: any;
    private settings: LotterySettings = {
      minID: 0,
      maxID: 0,
    };
    private valid: boolean = true;
    private dictionary: object = {
      custom: {
        'settings.minID': {
          required: '最小 ID 不能为空',
          min_value: '最小 ID 必须为大于等于 0 的整数',
          isSmallerOrEqual: '最小 ID 必须小于等于最大 ID',
        },
        'settings.maxID': {
          required: '最大 ID 不能为空',
          min_value: '最大 ID 必须为大于等于 0 的整数',
          isBiggerOrEqual: '最大 ID 必须大于等于最小 ID',
        },
      },
    };
    private clearResultDialog: boolean = false;
    private snackbar: boolean = false;
    private snackbarText: string = '';

    private mounted() {
      this.$validator.localize('zh', this.dictionary);
      // load settings from global settings
      this.clear();
    }

    private clear() {
      this.settings.minID = this.globalSettings.minID;
      this.settings.maxID = this.globalSettings.maxID;
      this.showSnackbar('已重置为前一次的设置');
    }

    private save() {
      this.mutationSettings(this.settings);
      this.showSnackbar('保存成功');
    }

    private clearHistoryResultAndCloseDialog() {
      this.mutationClearHistoryResult();
      this.clearResultDialog = false;
      this.showSnackbar('中奖记录清空成功');
    }

    private showSnackbar(text: string) {
      this.snackbar = false;
      this.snackbarText = text;
      this.snackbar = true;
    }
  }
</script>

<style scoped lang="scss">

</style>
