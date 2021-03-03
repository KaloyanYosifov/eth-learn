<template>
  <input
      class="form-control form-control-user"
      v-bind="{...attributesWithoutListeners, ...$props}"
      @input="$emit('input', $event.target.value)"
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

  setup(props, { attrs }) {
    const attributesWithoutListeners = {};

    Object.keys(attrs).forEach(attrKey => {
      if (attrKey.startsWith('on')) {
        return;
      }

      attributesWithoutListeners[attrKey] = attrs[attrKey];
    });

    return {
      attributesWithoutListeners,
    };
  },
};
</script>
