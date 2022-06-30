import store from '@/store';
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import axios, { AxiosRequestConfig } from 'axios';
import { Profile } from '@/store/profile.model';
import { update } from '@/store/shared-user';

/**
 * sessionStrage にプロフィール情報を保存します。
 */
const setStorage = (profile: Profile) => {
  sessionStorage.setItem('profile', JSON.stringify(profile));
};

@Module({ name: 'profile', store: store, namespaced: true, dynamic: true })
class ProfileModule extends VuexModule {
  public profile: Profile | null = null;

  /**
   * プロフィール取得
   */
  public get getProfile() {
    if (this.profile) {
      return this.profile;
    };
    const profile = sessionStorage.getItem('profile');
    if (profile) {
      return JSON.parse(profile) as Profile;
    };
    return null;
  }

  /**
   * 新しいユーザー名をStateに保存
   */
  @Mutation
  private updateUserName(userName: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const profile = this.profile!;
    profile.userName = userName;
    setStorage(profile);
  }

  /**
   * 新しいニックネームをStateに保存
   */
  @Mutation
  private updateNickname(nickname: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const profile = this.profile!;
    profile.nickName = nickname;
    setStorage(profile);
  }
 
  /**
   * 新しいテーマカラーをStateに保存
   */
  @Mutation
  private updateThemeColor(themeColor: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const profile = this.profile!;
    profile.themeColor = themeColor;
    setStorage(profile);
  }
  /**
   * プロフィールをStateに保存
   */
   @Mutation
   private saveProfile(profile: Profile) {
     this.profile = profile;
     setStorage(profile);
   }
   
  /**
   * Stateからプロフィールをクリア（ログアウト処理）
   */
  @Mutation
  public clearProfile() {
    this.profile = null;
    sessionStorage.removeItem('profile');
  }


  /**
   * ユーザー名を更新します。
   */
  @Action
  public async updateUserNameAsync(userName: string) {
    const data = { userName: userName };
    
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.patch('profile', data, {
        retryable: true
      } as AxiosRequestConfig);
      this.updateUserName(userName);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      update(this.profile!);
    } catch(error) {
      throw error;
    }
  }
   
  /**
   * ニックネームを更新します。
   */
  @Action
  public async updateNicknameAsync(nickname: string) {
    this.updateNickname(nickname);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    update(this.profile!);
  }

  /**
   * ニックネームを更新します。
   */
  @Action
  public async updateThemeColorAsync(themeColor: string) {
    this.updateThemeColor(themeColor);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    update(this.profile!);
  }

  /**
   * サインインします。
   */
  @Action
  public async signInAsync() {
    // 外部認証に関した実装が必要

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get<Profile>('profile');
      this.saveProfile(response.data);
    } catch(error) {
      throw error;
    }
  } 

  /**
   * サインアウトします。
   */
  @Action
  public async signOut() {
    // eslint-disable-next-line no-useless-catch
    try {
      //サインアウト関連実装
      this.clearProfile(); 
    } catch(error) {
      throw error;
    }
  } 
};

export const profileStore = getModule(ProfileModule);