import Confirm from '@/components/dialogs/confirm.vue';
import Notification from '@/components/dialogs/notification.vue';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Modals {
  public static showConfirm(title: string, message: string): Observable<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      const conf = new Confirm({
        propsData: {
          title,
          message,
          resolveFn: resolve,
          rejectFn: reject
        }
      }).$mount();
      document.body.appendChild(conf.$el);
    });

    return from(promise);
  }

  public static showNotif(title: string, message: string): Observable<void> {
    const promise = new Promise<true>(resolve => {
      const conf = new Notification({
        propsData: {
          title,
          message,
          resolveFn: resolve
        }
      }).$mount();
      document.body.appendChild(conf.$el);
    });

    return from(promise).pipe(map(() => undefined));
  }
}
