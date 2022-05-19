<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" class="text-center">
      <p class="display-1 py-12">
        プロフィール
      </p>
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar size="72" :color="profile.themeColor">
            <span class="white--text body-2" v-text="profile.nickName" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="画像を選択してください"
            prepend-icon="photo_camera"
            label="アバター"
            :error-count="Number.MAX_VALUE"
            :error-messages="avatarErrors"
            @change="saveFileContent"
          />
        </v-col>
      </v-row>
      <label class="v-label theme--lignt">テーマカラー*</label>
      <v-color-picker
        v-model="newThemeColor"
        class="mx-auto mb-4 mt-2"
        hide-canvas
        show-swatches
        swatches-max-height="120px"
      />
      <v-btn small rounded color="primary" @click="saveThemeColor">
        テーマカラーを決定する
      </v-btn>
      <v-text-field
        v-model="profile.userName"
        readonly
        label="ユーザー名*"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editUserName"
      />
      <v-dialog
        v-model="isOpenEditUserNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider
              v-slot="{ errors }"
              name="ユーザー名"
              :rules="validationRoules.userName"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newUserName"
                      label="ユーザー名*"
                      :error-count="Number.MAX_VALUE"
                      :error-messages="errors"
                    />
                  </v-row>
                </v-container>
              </v-card-text>
            </ValidationProvider>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="closeEditUserNameDialog"
              >
                キャンセル
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="invalid"
                @click="saveUserName"
              >
                保存する
              </v-btn>
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.nickName"
        readonly
        label="ニックネーム*"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editNickName"
      />
      <v-dialog
        v-model="isOpenEditNickNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider
              v-slot="{ errors }"
              name="ニックネーム"
              :rules="validationRoules.nickname"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newNickName"
                      label="ニックネーム*"
                      :error-count="Number.MAX_VALUE"
                      :error-messages="errors"
                    />
                  </v-row>
                </v-container>
              </v-card-text>
            </ValidationProvider>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="closeEditNickNameDialog"
              >
                キャンセル
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="invalid"
                @click="saveNickName"
              >
                保存
              </v-btn>
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.mailAddress"
        readonly
        label="メールアドレス"
      />
      <small>
        ※必須フィールドを表示します
      </small>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import {
  profileStore,
  updateThemeColor,
  updateUserName,
  updateNickName,
} from '@/store/profile';
import { validate } from 'vee-validate';

export default defineComponent({
  setup() {
    const state = reactive({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      profile: profileStore.profile!,
      newUserName: null as string | null,
      newNickName: null as string | null,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      newThemeColor: profileStore.profile!.themeColor,
      isOpenEditUserNameDialog: false,
      isOpenEditNickNameDialog: false,
      validationRoules: computed(() => {
        return {
          nickname: {
            required: true,
            max: 15,
          },
          userName: {
            required: true,
            userNameAllowedCharacters: true,
            max: 15,
          },
          avatar: {
            ext: ['png', 'jpeg', 'bmp'],
            size: 300,
          },
        };
      }),
      // アバターのバリデーションエラー
      avatarErrors: null as string[] | null,
    });
    /**
     * アバターを保存します。
     * @param file アバター画像ファイル
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    const saveFileContent = (file: File) => {
      state.avatarErrors = null;
      console.log(file);
      if (!file) {
        // ファイル選択がなければ何もしない
      }

      validate(file, state.validationRoules.avatar, {
        name: 'アバター',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).then((result: any) => {
        console.log(typeof result);
        if (!result.valid) {
          state.avatarErrors = result.errors;
          return;
        }
        // バリデーション成功。　WebAPIを呼び出しアバター画像を保存する
      });
    };
    /**
     * テーマカラーを保存します
     */
    const saveThemeColor = () => {
      updateThemeColor(state.newThemeColor);
    };
    /**
     * ユーザー名の編集を開始します。
     */
    const editUserName = () => {
      state.newUserName = state.profile.userName;
      state.isOpenEditUserNameDialog = true;
    };
    /**
     * ユーザー名の編集を終了します。
     */
    const closeEditUserNameDialog = () => {
      state.isOpenEditUserNameDialog = false;
    };
    /**
     * ユーザー名を保存します。
     */
    const saveUserName = () => {
      if (state.newUserName) {
        updateUserName(state.newUserName);
      }
      state.isOpenEditUserNameDialog = false;
    };
    /**
     * ニックネームの編集を開始します。
     */
    const editNickName = () => {
      state.newNickName = state.profile.nickName;
      state.isOpenEditNickNameDialog = true;
    };
    /**
     * ニックネームの編集を終了します。
     */
    const closeEditNickNameDialog = () => {
      state.isOpenEditNickNameDialog = false;
    };
    /**
     * ニックネームを保存します。
     */
    const saveNickName = () => {
      if (state.newNickName) {
        updateNickName(state.newNickName);
      }
      state.isOpenEditNickNameDialog = false;
    };

    return {
      ...toRefs(state),
      saveFileContent,
      saveThemeColor,
      editUserName,
      closeEditUserNameDialog,
      saveUserName,
      editNickName,
      closeEditNickNameDialog,
      saveNickName,
    };
  },
});
</script>
