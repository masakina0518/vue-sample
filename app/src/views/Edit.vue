<template>
<div>
    <div :class="$style.inputContainer">
    <form :class="$style.inputArea">
        <p>ユーザー登録</p>
        <label>ニックネーム</label>
        <input v-model="nickname" />
        <label>メールアドレス</label>
        <input v-model="email" />
    </form>
    <div :class="$style.previewArea">
        <p>プレビュー</p>
        <label>ニックネーム</label>
        <input :value="nickname" readonly />
        <label>メールアドレス</label>
        <input :value="email" readonly />
    </div>
    <div :class="$style.buttonArea">
        <button @click="saveUser">ユーザーを登録する</button>
    </div>
    </div>
    <div>
    <div :class="$style.filterArea">
        <label>リストをニックネームで絞り込む</label>
        <input v-model="nicknameFilter" />
    </div>
    <table>
        <thead>
        <th>ニックネーム</th>
        <th>メールアドレス</th>
        </thead>
        <tbody>
        <tr
            is="user-row"
            v-for="(user, index) in filteredUsers"
            :key="index"
            :user="user"
        />
        </tbody>
    </table>
    <div :class="$style.buttonWrapper">
        <button @click="displayUsers">ユーザーを表示する</button>
    </div>
    </div>
</div>
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';
// import userRowComponent, { User } from '@/components/UserRow.vue'

// @Component({
//   components: {
//     'user-row': userRowComponent,
//   },
// })
// export default class EditComponent extends Vue {
//   private users: User[] = []
//   private nickname = '';
//   private email = '';
//   private nicknameFilter = '';

//   private get filteredUsers() {
//      return this.users.filter(user => user.nickname.includes(this.nicknameFilter));
//   }

//   private saveUser() {
//     const user: User = {
//       nickname: this.nickname,
//       email: this.email,
//     }
//     this.users.push(user);
//     alert('ニックネーム: ' + this.nickname + '、メールアドレス: ' + this.email + 'で登録しました。');
//   }

//   private displayUsers() {
//     let message = this.users.length + ' 人のユーザーが登録されています。';
//     for(const user of this.users) {
//       message += '\n' + user.nickname;
//     }
//     alert(message);
//   }
// }

import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api';
import userRowComponent, { User } from '@/components/UserRow.vue';

export default defineComponent({
    components: {
        'user-row': userRowComponent,
    },
    setup() {
        const state = reactive({
            users: [] as User[],
            nickname: '',
            email: '',
            nicknameFilter: '',
            filteredUsers: computed((): User[] => {
                return state.users.filter(user => user.nickname.includes(state.nicknameFilter));
            }),
        });


        const saveUser = () => {
            const user: User = {
              nickname: state.nickname,
              email: state.email,
            }
            state.users.push(user);

            alert('ニックネーム: ' + state.nickname + '、メールアドレス: ' + state.email + 'で登録しました。');
        }

        const displayUsers = () => {
            let message = state.users.length + ' 人のユーザーが登録されています。';
            for(const user of state.users) {
                message += '\n' + user.nickname;
            }
            alert(message);
        }


        return {
            ...toRefs(state),
            saveUser,
            displayUsers,
        }
    }
});
</script>

<style module lang="scss">
.inputContainer {
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    'inputArea previewArea'
    'buttonArea buttonArea';
  grid-template-columns: 300px 300px;
  grid-template-rows: 200px 50px;
}
.inputArea {
  display: grid;
  grid-area: inputArea;
}
.previewArea {
  display: grid;
  grid-area: previewArea;
}
.buttonArea {
  align-items: center;
  display: grid;
  grid-area: buttonArea;
  justify-items: center;
}
.filterArea {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 300px 300px;
}
table {
  border-collapse: collapse;
  margin-top: 10px;
  width: 610px;
}
th,
td {
  padding-left: 5px;
  width: 50%;
  word-break: break-all;
}
td input {
  width: 95%;
}
.buttonWrapper {
  align-items: center;
  display: grid;
  height: 50px;
  justify-content: center;
  width: 610px;
}
</style>
