import {COLORS} from '@/constants/colors';
import {Todo} from '@/screens/TodoList/TodoList.types';
import notifee, {
  AndroidImportance,
  EventDetail,
  EventType,
  Notification,
  NotificationAndroid,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {navRef} from '../../App';

export const ACTION_CLOSE = 'close';
export const ACTION_POSTPONE = 'postpone';

export type notifItem = {
  notifId: string;
  todoId: number;
  triggerDate: Date;
};

class TodoNotificationService {
  async cancel(notifId: string) {
    await notifee.cancelNotification(notifId);
  }
  async createDaily(todo: Todo, date: Date): Promise<string> {
    const notification = await this.createNotification(todo);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    return await notifee.createTriggerNotification(notification, trigger);
  }

  async display(todo: Todo) {
    const notification = await this.createNotification(todo);

    await notifee.displayNotification(notification);
  }

  async getAll(): Promise<notifItem[]> {
    const notifList = await notifee.getTriggerNotifications();
    return notifList.map<notifItem>(item => ({
      notifId: item.notification.id ?? '',
      todoId: parseInt(item.notification.data?.id ?? '-1'),
      triggerDate: new Date((item.trigger as TimestampTrigger).timestamp),
    }));
  }

  async getByTodoId(id: number): Promise<notifItem | undefined> {
    const notifList = await this.getAll();
    return notifList.find(notif => notif.todoId === id);
  }

  async navigateByNotification(notification: Notification | undefined) {
    if (!navRef.isReady()) {
      return;
    }

    if (!notification) {
      return;
    }

    const todoId = notification.data?.id;
    if (todoId) {
      navRef.navigate('StackNavigation', {
        screen: 'TodoDetails',
        params: {todoId: parseInt(todoId)},
      });
    }
  }

  async handleEvent(type: EventType, detail: EventDetail) {
    if (!navRef.isReady()) {
      return;
    }

    switch (type) {
      case EventType.ACTION_PRESS:
        switch (detail.pressAction?.id) {
          case ACTION_CLOSE:
            // тут размещаются фоновые операции
            break;
          case ACTION_POSTPONE:
            if (detail.notification) {
              const date = new Date();
              date.setMinutes(date.getMinutes() + 5);

              const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: date.getTime(),
                repeatFrequency: RepeatFrequency.NONE,
              };

              const notif = {...detail.notification};
              delete notif.id;

              await notifee.createTriggerNotification(notif, trigger);

              // console.log('уведомление через 5 минут id = ', notifId);
            }

            break;
        }
        break;
      case EventType.PRESS:
        this.navigateByNotification(detail.notification);
        break;
      case EventType.DISMISSED:
        // тут размещаются фоновые операции
        break;
    }
  }

  async removeAll() {
    await notifee.cancelAllNotifications();
  }

  async removeByTodoId(todoId: number) {
    const notifList = await this.getAll();
    notifList.forEach(async notif => {
      if (notif.todoId === todoId) {
        await notifee.cancelNotification(notif?.notifId);
      }
    });
  }

  // Private methods

  async createNotification(
    todo: Todo,
    notifId: string = '',
  ): Promise<Notification> {
    const channelId = await notifee.createChannel({
      id: 'daily',
      name: 'ежедневные уведомления',
      description: 'ежедневные уведомления в заданное время',
      importance: AndroidImportance.HIGH,
    });

    const android: NotificationAndroid = {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
      actions: [
        {
          title: `<p style="color: ${COLORS.rhino}">Закрыть</p>`,
          pressAction: {
            id: ACTION_CLOSE,
            launchActivity: 'default',
          },
        },
        {
          title: `<p style="color: ${COLORS.rhino}">Отложить на 5 мин</p>`,
          pressAction: {
            id: ACTION_POSTPONE,
            launchActivity: 'default',
          },
        },
      ],
    };
    if (todo.assets.length) {
      android.largeIcon = todo.assets[0];
    }

    const notif: Notification = {
      title: `<p style="color: ${COLORS.rhino}"><b>${todo.title}</b></p>`,
      body: `<p style="color: ${COLORS.rockBlue}">Напоминание о задаче</p>`,
      android,
      data: {
        id: todo.id.toString(),
      },
    };

    if (notifId.length) {
      notif.id = notifId;
    }
    return notif;
  }
}

export default new TodoNotificationService();
