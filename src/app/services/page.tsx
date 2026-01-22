"use client";

import { Search, ShoppingCart, Wrench, Package, Car, HeartPulse, ChevronRight, Star, Clock, ShieldCheck, Phone, Filter, Sparkles, BadgeCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { SafeImage } from '@/components/safe-image';
import { useToast } from '@/hooks/use-toast';
import { useMemo, useState } from 'react';

const categories = [
    { label: 'Cleaning', icon: Wrench, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: 'Movers', icon: Package, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: 'Transport', icon: Car, color: "text-green-500", bg: "bg-green-500/10" },
    { label: 'Repair', icon: Wrench, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: 'Health', icon: HeartPulse, color: "text-red-500", bg: "bg-red-500/10" }
];

type Service = {
    id: number;
    title: string;
    provider: string;
    image: string;
    rating: string;
    reviews: string;
    price: string;
    time: string;
    tag?: string;
    category: string;
    verified?: boolean;
    description?: string;
};

const topServices: Service[] = [
    {
        id: 1,
        title: 'Deep Home Cleaning',
        provider: 'Urban Company',
        image: '/images/deep_cleaning.png',
        rating: '4.8',
        reviews: '(1.2k)',
        price: '₹499',
        time: '60 mins',
        tag: 'Bestseller',
        category: 'Cleaning',
        verified: true,
        description: 'Deep cleaning for kitchen, washrooms, and living areas. Includes eco-friendly supplies.'
    },
    {
        id: 2,
        title: 'AC Service & Repair',
        provider: 'CoolFix Masters',
        image: '/images/ac_repair.png',
        rating: '4.5',
        reviews: '(850)',
        price: '₹599',
        time: '45 mins',
        tag: 'Summer Special',
        category: 'Repair',
        verified: true,
        description: 'AC servicing, gas check, and minor repairs. Professional diagnostics included.'
    },
    {
        id: 3,
        title: 'Sofa Cleaning',
        provider: 'CleanPro Services',
        image: '/images/sofa_cleaning.png',
        rating: '4.7',
        reviews: '(500+)',
        price: '₹399',
        time: '30 mins',
        category: 'Cleaning',
        verified: true,
        description: 'Foam + vacuum cleaning for fabric sofas. Removes stains and odors.'
    },
    {
        id: 4,
        title: 'Bathroom Cleaning',
        provider: 'QuickClean',
        image: '/images/bathroom_cleaning.png',
        rating: '4.6',
        reviews: '(2.1k)',
        price: '₹299',
        time: '40 mins',
        category: 'Cleaning',
        verified: true,
        description: 'Tiles, fittings, and drain cleaning with safe disinfectants.'
    },
    {
        id: 5,
        title: 'Pest Control',
        provider: 'PestShield',
        image: '/images/pest_control.png',
        rating: '4.9',
        reviews: '(1.5k)',
        price: '₹899',
        time: '90 mins',
        tag: 'Safety First',
        category: 'Repair',
        verified: true,
        description: 'Anti-cockroach + ant treatment. Safe for kids and pets with guidelines.'
    },
    {
        id: 6,
        title: 'House Painting',
        provider: 'Colors & Co',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60',
        rating: '4.7',
        reviews: '(400+)',
        price: '₹2,499',
        time: '3-4 Days',
        category: 'Repair',
        verified: true,
        description: 'Wall painting with premium materials. Color consultation included.'
    }
];

export default function ServicesPage() {
    const { toast } = useToast();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [query, setQuery] = useState("");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState<Service[]>(() => topServices.slice(0, 2));

    const services = useMemo(() => {
        const q = query.trim().toLowerCase();
        return topServices.filter((s) => {
            if (selectedCategory !== "All" && s.category !== selectedCategory) return false;
            if (!q) return true;
            const hay = `${s.title} ${s.provider} ${s.category} ${s.tag ?? ""}`.toLowerCase();
            return hay.includes(q);
        });
    }, [query, selectedCategory]);

    const addToCart = (s: Service) => {
        setCart((prev) => {
            if (prev.some((x) => x.id === s.id)) return prev;
            return [...prev, s];
        });
        toast({ title: "Added to cart", description: s.title });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((x) => x.id !== id));
    };

    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8 w-full max-w-7xl mx-auto px-4 md:px-0">
            {/* Mobile Header */}
            <div className="flex items-center justify-between py-2 sticky top-0 bg-background/95 backdrop-blur z-20 md:hidden">
                <h1 className="text-xl font-bold font-headline">Services</h1>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast({ title: "Search", description: "Use the search bar below to find services." })}>
                        <Search className="w-6 h-6 text-foreground/80" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full relative" onClick={() => setCartOpen(true)}>
                        <ShoppingCart className="w-6 h-6 text-foreground/80" />
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-primary-foreground text-[10px]">{cart.length}</Badge>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar (Desktop) */}
                <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        <Card className="rounded-2xl border-border/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5" /> Service Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {categories.map((cat, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b last:border-0 border-border/40 ${selectedCategory === cat.label ? "bg-primary/5" : ""}`}
                                        onClick={() => setSelectedCategory(cat.label)}
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}>
                                            <cat.icon className={`w-5 h-5 ${cat.color}`} />
                                        </div>
                                        <span className="font-medium text-sm flex-1">{cat.label}</span>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                ))}
                                <div
                                    className={`flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedCategory === "All" ? "bg-primary/5" : ""}`}
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="font-medium text-sm flex-1">All Services</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Support Card */}
                        <Card className="rounded-2xl border-border/50 shadow-sm bg-blue-50/50">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-sm">Need Help?</h3>
                                <p className="text-xs text-muted-foreground mt-1 mb-3">Call our support text for custom requirements.</p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                                    onClick={() => toast({ title: "Support (demo)", description: "Calling +91-90000-00000..." })}
                                >
                                    Call Support
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Desktop Header */}
                    <div className="hidden md:flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-lg">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for services (e.g. cleaning, repair)..." className="pl-9 bg-card" />
                        </div>
                        <Button variant="secondary" className="gap-2 rounded-full" onClick={() => setCartOpen(true)}>
                            <ShoppingCart className="w-4 h-4" /> Cart ({cart.length})
                        </Button>
                    </div>

                    {/* Hero Banner */}
                    <div className="relative w-full aspect-[21/9] md:aspect-[21/7] rounded-3xl overflow-hidden shadow-lg group">
                        <SafeImage
                            src="/images/services_banner.png"
                            alt="Service Banner"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 md:p-12">
                            <div className="max-w-md text-white space-y-4">
                                <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 border-0 font-bold px-3 py-1">Limited Offer</Badge>
                                <h2 className="text-3xl md:text-5xl font-bold leading-tight">Get 20% off on all <br /> <span className="text-yellow-400">Home Repairs</span></h2>
                                <p className="text-white/80 text-sm md:text-lg">Expert professionals at your doorstep within 60 minutes. Guaranteed satisfaction.</p>
                                <Button
                                    size="lg"
                                    className="rounded-full bg-white text-black hover:bg-white/90 font-bold px-8"
                                    onClick={() => {
                                        setSelectedCategory("Repair");
                                        toast({ title: "Repair services", description: "Showing the best repair professionals near you." });
                                    }}
                                >
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile search bar */}
                    <div className="md:hidden">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services..." className="pl-9 bg-card h-11 rounded-2xl" />
                            </div>
                            <Button variant="outline" className="rounded-2xl h-11 px-3" onClick={() => setCartOpen(true)}>
                                <ShoppingCart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Categories Scroll */}
                    <div className="flex md:hidden overflow-x-auto gap-4 scrollbar-hide pb-2">
                        {categories.map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer" onClick={() => setSelectedCategory(cat.label)}>
                                <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center shadow-sm ${selectedCategory === cat.label ? "ring-2 ring-primary/40" : ""}`}>
                                    <cat.icon className={`w-7 h-7 ${cat.color}`} />
                                </div>
                                <span className="text-[10px] font-medium text-center">{cat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Trending Services Grid */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Popular Services</h2>
                            <Button variant="link" className="text-primary text-sm h-auto p-0" onClick={() => toast({ title: "View all (demo)", description: "A full services catalog would open here." })}>View All</Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <Card
                                    key={service.id}
                                    className="rounded-2xl overflow-hidden border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group bg-card cursor-pointer"
                                    onClick={() => setSelectedService(service)}
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <SafeImage
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {service.tag && (
                                            <Badge className="absolute top-3 left-3 bg-white/90 text-black font-bold shadow-sm backdrop-blur-md hover:bg-white">{service.tag}</Badge>
                                        )}
                                        {service.verified && (
                                            <Badge className="absolute top-3 right-3 bg-emerald-500/90 text-white border-0 gap-1">
                                                <BadgeCheck className="w-3.5 h-3.5" /> Verified
                                            </Badge>
                                        )}
                                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {service.time}
                                        </div>
                                    </div>
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{service.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> {service.provider}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-lg">{service.price}</span>
                                                <span className="text-xs text-muted-foreground line-through">₹{parseInt(service.price.replace('₹', '')) + 200}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                                            <div className="flex items-center gap-1 bg-green-500/10 text-green-700 px-2 py-1 rounded font-bold text-xs">
                                                <span>{service.rating}</span>
                                                <Star className="w-3 h-3 fill-current" />
                                            </div>
                                            <span className="text-xs text-muted-foreground">{service.reviews} reviews</span>
                                            <Button
                                                size="sm"
                                                className="ml-auto rounded-full px-5 font-semibold"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(service);
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="py-8 space-y-6">
                        <h2 className="text-xl font-bold text-center">Why choose ResidentHub Services?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-card p-6 rounded-2xl border border-border/50 text-center space-y-2 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <ShieldCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <h4 className="font-bold text-sm">Safe & Verified</h4>
                                <p className="text-xs text-muted-foreground">Every professional is background checked and verified for your peace of mind.</p>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border border-border/50 text-center space-y-2 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                </div>
                                <h4 className="font-bold text-sm">Punctual & Reliable</h4>
                                <p className="text-xs text-muted-foreground">We value your time. Our professionals arrive within 60 minutes of booking.</p>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border border-border/50 text-center space-y-2 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Star className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-sm">Quality Guaranteed</h4>
                                <p className="text-xs text-muted-foreground">Not satisfied with the service? We&apos;ll re-do it for free, no questions asked.</p>
                            </div>
                        </div>
                    </div>

                    {/* Mock Testimonial Section */}
                    <div className="rounded-3xl bg-muted/30 p-8 border border-border/50 text-center space-y-4">
                        <h3 className="font-bold text-lg">Trusted by neighbors in your community</h3>
                        <div className="flex justify-center -space-x-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-background relative overflow-hidden">
                                    <SafeImage src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">&quot;The cleaning service was absolutely top-notch. Highly recommended!&quot;</p>
                        <p className="text-xs font-bold">- Sarah from Block A</p>
                    </div>
                </div>
            </div>

            {/* Service detail / booking */}
            <Dialog open={!!selectedService} onOpenChange={(o) => !o && setSelectedService(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                    {selectedService && (
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative bg-muted aspect-[4/3] md:aspect-auto md:h-full">
                                <SafeImage src={selectedService.image} alt={selectedService.title} fill className="object-cover" />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <Badge className="bg-background/90 text-foreground border-0">{selectedService.category}</Badge>
                                    <Badge className="bg-primary text-primary-foreground border-0">{selectedService.price}</Badge>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <DialogHeader>
                                    <DialogTitle className="font-headline">{selectedService.title}</DialogTitle>
                                    <DialogDescription className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" /> {selectedService.provider} • {selectedService.rating}★ {selectedService.reviews}
                                    </DialogDescription>
                                </DialogHeader>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {selectedService.description ?? "Verified professionals with quality assurance and on-time arrival."}
                                </p>
                                <Separator />
                                <div className="grid grid-cols-2 gap-3">
                                    <Card className="rounded-2xl border-border/50 bg-muted/20">
                                        <CardContent className="p-4 space-y-1">
                                            <p className="text-xs text-muted-foreground">ETA</p>
                                            <p className="font-bold">Within 60 min</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-2xl border-border/50 bg-muted/20">
                                        <CardContent className="p-4 space-y-1">
                                            <p className="text-xs text-muted-foreground">Warranty</p>
                                            <p className="font-bold">7-day support</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <DialogFooter className="gap-2 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        className="rounded-full"
                                        onClick={() => toast({ title: "Schedule (demo)", description: "A date/time picker would open here." })}
                                    >
                                        Schedule
                                    </Button>
                                    <Button
                                        className="rounded-full"
                                        onClick={() => {
                                            addToCart(selectedService);
                                            setSelectedService(null);
                                            setCartOpen(true);
                                        }}
                                    >
                                        Book now
                                    </Button>
                                </DialogFooter>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Cart */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetContent side="right" className="w-[92vw] sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="font-headline">Your Cart</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-3">
                        {cart.length === 0 ? (
                            <Card className="rounded-2xl border-border/50 bg-muted/20">
                                <CardContent className="p-6 text-center space-y-2">
                                    <ShoppingCart className="w-8 h-8 mx-auto text-muted-foreground" />
                                    <p className="font-bold">Cart is empty</p>
                                    <p className="text-sm text-muted-foreground">Add services to book in one go.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            cart.map((s) => (
                                <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl border border-border/50 bg-card">
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted">
                                        <SafeImage src={s.image} alt={s.title} fill className="object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-sm truncate">{s.title}</p>
                                        <p className="text-xs text-muted-foreground truncate">{s.provider}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm">{s.price}</p>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(s.id)}>
                                            <X className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                        <Separator />
                        <Button
                            className="w-full rounded-xl"
                            disabled={cart.length === 0}
                            onClick={() => toast({ title: "Checkout (demo)", description: "Payment flow would open here." })}
                        >
                            Proceed to checkout
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
