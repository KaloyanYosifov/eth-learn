<template>
  <form-input
      v-bind="attributesWithoutListeners"
      type="number"
      step="any"
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

  setup(props, { attrs, emit }) {
    const localValue = ref(0);
    const attributesWithoutListeners = {};

    Object.keys(attrs).forEach(attrKey => {
      if (attrKey.startsWith('on')) {
        return;
      }

      attributesWithoutListeners[attrKey] = attrs[attrKey];
    });

    const onInput = value => {
      localValue.value = Number(value);

      if (props.max && localValue.value > props.max) {
        localValue.value = Number(props.max);
      } else if (props.min && localValue.value < props.min) {
        localValue.value = Number(props.min);
      }

      emit('input', Number(localValue.value));
      emit('update:value', Number(localValue.value));
    };

    watch(() => props.value, newValue => {
      if (newValue === localValue.value) {
        return;
      }

      localValue.value = Number(newValue);
    }, { immediate: true });

    return {
      onInput,
      localValue,
      attributesWithoutListeners,
    };
  },
};
</script>
