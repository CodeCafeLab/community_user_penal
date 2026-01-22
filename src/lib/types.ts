import type { LucideIcon } from "lucide-react";

export type User = {
  name: string;
  avatar: string;
  flat: string;
  email: string;
};

export type StatCardData = {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease';
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Maintenance' | 'Social' | 'Emergency';
  date: string;
  read: boolean;
  image: string;
};

export type QuickAction = {
  title: string;
  icon: LucideIcon;
  href: string;
  color: string;
};

export type Event = {
  id: string;
  title: string;
  date: Date;
  time: string;
  venue: string;
  description: string;
  image: string;
  category: 'Social' | 'Meeting' | 'Maintenance' | 'Workshop';
  rsvp?: 'Yes' | 'No' | 'Maybe';
};

export type Complaint = {
  id: string;
  title: string;
  category: 'Plumbing' | 'Electrical' | 'Security' | 'Cleanliness' | 'Other';
  status: 'Submitted' | 'Acknowledged' | 'In Progress' | 'Resolved';
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  description: string;
};

export type Payment = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Pending';
};

export type Facility = {
  id: string;
  name: string;
  description: string;
  image: string;
  availability: 'Available' | 'Booked' | 'Maintenance';
};

export type Resident = {
  id: string;
  name: string;
  flat: string;
  avatar: string;
  phone: string;
  email: string;
  skills: string[];
};

export type CommunityGroup = {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: LucideIcon;
};
