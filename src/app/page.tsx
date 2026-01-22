"use client";

import { user } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChevronDown,
  Search,
  UserPlus,
  CreditCard,
  Headphones,
  MessageCircle,
  ShieldCheck,
  BookUser,
  Plus,
  MoreHorizontal,
  ChevronRight,
  Paperclip,
  User as UserIcon,
  QrCode,
  Vote,
  AlertTriangle,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Car
} from 'lucide-react';
import { NotificationCenter } from '@/components/notification-center';
import { SafeImage } from '@/components/safe-image';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [showAllActions, setShowAllActions] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState<null | "event" | "urgent">(null);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  const quickActions = [
    { icon: UserPlus, label: "Pre-Approve", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: CreditCard, label: "Payments", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Headphones, label: "Helpdesk", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: MessageCircle, label: "Posts", badge: "9", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: UserIcon, label: "Family", isAd: true },
    { icon: ShieldCheck, label: "Security", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { icon: BookUser, label: "Directory", color: "text-pink-500", bg: "bg-pink-500/10" },
    // Hidden by default
    { icon: FileText, label: "Documents", color: "text-cyan-500", bg: "bg-cyan-500/10", hidden: !showAllActions },
    { icon: Calendar, label: "Events", color: "text-red-500", bg: "bg-red-500/10", hidden: !showAllActions },
    { icon: Car, label: "Parking", color: "text-slate-500", bg: "bg-slate-500/10", hidden: !showAllActions },
    { icon: Settings, label: "Settings", color: "text-gray-500", bg: "bg-gray-500/10", hidden: !showAllActions },
  ];

  const visibleActions = quickActions.filter(a => !a.hidden);

  return (
    <>
    <div className="flex flex-col gap-6 pb-24 md:pb-8 w-full max-w-7xl mx-auto px-4 md:px-0">
      {/* Mobile Header */}
      <div className="flex items-center justify-between py-2 md:hidden">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary ring-2 ring-primary/20 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold text-lg leading-none cursor-pointer hover:opacity-80 transition-opacity">
              7 203 <ChevronDown className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Premium Plan</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50" onClick={() => setQuickSearchOpen(true)}>
            <Search className="w-6 h-6 text-foreground/80" />
          </Button>
          <NotificationCenter />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Hero & Gate Pass Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hero Banner */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50 relative aspect-[2/1] w-full group cursor-pointer md:aspect-auto md:h-64" onClick={() => toast({ title: "Offer details (demo)", description: "A full offer page would open here." })}>
              <SafeImage
                src="/fintech_banner.png"
                alt="Skydo Offer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white z-10 md:hidden">
                <h3 className="font-bold text-lg">Exclusive Offer</h3>
                <p className="text-sm text-balance">Get 50% off on your first transaction</p>
              </div>
            </div>

            {/* Gate Pass Quick Access */}
            <Card className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-xl shadow-blue-200 dark:shadow-none overflow-hidden relative flex flex-col justify-center h-full min-h-[200px]">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <QrCode className="w-32 h-32" />
              </div>
              <CardContent className="p-6 flex flex-col justify-between h-full relative z-10 gap-4">
                <div className="flex flex-col gap-2">
                  <Badge className="w-fit bg-blue-400/30 hover:bg-blue-400/40 text-blue-50 border-0">Access Control</Badge>
                  <h3 className="font-bold text-2xl">My Gate Pass</h3>
                  <p className="text-blue-100 text-sm">Show this QR code at the security gate for seamless entry.</p>
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-xl shadow-md font-bold w-full gap-2 text-blue-700 hover:bg-white hover:scale-105 transition-all"
                  onClick={() => setQrOpen(true)}
                >
                  <QrCode className="w-5 h-5" /> View Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-bold text-xl">Quick Actions</h2>
              <Button variant="ghost" size="sm" className="text-sm text-primary font-medium hover:bg-primary/5 rounded-full px-3 gap-1" onClick={() => toast({ title: "Customize (demo)", description: "Personalize your shortcuts and widgets here." })}>
                Customise <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-6 gap-x-4">
              {visibleActions.map((action, i) => (
                <QuickActionItem
                  key={i}
                  {...action}
                  onClick={() => {
                    if (action.label === "Posts") router.push("/social");
                    else if (action.label === "Payments") toast({ title: "Payments (demo)", description: "Payment history & dues would open here." });
                    else if (action.label === "Helpdesk") toast({ title: "Helpdesk (demo)", description: "Raise and track service tickets here." });
                    else toast({ title: `${action.label} (demo)`, description: "This feature is showcased in the premium build." });
                  }}
                />
              ))}
              {!showAllActions ? (
                <div onClick={() => setShowAllActions(true)} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-[24px] flex items-center justify-center shadow-md bg-primary text-white shadow-primary/20 transition-transform group-hover:scale-105">
                    <Plus className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] md:text-sm font-medium text-center leading-tight text-foreground/80 group-hover:text-foreground">View More</span>
                </div>
              ) : (
                <div onClick={() => setShowAllActions(false)} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-[24px] flex items-center justify-center shadow-sm border border-border/40 bg-card transition-transform group-hover:scale-105">
                    <ChevronDown className="w-7 h-7 text-muted-foreground rotate-180" />
                  </div>
                  <span className="text-[11px] md:text-sm font-medium text-center leading-tight text-foreground/80 group-hover:text-foreground">Less</span>
                </div>
              )}
            </div>
          </div>

          {/* Announcements Desktop Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-bold text-xl">Announcements</h2>
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => toast({ title: "Announcements (demo)", description: "A full announcements timeline would open here." })}>View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm bg-card rounded-2xl overflow-hidden relative group cursor-pointer hover:shadow-md transition-shadow" onClick={() => setAnnouncementOpen("event")}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] h-5 border-0">Event</Badge>
                      <span className="text-[10px] text-muted-foreground">• 1d ago</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm leading-tight pr-8">Mahima&apos;s Inter-Society Premier League - 2026 Season Kickoff 🏏</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    Dear Residents, the wait is over! Join us for the opening ceremony this Saturday at the main ground. Food, music, and sports await!
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-2">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <Paperclip className="w-3 h-3" /> 2 Attachments
                    </div>
                    <Button variant="link" className="h-auto p-0 text-xs font-bold text-primary ml-auto" onClick={(e) => { e.stopPropagation(); setAnnouncementOpen("event"); }}>Read Details</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card rounded-2xl overflow-hidden relative group cursor-pointer hover:shadow-md transition-shadow" onClick={() => setAnnouncementOpen("urgent")}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 text-[10px] h-5 border-0">Urgent</Badge>
                      <span className="text-[10px] text-muted-foreground">• 3h ago</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm leading-tight pr-8">Emergency Water Supply Maintenance</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    Due to urgent repairs, water supply will be interrupted in Block A & B from 2 PM to 6 PM today. Please store water accordingly.
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-2">
                    <Button variant="link" className="h-auto p-0 text-xs font-bold text-red-500 ml-auto" onClick={(e) => { e.stopPropagation(); setAnnouncementOpen("urgent"); }}>Read Details</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column (Stats & Widgets) */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col justify-between h-28 relative overflow-hidden group hover:border-green-500/30 transition-colors">
              <div className="absolute top-0 right-0 bg-green-500/10 w-16 h-16 rounded-bl-full -mr-2 -mt-2 group-hover:bg-green-500/20 transition-colors"></div>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground z-10">
                <ShieldCheck className="w-4 h-4 text-green-600" /> Security
              </div>
              <div className="z-10">
                <span className="text-3xl font-bold tracking-tight">89%</span>
                <p className="text-[11px] text-muted-foreground font-medium mt-1">Approval Rate</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col justify-between h-28 relative overflow-hidden group hover:border-red-500/30 transition-colors">
              <div className="absolute top-0 right-0 bg-red-500/10 w-16 h-16 rounded-bl-full -mr-2 -mt-2 group-hover:bg-red-500/20 transition-colors"></div>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground z-10">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Alerts
              </div>
              <div className="z-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight">0</span>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium mt-1">System Status: Nominal</p>
              </div>
            </div>
          </div>

          {/* Visitor Stats Widget */}
          <Card className="rounded-2xl border-border/50 shadow-sm bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                Visitors
                <Badge variant="outline" className="font-normal text-[10px]">Today</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between bg-muted/30 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-none">12</h4>
                    <p className="text-muted-foreground text-xs font-medium">Total</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-center px-2 border-r border-border">
                    <span className="block font-bold text-green-600 text-sm">4</span>
                    <span className="text-[10px] text-muted-foreground">Inside</span>
                  </div>
                  <div className="text-center px-2">
                    <span className="block font-bold text-slate-600 text-sm">8</span>
                    <span className="text-[10px] text-muted-foreground">Exited</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Expected Guests</h3>
                  <Button variant="link" size="sm" className="text-primary text-xs h-auto p-0">View All</Button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
                    <div className="relative">
                      <Avatar className="w-14 h-14 md:w-16 md:h-16 border-2 border-green-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 border-2 border-card shadow-sm">
                        <Plus className="w-3 h-3" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-center truncate w-full text-foreground/80">Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
                    <div className="relative">
                      <Avatar className="w-14 h-14 md:w-16 md:h-16 border-2 border-dashed border-muted-foreground/30 p-0.5 hover:border-primary/50 hover:bg-muted/50 transition-all flex items-center justify-center">
                        <Plus className="w-6 h-6 text-muted-foreground m-auto" />
                      </Avatar>
                    </div>
                    <span className="text-xs font-medium text-center text-muted-foreground">Invite</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Poll Widget */}
          <Card className="rounded-2xl border-border/50 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-3 bg-muted/20">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span className="flex items-center gap-1"><Vote className="w-3 h-3" /> Community Poll</span>
                <span>Ends in 2 days</span>
              </div>
              <h3 className="font-semibold text-sm leading-tight">Where should we organize the next community meetup?</h3>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="space-y-1 group cursor-pointer">
                  <div className="flex justify-between text-xs font-medium group-hover:text-primary transition-colors">
                    <span>Clubhouse</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2 bg-muted group-hover:bg-primary/20 transition-colors" />
                </div>
                <div className="space-y-1 group cursor-pointer">
                  <div className="flex justify-between text-xs font-medium group-hover:text-primary transition-colors">
                    <span>Community Park</span>
                    <span>30%</span>
                  </div>
                  <Progress value={30} className="h-2 bg-muted group-hover:bg-primary/20 transition-colors" />
                </div>
                <div className="space-y-1 group cursor-pointer">
                  <div className="flex justify-between text-xs font-medium group-hover:text-primary transition-colors">
                    <span>Rooftop Garden</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2 bg-muted group-hover:bg-primary/20 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

      {/* Gate pass & announcements dialogs */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline">My Gate Pass</DialogTitle>
            <DialogDescription>Show this at the main gate for fast entry (demo).</DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl border border-border/50 bg-muted/20 p-6 text-center space-y-2">
            <div className="mx-auto w-40 h-40 rounded-2xl bg-white border border-border/50 flex items-center justify-center">
              <QrCode className="w-20 h-20 text-foreground/70" />
            </div>
            <p className="text-sm text-muted-foreground">Valid for: Delivery • Today</p>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => toast({ title: "Shared (demo)", description: "Share pass with security/guest." })}
            >
              Share
            </Button>
            <Button
              className="rounded-full"
              onClick={() => toast({ title: "Downloaded (demo)", description: "Saved to your phone wallet in a real app." })}
            >
              Save to phone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={announcementOpen !== null} onOpenChange={(o) => !o && setAnnouncementOpen(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline">
              {announcementOpen === "urgent" ? "Emergency Water Supply Maintenance" : "Premier League Season Kickoff"}
            </DialogTitle>
            <DialogDescription>
              {announcementOpen === "urgent"
                ? "Block A & B • Today • 2 PM – 6 PM"
                : "Main Ground • Saturday • 6 PM onwards"}
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            {announcementOpen === "urgent" ? (
              <>
                <p>Due to urgent repairs, water supply will be interrupted in Block A & B from 2 PM to 6 PM today.</p>
                <p>Please store water accordingly. Updates will be shared here in real-time.</p>
              </>
            ) : (
              <>
                <p>Join us for the opening ceremony of the 2026 season—food stalls, music, and sports activities for all ages.</p>
                <p>Bring your community spirit and cheer for your block!</p>
              </>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => toast({ title: "Saved (demo)", description: "Added to your community calendar." })}
            >
              Save
            </Button>
            <Button
              className="rounded-full"
              onClick={() => toast({ title: "Acknowledged", description: "Thanks! You'll receive updates if anything changes." })}
            >
              Acknowledge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={quickSearchOpen} onOpenChange={setQuickSearchOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline">Quick Search</DialogTitle>
            <DialogDescription>Jump to key features fast (mobile-first).</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              className="rounded-xl justify-start"
              onClick={() => {
                setQuickSearchOpen(false);
                router.push("/marketplace");
              }}
            >
              Marketplace
            </Button>
            <Button
              variant="secondary"
              className="rounded-xl justify-start"
              onClick={() => {
                setQuickSearchOpen(false);
                router.push("/services");
              }}
            >
              Services
            </Button>
            <Button
              variant="secondary"
              className="rounded-xl justify-start"
              onClick={() => {
                setQuickSearchOpen(false);
                router.push("/devices");
              }}
            >
              Smart Home
            </Button>
            <Button
              variant="secondary"
              className="rounded-xl justify-start"
              onClick={() => {
                setQuickSearchOpen(false);
                router.push("/social");
              }}
            >
              Community Feed
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function QuickActionItem({ icon: Icon, label, badge, isAd, bg, color, isSolid, hidden, onClick }: { icon: any, label: string, badge?: string, isAd?: boolean, bg?: string, color?: string, isSolid?: boolean, hidden?: boolean, onClick?: () => void }) {
  if (hidden) return null;
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group animate-in fade-in zoom-in duration-300" onClick={onClick}>
      <div className={`w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-[24px] flex items-center justify-center shadow-sm border border-transparent transition-transform group-hover:scale-105 group-hover:shadow-md ${bg || 'bg-card border-border/40'}`}>
        {isAd ? (
          <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-[24px] flex flex-col items-center justify-center text-[8px] p-1 text-center font-bold relative overflow-hidden shadow-sm">
            <span className="z-10 text-black leading-tight drop-shadow-sm">Pet Samples FREE!</span>
            <span className="absolute top-1 left-1 bg-black/80 text-white px-1 rounded-[4px] text-[6px]">AD</span>
            <SafeImage src="https://github.com/shadcn.png" alt="ad" width={24} height={24} className="rounded-full mt-1 border-2 border-white shadow-sm" />
          </div>
        ) : (
          <Icon className={`w-7 h-7 md:w-8 md:h-8 ${color || 'text-foreground/80'} ${isSolid ? 'text-white' : ''}`} />
        )}

        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background shadow-sm animate-pulse">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[11px] md:text-sm font-medium text-center leading-tight text-foreground/80 group-hover:text-foreground">{label}</span>
    </div>
  )
}
