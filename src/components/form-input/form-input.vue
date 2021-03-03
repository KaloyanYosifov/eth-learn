<template>
  <input
      class="form-control form-control-user"
      v-bind="{...attributesWithoutListeners, ...$props}"
      @input="onInput"
  />
</template>

<script>
export default {
  name: 'FormInput',

  inheritAttrs: false,

  props: {
    value: {
      type: [Number, String],
      default: () => '',
    },

    type: {
      type: String,
      default: () => 'text',
    },
  },

  setup(props, { attrs, emit }) {
    const attributesWithoutListeners = {};
    const onInput = event => {
      emit('input', event.target.value);
      emit('update:value', event.target.value);
    };

    Object.keys(attrs).forEach(attrKey => {
      if (attrKey.startsWith('on')) {
        return;
      }

      attributesWithoutListeners[attrKey] = attrs[attrKey];
    });

    return {
      onInput,
      attributesWithoutListeners,
    };
  },
};
</script>
