<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <v-text-field v-my-example="exampleHandler" />
      <p class="display-1 py-12">
        サンプルアプリケーションにサインインする
      </p>
      <div>
        <v-btn
          width="300"
          large
          color="#1DA1F2"
          class="white--text text-none"
          @click="signIn"
        >
          Sing in with SNS1
        </v-btn>
      </div>

      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#DD2A7B"
          class="white--text text-none"
          @click="signIn"
        >
          Sing in with SNS2
        </v-btn>
      </div>

      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#3B5998"
          class="white--text text-none"
          @click="signIn"
        >
          Sing in with SNS3
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { profileStore } from '@/store/profile/profile';

export default defineComponent({
  setup(prop, context) {
    const exampleHandler = (event: Event) => {
      console.log(
        'event.target.value: ',
        (event.target as HTMLInputElement).value,
      );
    };
    /**
     * サインイン
     */
    const signIn = async () => {
      try {
        //await context.root.$store.dispatch('profile/signInAsync');
        await profileStore.signInAsync();
        context.root.$router.push('/');
      } catch (error) {
        console.log('error: ', error);
      }
    };

    return {
      exampleHandler,
      signIn,
    };
  },
});
</script>
