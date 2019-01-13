import Vue from 'vue';
import VeeValidate from 'vee-validate';
import {Validator} from 'vee-validate';

Vue.use(VeeValidate);

// custom validator
Validator.extend('isSmallerOrEqual', (value: number, [otherValue]: number[]) => {
  return value <= otherValue;
}, {
  hasTarget: true,
});

Validator.extend('isBiggerOrEqual', (value: number, [otherValue]: number[]) => {
  return value >= otherValue;
}, {
  hasTarget: true,
});
