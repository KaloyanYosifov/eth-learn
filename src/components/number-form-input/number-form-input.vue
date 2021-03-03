<template>
  <form-input
      v-bind="$attrs"
      type="number"
      :max="max"
      :min="min"
      :value="localValue"
      @input="onInput"
  />
</template>

<script>
/**
 * External dependencies.
 */
import { ref, watch } from 'vue';

/**
 * Internal dependencies.
 */
import FormInput from '@/components/form-input/form-input';

export default {
  name: 'NumberFormInput',

  inheritAttrs: false,

  components: {
    FormInput,
  },

  props: {
    value: {
      type: [Number, String],
      default: () => 0,
    },

    min: {
      type: Number,
      default: () => null,
    },

    max: {
      type: Number,
      default: () => null,
    },
  },

  setup(props, { emit }) {
    const localValue = ref(0);

    const onInput = value => {
      localValue.value = Number(value);

      if (props.max && localValue.value > props.max) {
        localValue.value = Number(props.max);
      } else if (props.min && localValue.value < props.min) {
        localValue.value = Number(props.min);
      }

      emit('input', localValue.value);
    };

    watch(() => props.value, newValue => {
      if (newValue === localValue.value) {
        return;
      }

      localValue.value = Number(newValue);
    });

    return {
      onInput,
      localValue,
    };
  },
};
</script>
