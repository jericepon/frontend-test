export function useAuthNotifications() {
  const toast = useToast();
  
  type Notification = {
    description: string;
    icon?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  };

  enum NotificationTypeColor {
    success = "green",
    error = "red",
    warning = "yellow",
    info = "blue"
  }

  const notify = ({ description, icon = "i-heroicons-information-circle", type = 'info' }: Notification): void => {
    const color = NotificationTypeColor[type];
    toast.add({ description, color, icon });
  };

  return {
    notify,
  };
}