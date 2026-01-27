"use client";

import { Plus, ChevronRight, Lock, Unlock, Zap, Thermometer, Wifi, Battery, Sun, Moon, Home, Tv, Lightbulb, Power, ShieldCheck, Settings, Activity, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SafeImage } from '@/components/safe-image';
import { useToast } from '@/hooks/use-toast';
import { useMemo, useState } from 'react';

type Device = {
    id: number;
    name: string;
    type: 'Lock' | 'Light' | 'Climate' | 'Entertainment';
    statusLabel: string;
    icon: any;
    color: string;
    bg: string;
    image: string;
    isOn: boolean;
    battery?: string;
    brightness?: string;
    humidity?: string;
    power?: string;
};

const initialDevices: Device[] = [
    { id: 1, name: 'Main Door Lock', type: 'Lock', statusLabel: 'Locked', battery: '85%', icon: Lock, color: "text-green-500", bg: "bg-green-500/10", image: "/images/door.png", isOn: true },
    { id: 2, name: 'Living Room Light', type: 'Light', statusLabel: 'On', brightness: '80%', icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format&fit=crop&q=60", isOn: true },
    { id: 3, name: 'Thermostat', type: 'Climate', statusLabel: '24°C', humidity: '45%', icon: Thermometer, color: "text-blue-500", bg: "bg-blue-500/10", image: "/images/thermostat.png", isOn: true },
    { id: 4, name: 'Smart TV', type: 'Entertainment', statusLabel: 'Off', power: 'Standby', icon: Tv, color: "text-purple-500", bg: "bg-purple-500/10", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60", isOn: false }
];

const scenes = [
    { label: "Morning", icon: Sun, color: "text-orange-500", time: "7:00 AM" },
    { label: "Night Mode", icon: Moon, color: "text-indigo-500", time: "10:00 PM" },
    { label: "Away", icon: Home, color: "text-slate-500", time: "Leaving" },
    { label: "Movie Time", icon: Tv, color: "text-pink-500", time: "Manual" }
];

export default function DevicesPage() {
    const { toast } = useToast();
    const [devices, setDevices] = useState<Device[]>(initialDevices);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [query, setQuery] = useState("");

    const activeCount = useMemo(() => devices.filter((d) => d.isOn).length, [devices]);

    const filteredDevices = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return devices;
        return devices.filter((d) => `${d.name} ${d.type}`.toLowerCase().includes(q));
    }, [devices, query]);

    const toggleDevice = (id: number) => {
        setDevices((prev) =>
            prev.map((d) => {
                if (d.id !== id) return d;
                const nextOn = !d.isOn;
                const nextLabel =
                    d.type === "Lock" ? (nextOn ? "Locked" : "Unlocked") :
                        d.type === "Light" ? (nextOn ? "On" : "Off") :
                            d.type === "Entertainment" ? (nextOn ? "On" : "Off") : d.statusLabel;
                return { ...d, isOn: nextOn, statusLabel: nextLabel };
            })
        );
    };

    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8 w-full max-w-7xl mx-auto px-4 md:px-0">
            {/* Mobile actions (global mobile header handles title/search) */}
            <div className="flex items-center justify-between md:hidden">
                <Badge className="bg-primary/10 text-primary border-0 rounded-full">{activeCount} active</Badge>
                <div className="flex items-center gap-2">
                    <Button size="sm" className="rounded-full gap-2" onClick={() => setAddOpen(true)}>
                        <Plus className="w-4 h-4" /> Add
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full gap-2"
                        onClick={() => toast({ title: "Settings (demo)", description: "Device preferences would open here." })}
                    >
                        <Settings className="w-4 h-4" /> Settings
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar (Desktop) */}
                <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        {/* Scenes Card */}
                        <Card className="rounded-2xl border-border/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Quick Scenes</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-3">
                                {scenes.map((scene, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 cursor-pointer border border-transparent hover:border-primary/20 transition-all group"
                                        onClick={() => toast({ title: "Scene applied", description: `${scene.label} mode activated (demo).` })}
                                    >
                                        <scene.icon className={`w-8 h-8 ${scene.color} group-hover:scale-110 transition-transform`} />
                                        <span className="font-medium text-xs text-muted-foreground group-hover:text-primary">{scene.label}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Energy Stats */}
                        <Card className="rounded-2xl border-border/50 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50/50">
                            <CardHeader>
                                <CardTitle className="text-sm">Energy Usage</CardTitle>
                                <CardDescription>This Month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-3xl font-bold text-green-700">245</span>
                                    <span className="text-sm font-medium text-green-600 mb-1">kWh</span>
                                </div>
                                <Progress value={65} className="h-2 bg-green-200" />
                                <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                                    <Activity className="w-3 h-3" /> 12% less than last month
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Desktop Header */}
                    <div className="hidden md:flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">Good Afternoon, User</h2>
                            <p className="text-muted-foreground">{activeCount} devices are active now</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search devices..." className="w-[260px] rounded-full bg-card pl-4" />
                            </div>
                            <Button className="gap-2 rounded-full px-6" onClick={() => setAddOpen(true)}> <Plus className="w-4 h-4" /> Add Device</Button>
                        </div>
                    </div>

                    {/* System Status Banner */}
                    <div className="rounded-2xl p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
                        <div className="z-10 relative space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-medium text-green-400 uppercase tracking-wider">System Online</span>
                            </div>
                            <h3 className="text-2xl font-bold">All Security Systems Operational</h3>
                            <p className="text-slate-400 text-sm max-w-md">Your home is secure. No unusual activity detected in the last 24 hours.</p>
                        </div>
                        <ShieldCheck className="w-32 h-32 text-slate-700 absolute -right-4 -bottom-4 opacity-50" />
                    </div>

                    {/* Scenes Horizontal Scroll (Mobile) */}
                    <div className="flex md:hidden overflow-x-auto gap-4 scrollbar-hide pb-2">
                        {scenes.map((scene, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer" onClick={() => toast({ title: "Scene applied", description: `${scene.label} mode activated (demo).` })}>
                                <div className="w-16 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center shadow-sm">
                                    <scene.icon className={`w-8 h-8 ${scene.color}`} />
                                </div>
                                <span className="text-[10px] font-medium text-center">{scene.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Mobile search */}
                    <div className="md:hidden">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search devices..." className="rounded-2xl bg-card h-11" />
                            </div>
                            <Button variant="outline" className="rounded-2xl h-11 px-3" onClick={() => toast({ title: "Filters (demo)", description: "Device filters would appear here." })}>
                                <SlidersHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>


                    {/* Devices Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-lg">My Devices</h2>
                            <Button variant="ghost" size="sm" className="text-primary" onClick={() => toast({ title: "Manage devices (demo)", description: "Bulk actions and grouping would open here." })}>Manage</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredDevices.map((device) => (
                                <Card key={device.id} className="rounded-2xl overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all group bg-card cursor-pointer" onClick={() => setSelectedDevice(device)}>
                                    <div className="relative h-40 bg-muted/30 p-6 flex justify-center items-center">
                                        <SafeImage
                                            src={device.image}
                                            alt={device.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className={`absolute top-4 left-4 p-2 rounded-xl ${device.bg}`}>
                                            <device.icon className={`w-5 h-5 ${device.color}`} />
                                        </div>
                                        <Badge className={`absolute top-4 right-4 ${device.isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-500 hover:bg-slate-600'} text-white border-0`}>
                                            {device.statusLabel}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-base leading-tight">{device.name}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">{device.type}</p>
                                            </div>
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <Switch checked={device.isOn} onCheckedChange={() => toggleDevice(device.id)} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                            <div className="flex items-center gap-2">
                                                <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
                                                <span className="text-xs font-medium text-muted-foreground">Online</span>
                                            </div>
                                            <div className="flex items-center gap-2 justify-end">
                                                <Battery className="w-3.5 h-3.5 text-muted-foreground" />
                                                <span className="text-xs font-medium text-muted-foreground">{device.battery || device.brightness || device.humidity || '100%'}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Add New Device Placeholder */}
                            <Card className="rounded-2xl border border-dashed border-border shadow-none bg-transparent hover:bg-muted/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-4 min-h-[250px] group" onClick={() => setAddOpen(true)}>
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-sm text-muted-foreground group-hover:text-foreground">Add New Device</h3>
                                    <p className="text-xs text-muted-foreground/60 mt-1">Discover new devices</p>
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>

            {/* Device detail */}
            <Dialog open={!!selectedDevice} onOpenChange={(o) => !o && setSelectedDevice(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                    {selectedDevice && (
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative bg-muted aspect-[4/3] md:aspect-auto md:h-full">
                                <SafeImage src={selectedDevice.image} alt={selectedDevice.name} fill className="object-cover" />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <Badge className="bg-background/90 text-foreground border-0">{selectedDevice.type}</Badge>
                                    <Badge className={`border-0 ${selectedDevice.isOn ? "bg-green-500 text-white" : "bg-slate-500 text-white"}`}>{selectedDevice.statusLabel}</Badge>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <DialogHeader>
                                    <DialogTitle className="font-headline">{selectedDevice.name}</DialogTitle>
                                    <DialogDescription className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-primary" /> Smart controls with automation-ready actions.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-2 gap-3">
                                    <Card className="rounded-2xl border-border/50 bg-muted/20">
                                        <CardContent className="p-4 space-y-1">
                                            <p className="text-xs text-muted-foreground">Connectivity</p>
                                            <p className="font-bold">Online</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-2xl border-border/50 bg-muted/20">
                                        <CardContent className="p-4 space-y-1">
                                            <p className="text-xs text-muted-foreground">Battery / Level</p>
                                            <p className="font-bold">{selectedDevice.battery || selectedDevice.brightness || selectedDevice.humidity || "100%"}</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="secondary"
                                        className="rounded-xl"
                                        onClick={() => {
                                            toggleDevice(selectedDevice.id);
                                            toast({ title: "Updated", description: `${selectedDevice.name} toggled (demo).` });
                                        }}
                                    >
                                        <Power className="w-4 h-4 mr-2" /> Toggle
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="rounded-xl"
                                        onClick={() => toast({ title: "Automation (demo)", description: "Create rules like “Night Mode at 10 PM”." })}
                                    >
                                        <Zap className="w-4 h-4 mr-2" /> Automate
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="rounded-xl"
                                        onClick={() => toast({ title: "Diagnostics (demo)", description: "Running device health check..." })}
                                    >
                                        <Activity className="w-4 h-4 mr-2" /> Diagnostics
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="rounded-xl"
                                        onClick={() => toast({ title: "Settings (demo)", description: "Device configuration would open here." })}
                                    >
                                        <Settings className="w-4 h-4 mr-2" /> Settings
                                    </Button>
                                </div>

                                <DialogFooter className="gap-2 sm:gap-2">
                                    <Button variant="outline" className="rounded-full" onClick={() => toast({ title: "Support (demo)", description: "Connecting you to smart-home support..." })}>
                                        Support
                                    </Button>
                                    <Button className="rounded-full" onClick={() => toast({ title: "Shared access (demo)", description: "Invite family members to control this device." })}>
                                        Share access
                                    </Button>
                                </DialogFooter>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Add device */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline">Add a device</DialogTitle>
                        <DialogDescription>This is a demo flow that showcases a real mobile-app experience.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        <Input placeholder="Device name (e.g., Bedroom Light)" className="rounded-xl" />
                        <Input placeholder="Wi‑Fi network (demo)" className="rounded-xl" />
                        <Card className="rounded-2xl border-border/50 bg-muted/20">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-sm">Secure pairing</p>
                                    <p className="text-xs text-muted-foreground">Devices are paired with end-to-end encrypted keys.</p>
                                </div>
                                <Badge className="bg-primary/10 text-primary border-0">Protected</Badge>
                            </CardContent>
                        </Card>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button variant="outline" className="rounded-full" onClick={() => setAddOpen(false)}>Cancel</Button>
                        <Button
                            className="rounded-full"
                            onClick={() => {
                                setAddOpen(false);
                                toast({ title: "Device added (demo)", description: "Your device will appear after pairing completes." });
                            }}
                        >
                            Pair device
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
