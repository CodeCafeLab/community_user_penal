import type { User, StatCardData, Announcement, QuickAction, Event, Complaint, Payment, Facility, Resident, CommunityGroup } from '@/lib/types';
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Bike,
  Building,
  Calendar,
  CalendarClock,
  CreditCard,
  DollarSign,
  FileText,
  HandCoins,
  LayoutGrid,
  Megaphone,
  ShieldAlert,
  Users,
  Wrench,
  Mail,
  Phone,
  ShoppingBag,
  Lock,
} from 'lucide-react';
import { getPlaceholderImage } from './placeholder-images';

export const user: User = {
  name: 'Jane Doe',
  avatar: getPlaceholderImage('user-avatar-1'),
  flat: 'A-123',
  email: 'jane.doe@residenthub.com',
};

export const statCards: StatCardData[] = [
  {
    title: 'Pending Dues',
    value: '$150.00',
    icon: DollarSign,
    change: '+2.5%',
    changeType: 'increase',
  },
  {
    title: 'Upcoming Events',
    value: '3',
    icon: CalendarClock,
  },
  {
    title: 'Active Complaints',
    value: '1',
    icon: AlertTriangle,
  },
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Pool Maintenance',
    content: 'The swimming pool will be closed for annual maintenance from June 10th to June 15th. We apologize for any inconvenience.',
    category: 'Maintenance',
    date: '2024-06-05',
    read: false,
    image: getPlaceholderImage('announcement-maintenance'),
  },
  {
    id: '2',
    title: 'Summer Fest 2024',
    content: 'Get ready for our annual Summer Fest! Join us for a day of fun, food, and games on July 20th at the community park.',
    category: 'Social',
    date: '2024-06-01',
    read: true,
    image: getPlaceholderImage('announcement-social'),
  },
  {
    id: '3',
    title: 'Emergency Drill',
    content: 'A fire safety drill is scheduled for this Friday at 11:00 AM. Please familiarize yourself with the evacuation routes.',
    category: 'Emergency',
    date: '2024-05-28',
    read: true,
    image: getPlaceholderImage('announcement-emergency'),
  },
];

export const quickActions: QuickAction[] = [
  { title: 'Pay Dues', icon: HandCoins, href: '/payments', color: 'text-sky-500' },
  { title: 'Book Facility', icon: Building, href: '/facilities', color: 'text-amber-500' },
  { title: 'Raise Complaint', icon: Wrench, href: '/complaints', color: 'text-red-500' },
  { title: 'View Events', icon: Calendar, href: '/events', color: 'text-indigo-500' },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Community Movie Night',
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    time: '7:00 PM',
    venue: 'Community Park',
    description: 'Join us for an outdoor screening of a family-friendly blockbuster. Popcorn and drinks will be provided.',
    image: getPlaceholderImage('event-movie-night'),
    category: 'Social',
  },
  {
    id: '2',
    title: 'Yoga by the Pool',
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: '8:00 AM',
    venue: 'Swimming Pool Area',
    description: 'Start your weekend with a refreshing yoga session. All levels are welcome. Please bring your own mat.',
    image: getPlaceholderImage('event-yoga-class'),
    category: 'Workshop',
  },
  {
    id: '3',
    title: 'Spring Festival',
    date: new Date(new Date().setDate(new Date().getDate() + 12)),
    time: '11:00 AM - 4:00 PM',
    venue: 'Clubhouse & Lawns',
    description: 'Celebrate the arrival of spring with food stalls, music, and activities for all ages.',
    image: getPlaceholderImage('event-spring-festival'),
    category: 'Social',
  },
];

export const complaints: Complaint[] = [
  {
    id: 'C001',
    title: 'Leaky faucet in kitchen',
    category: 'Plumbing',
    status: 'Resolved',
    date: '2024-05-15',
    priority: 'Medium',
    description: 'The kitchen faucet has been dripping constantly for the past two days.'
  },
  {
    id: 'C002',
    title: 'Lobby light not working',
    category: 'Electrical',
    status: 'In Progress',
    date: '2024-06-02',
    priority: 'Low',
    description: 'The main light in the lobby of Block B is out.'
  },
  {
    id: 'C003',
    title: 'Noise complaint from upstairs',
    category: 'Other',
    status: 'Acknowledged',
    date: '2024-06-08',
    priority: 'Medium',
    description: 'Loud music playing late at night from apartment B-405.'
  },
  {
    id: 'C004',
    title: 'Security concern at main gate',
    category: 'Security',
    status: 'Submitted',
    date: '2024-06-09',
    priority: 'High',
    description: 'The main gate was left open and unattended for over 15 minutes this evening.'
  }
];

export const payments: Payment[] = [
  { id: 'P001', date: '2024-06-01', description: 'May 2024 Maintenance', amount: 150.00, status: 'Paid' },
  { id: 'P002', date: '2024-05-01', description: 'April 2024 Maintenance', amount: 150.00, status: 'Paid' },
  { id: 'P003', date: '2024-04-01', description: 'March 2024 Maintenance', amount: 150.00, status: 'Paid' },
];

export const facilities: Facility[] = [
  { id: 'F01', name: 'Clubhouse', description: 'Multi-purpose hall for events and gatherings.', image: getPlaceholderImage('facility-clubhouse'), availability: 'Available' },
  { id: 'F02', name: 'Gym', description: 'Fully equipped fitness center.', image: getPlaceholderImage('facility-gym'), availability: 'Available' },
  { id: 'F03', name: 'Swimming Pool', description: 'Outdoor pool with lounge area.', image: getPlaceholderImage('facility-pool'), availability: 'Booked' },
  { id: 'F04', name: 'Tennis Court', description: 'Standard size tennis court.', image: getPlaceholderImage('facility-court'), availability: 'Maintenance' },
];

export const residents: Resident[] = [
  { id: 'R01', name: 'Alice Johnson', flat: 'A-101', avatar: getPlaceholderImage('user-avatar-2'), phone: '555-0101', email: 'alice.j@email.com', skills: ['Graphic Design', 'Marketing'] },
  { id: 'R02', name: 'Bob Williams', flat: 'B-205', avatar: getPlaceholderImage('user-avatar-3'), phone: '555-0102', email: 'bob.w@email.com', skills: ['Software Development', 'Project Management'] },
  { id: 'R03', name: 'Charlie Brown', flat: 'C-302', avatar: getPlaceholderImage('user-avatar-4'), phone: '555-0103', email: 'charlie.b@email.com', skills: ['Accounting', 'Financial Planning'] },
];

export const communityGroups: CommunityGroup[] = [
  { id: 'G01', name: 'Gardening Club', description: 'For all the green thumbs in the community.', members: 25, icon: Bike },
  { id: 'G02', name: 'Book Club', description: 'Monthly meetings to discuss our latest read.', members: 18, icon: BookOpen },
  { id: 'G03', name: 'Sports Enthusiasts', description: 'Organizing weekend games and sports activities.', members: 42, icon: Bike },
  { id: 'G04', name: 'Professional Network', description: 'Connect with professionals from various fields.', members: 33, icon: Briefcase },
]

export const navLinks = [
  { href: '/', label: 'Community', icon: Users },
  { href: '/social', label: 'Social', icon: LayoutGrid },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/devices', label: 'Devices', icon: Lock },
];
