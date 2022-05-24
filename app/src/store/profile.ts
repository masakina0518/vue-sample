import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import { Profile } from "@/store/profile.model";
import { update } from "@/store/shared-user";
import axios from 'axios';

// export const profileMockData: Profile = {
//   userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
//   userName: 'naminami',
//   nickName: '波平',
//   themeColor: '#4caf50',
//   hasAvatar: false,
//   mailAddress: 'namihei@example.com',
// };
  
export const profileStore = reactive({ profile: null as Profile | null });

/**
 * ユーザー名を更新します。
 * @param userName ユーザー名
 */
export const updateUserName = (userName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  profileStore.profile!.userName = userName;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  update(profileStore.profile!);
};

/**
 * ニックネームを更新します。
 * @param nickName ニックネーム
 */
export const updateNickName = (nickName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    profileStore.profile!.nickName = nickName;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    update(profileStore.profile!);  
};

/**
 * テーマカラーを更新します。
 * @param themeColor テーマカラー
 */
export const updateThemeColor = (themeColor: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  profileStore.profile!.themeColor = themeColor;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  update(profileStore.profile!);  
};

/**
 * サインインします。
 */
export const signInAsync = async () => {
  // 外部認証に関連した実装が必要

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get<Profile>('profile');
    profileStore.profile = response.data;
  } catch (error) {
    throw error;
  };
};
