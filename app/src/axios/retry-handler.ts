import Vue from 'vue';
import axios, { AxiosError } from 'axios';

export class RetryHandler {
  private static maxRetryCount = 1;

  public static onRejected() {
    return (error: AxiosError) => {
      // キャンセルされた場合はなにもしない
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      // HTTP ステータスコード401,422を除外
      if (error?.response?.status === 401 || error?.response?.status === 422) {
        return Promise.reject(error);
      }

      const axiosError = error as AxiosError;
      let retryCount = 1;

      // config に retryableが指定されていなければリトライしない
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!('retryable' in (axiosError.config as any))) {
        return Promise.reject(error);
      }

      // config に retryCountが追加されている場合は加算
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ('retryCount' in (axiosError.config as any)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        retryCount = (axiosError.config as any).retryCount + 1;
      }

      // 最大リトライ回数に到達
      if (retryCount > this.maxRetryCount) {
        // エラーメッセージを表示
        return this.handlerError(error);
      }

      console.log(5);
      // configにretryCountを追加してリクエストをリトライ
      return axios.request({
        ...axiosError.config,
        ...{ retryCount: retryCount },
      });
    };
  }

  private static handlerError(error: AxiosError) {
    Vue.prototype.$dialog.error({
      text: '問題が発生しました。時間をおいてもう一度お試しください。',
      title: 'Error',
      persistent: true,
      retainFocus: false,
    });
    return Promise.reject(error);
  }
}
