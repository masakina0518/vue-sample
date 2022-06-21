import { reactive } from '@vue/composition-api';
import { sharedUserStore } from '@/store/shared-user';
import { SharedUser } from '@/store/shared-user.model';

export const userSharedEvents = () => {
  const sharedEventState = reactive({
    //カレンダーを共有しているユーザーです
    sharedUsers: sharedUserStore.sharedUsers,
  });

  const getDisplayUserIds = () => {
    return sharedEventState.sharedUsers
      .filter((user: SharedUser) => user.display)
      .map((user: SharedUser) => user.userId);
  };

  return { sharedEventState, getDisplayUserIds };
};
