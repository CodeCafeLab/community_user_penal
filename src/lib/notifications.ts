export type NotificationType = "info" | "success" | "warning";

export type AppNotification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read?: boolean;
};

export const initialNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "warning",
    title: "Water supply maintenance",
    description:
      "Block A & B: water supply will be interrupted today from 2:00 PM to 6:00 PM for urgent repairs.",
    time: "3h ago",
    read: false,
  },
  {
    id: "n2",
    type: "info",
    title: "Visitor gate pass generated",
    description: "Your QR gate pass is ready for 'Delivery – Amazon'. Show it at the main gate.",
    time: "Today",
    read: false,
  },
  {
    id: "n3",
    type: "success",
    title: "Service booking confirmed",
    description: "Deep Home Cleaning is scheduled for Sat, 10:30 AM (Urban Company).",
    time: "Yesterday",
    read: true,
  },
  {
    id: "n4",
    type: "info",
    title: "New marketplace listing near you",
    description: "A 'Study Table & Chair' listing was posted in Block B. Tap to view details.",
    time: "2d ago",
    read: true,
  },
];


