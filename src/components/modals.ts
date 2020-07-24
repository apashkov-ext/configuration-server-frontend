import Confirm from '@/components/dialogs/confirm.vue';
import Notification from '@/components/dialogs/notification.vue';

export class Modals {
    public static showConfirm(title: string, message: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
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
    }

    public static showNotif(title: string, message: string): Promise<boolean> {
        return new Promise(resolve => {
            const conf = new Notification({
                propsData: {
                    title,
                    message,
                    resolveFn: resolve
                }
            }).$mount();
            document.body.appendChild(conf.$el);
        });
    }
}