<template>
  <div>
    <v-text-field
      v-model="computedFooValue"
      v-bind="$attrs"
    />
    <v-btn @click="click">click!</v-btn>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  PropType,
  onMounted,
} from '@vue/composition-api';

export interface MyExampleComponentParameter {
  foo: string;
  bar: string;
}



export default defineComponent({
  inheritAttrs: true,
  props: {
    value: {
      type: Object as PropType<MyExampleComponentParameter>,
      required: true,
    },
  },
  setup(props, context) {
    console.log('子コンポーネント: created');
    const state = reactive({
      computedFooValue: computed({
        get: () => {
          return props.value.foo;
        },
        set: (value: string) => {
          context.emit('input', {
            foo: value,
            bar: props.value.bar,
          });
        },
      }),
    });

    const click = () => {
      context.emit('custom-event', 100);
    };

    onMounted(() => {
        console.log('子コンポーネント: mounted');
    });

    return {
      ...toRefs(state),
      click,
    };
  },
});

</script>
