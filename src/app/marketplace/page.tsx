"use client";

import { Search, MessageSquare, Bookmark, Plus, TrendingUp, Filter, Tag, MapPin, SlidersHorizontal, X, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { SafeImage } from '@/components/safe-image';
import { useToast } from '@/hooks/use-toast';

const categories = ["All", "Furniture", "Electronics", "Fashion", "Books", "Vehicles", "Services", "Sports", "Toys"];
const conditions = ["New", "Like New", "Good", "Fair", "Used", "Excellent", "Service", "Poor"];

type MarketplaceItem = {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    image: string;
    condition: string;
    listingTime: string;
    category: string;
    verified?: boolean;
    description?: string;
    sellerName?: string;
    sellerPhone?: string;
};

function parsePrice(price: string) {
    const n = Number(price.replace(/[^\d]/g, ""));
    return Number.isFinite(n) ? n : 0;
}

const initialMarketplaceItems: MarketplaceItem[] = [
    {
        id: 1,
        title: 'Albony Sofa Bed, Premium Fabric',
        subtitle: 'Shubhashish Geeta, Jaisingpura',
        price: '₹ 7,000',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        condition: 'Good',
        listingTime: '2 hours ago',
        category: 'Furniture',
        verified: true,
        sellerName: 'Shubhashish',
        sellerPhone: '+91 98XXXXXX12',
        description: 'Premium fabric sofa bed in excellent condition. Minor usage marks, no tears. Pickup preferred.'
    },
    {
        id: 2,
        title: 'Fully working fridge available',
        subtitle: 'The Destination, Vaishali Nagar',
        price: '₹ 5,000',
        image: '/images/fridge.png',
        condition: 'Like New',
        listingTime: '5 hours ago',
        category: 'Electronics',
        verified: true,
        sellerName: 'Rohit',
        sellerPhone: '+91 97XXXXXX88',
        description: 'Single-door fridge, fully working. Energy efficient, clean and maintained. Available for quick pickup.'
    },
    {
        id: 3,
        title: 'Bar fridge for sale 2,000 only',
        subtitle: 'The Destination, Vaishali Nagar',
        price: '₹ 2,000',
        image: '/images/fridge.png',
        condition: 'Used',
        listingTime: '1 day ago',
        category: 'Electronics',
        sellerName: 'Neha',
        sellerPhone: '+91 90XXXXXX41',
        description: 'Compact bar fridge. Cools well. Some cosmetic scratches. Great for office/room use.'
    },
    {
        id: 4,
        title: 'Drawing/ Painting classes',
        subtitle: 'Mahima Shubh Nilay, Jaisingpura',
        price: '₹ 150',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        condition: 'Service',
        listingTime: 'Just now',
        category: 'Services',
        verified: true,
        sellerName: 'Mahima',
        sellerPhone: '+91 99XXXXXX05',
        description: 'Beginner-friendly drawing & painting classes for kids and adults. Weekend batches available.'
    },
    {
        id: 5,
        title: 'Study Table & Chair',
        subtitle: 'Block B, Apt 302',
        price: '₹ 3,500',
        image: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=500&auto=format&fit=crop&q=60',
        condition: 'Fair',
        listingTime: '3 days ago',
        category: 'Furniture',
        sellerName: 'Arjun',
        sellerPhone: '+91 88XXXXXX73',
        description: 'Solid table + chair set. Sturdy. Some wear on edges. Ideal for study/home office.'
    },
    {
        id: 6,
        title: 'Mountain Bike',
        subtitle: 'Green Valley, Phase 2',
        price: '₹ 8,000',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&auto=format&fit=crop&q=60',
        condition: 'Excellent',
        listingTime: '1 week ago',
        category: 'Sports',
        verified: true,
        sellerName: 'Vikram',
        sellerPhone: '+91 93XXXXXX60',
        description: 'Well-maintained mountain bike. Smooth gears, recently serviced. Test ride available.'
    }
];

export default function MarketplacePage() {
    const { toast } = useToast();
    const [items, setItems] = useState<MarketplaceItem[]>(initialMarketplaceItems);
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [savedIds, setSavedIds] = useState<Set<number>>(() => new Set());
    const [showSavedOnly, setShowSavedOnly] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
    const [sellOpen, setSellOpen] = useState(false);

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();
        const min = minPrice ? Number(minPrice) : undefined;
        const max = maxPrice ? Number(maxPrice) : undefined;

        return items.filter((item) => {
            if (showSavedOnly && !savedIds.has(item.id)) return false;
            if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
            if (selectedConditions.length > 0 && !selectedConditions.includes(item.condition)) return false;

            const p = parsePrice(item.price);
            if (typeof min === "number" && !Number.isNaN(min) && p < min) return false;
            if (typeof max === "number" && !Number.isNaN(max) && p > max) return false;

            if (q) {
                const hay = `${item.title} ${item.subtitle} ${item.category} ${item.condition}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }

            return true;
        });
    }, [items, maxPrice, minPrice, query, savedIds, selectedCategory, selectedConditions, showSavedOnly]);

    const savedCount = useMemo(() => Array.from(savedIds).length, [savedIds]);

    const toggleSaved = (id: number) => {
        setSavedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const resetFilters = () => {
        setQuery("");
        setSelectedCategory("All");
        setSelectedConditions([]);
        setMinPrice("");
        setMaxPrice("");
        setShowSavedOnly(false);
    };

    const loadMore = () => {
        // Mock loading more items
        const moreItems: MarketplaceItem[] = [
            { id: 7, title: 'IKEA Bookshelf', subtitle: 'Block C, 505', price: '₹ 2,500', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&auto=format&fit=crop&q=60', condition: 'Like New', listingTime: '2 weeks ago', category: 'Furniture', sellerName: 'Sana', sellerPhone: '+91 91XXXXXX22', description: 'Minimalist bookshelf. Strong shelves, clean finish. Easy pickup.' },
            { id: 8, title: 'Gaming Monitor 27"', subtitle: 'Block A, 101', price: '₹ 12,000', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60', condition: 'Excellent', listingTime: '3 days ago', category: 'Electronics', verified: true, sellerName: 'Kunal', sellerPhone: '+91 98XXXXXX91', description: '27" monitor, crisp display. Includes stand and HDMI cable. No dead pixels.' },
            { id: 9, title: 'Plant Stand', subtitle: 'Block D, 202', price: '₹ 800', image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500&auto=format&fit=crop&q=60', condition: 'Good', listingTime: '1 month ago', category: 'Furniture', sellerName: 'Isha', sellerPhone: '+91 94XXXXXX10', description: 'Wooden plant stand, stable and stylish. Great for balcony/indoor plants.' },
            { id: 10, title: 'Kids Stroller', subtitle: 'Block B, 110', price: '₹ 4,000', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop&q=60', condition: 'Used', listingTime: '5 days ago', category: 'Toys', sellerName: 'Priya', sellerPhone: '+91 90XXXXXX77', description: 'Stroller in usable condition. Smooth wheels. Foldable and compact.' }
        ];
        setItems((prev) => [...prev, ...moreItems]);
        toast({ title: "More listings loaded", description: "Showing items from nearby societies." });
    };

    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8 w-full max-w-7xl mx-auto px-4 md:px-0">

            <div className="flex items-center justify-between py-2 sticky top-0 bg-background/95 backdrop-blur z-20 md:hidden">
                <h1 className="text-xl font-bold font-headline">Marketplace</h1>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setShowSavedOnly((v) => !v)}
                    >
                        <Bookmark className={`w-6 h-6 ${showSavedOnly ? "text-primary" : "text-foreground/80"}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSellOpen(true)}>
                        <Plus className="w-6 h-6 text-foreground/80" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                        <MessageSquare className="w-6 h-6 text-foreground/80" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters (Desktop) */}
                <div className="hidden lg:block space-y-6">
                    <Card className="rounded-2xl border-border/50 shadow-sm sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Search</h4>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “fridge”, “sofa”, “bike”..." className="pl-9 h-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Categories</h4>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <Badge
                                            key={cat}
                                            variant="secondary"
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`cursor-pointer border-0 ${selectedCategory === cat ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-primary/20"}`}
                                        >
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Price Range</h4>
                                <div className="flex items-center gap-2">
                                    <Input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" type="number" className="h-9" />
                                    <span className="text-muted-foreground">-</span>
                                    <Input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" type="number" className="h-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Condition</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {conditions.map((c) => {
                                        const checked = selectedConditions.includes(c);
                                        return (
                                            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer rounded-lg px-2 py-1 hover:bg-muted/40">
                                                <Checkbox
                                                    checked={checked}
                                                    onCheckedChange={(v) => {
                                                        setSelectedConditions((prev) => {
                                                            const next = new Set(prev);
                                                            if (v) next.add(c);
                                                            else next.delete(c);
                                                            return Array.from(next);
                                                        });
                                                    }}
                                                />
                                                <span className="text-foreground/80">{c}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button className="w-full" onClick={() => toast({ title: "Filters applied", description: `Showing ${filteredItems.length} result(s).` })}>
                                    Apply
                                </Button>
                                <Button variant="outline" className="h-10 px-3" onClick={resetFilters} title="Reset filters">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <Button
                                variant={showSavedOnly ? "default" : "secondary"}
                                className="w-full gap-2"
                                onClick={() => setShowSavedOnly((v) => !v)}
                            >
                                <Bookmark className="w-4 h-4" /> Saved {savedCount > 0 ? `(${savedCount})` : ""}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Desktop Header/Search */}
                    <div className="hidden md:flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-lg">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for items, services, or sellers..." className="pl-9 bg-card" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={showSavedOnly ? "default" : "secondary"}
                                className="gap-2"
                                onClick={() => setShowSavedOnly((v) => !v)}
                            >
                                <Bookmark className="w-4 h-4" /> Saved {savedCount > 0 ? `(${savedCount})` : ""}
                            </Button>
                            <Button className="gap-2" onClick={() => setSellOpen(true)}> <Plus className="w-4 h-4" /> Sell Item</Button>
                        </div>
                    </div>

                    {/* Horizontal Category Scroll (Mobile) */}
                    <div className="md:hidden">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex w-max space-x-2 p-1 px-1">
                                {categories.map((cat, i) => (
                                    <Button
                                        key={i}
                                        variant={selectedCategory === cat ? "default" : "outline"}
                                        size="sm"
                                        className={`rounded-full shadow-sm text-xs h-8 ${selectedCategory === cat ? "shadow-md" : "border-border/60"}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="hidden" />
                        </ScrollArea>
                    </div>

                    {/* Mobile quick filters */}
                    <div className="md:hidden">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search listings..." className="pl-9 bg-card h-10" />
                            </div>
                            <Button variant="outline" className="rounded-xl h-10 px-3" onClick={() => toast({ title: "Tip", description: "Use the desktop sidebar for advanced filters." })}>
                                <SlidersHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Result summary */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-base md:text-lg font-bold">Listings</h2>
                            <Badge variant="secondary" className="border-0 bg-muted/50 text-foreground/80">
                                {filteredItems.length} result(s)
                            </Badge>
                            {(query || selectedCategory !== "All" || selectedConditions.length > 0 || minPrice || maxPrice || showSavedOnly) && (
                                <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground" onClick={resetFilters}>
                                    Clear all
                                </Button>
                            )}
                        </div>
                        <Badge className="hidden md:inline-flex bg-primary/10 text-primary border-0 gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> Safer trades with verified sellers
                        </Badge>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredItems.map((item) => (
                            <Card
                                key={item.id}
                                className="overflow-hidden border border-border/50 shadow-sm rounded-2xl group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full bg-card"
                                onClick={() => setSelectedItem(item)}
                            >
                                <div className="aspect-[4/3] md:aspect-square relative bg-muted overflow-hidden">
                                    <SafeImage
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-2 right-2 flex items-center gap-2">
                                        {item.verified && (
                                            <Badge className="bg-emerald-500/90 text-white border-0 text-[10px] gap-1">
                                                <ShieldCheck className="w-3 h-3" /> Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <Badge className="absolute top-2 left-2 bg-background/90 text-foreground text-[10px] font-medium backdrop-blur-md shadow-sm border-0 group-hover:bg-background group-hover:text-foreground">
                                        {item.condition}
                                    </Badge>
                                    <Badge className="absolute bottom-2 right-2 bg-primary text-primary-foreground font-bold shadow-sm border-0 text-sm">
                                        {item.price}
                                    </Badge>
                                </div>
                                <CardContent className="p-3 md:p-4 bg-card flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm md:text-base leading-tight mb-1 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-[10px] md:text-sm text-muted-foreground truncate flex items-center gap-1 mb-2">
                                            <MapPin className="w-3 h-3" /> {item.subtitle}
                                        </p>
                                        <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-1">{item.category}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                        <span className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                                            <Tag className="w-3 h-3" /> {item.listingTime}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={`h-7 w-7 ${savedIds.has(item.id) ? "text-primary" : "text-muted-foreground"} hover:text-primary`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSaved(item.id);
                                                toast({ title: savedIds.has(item.id) ? "Removed from saved" : "Saved", description: item.title });
                                            }}
                                        >
                                            <Bookmark className={`w-3.5 h-3.5 ${savedIds.has(item.id) ? "fill-current" : ""}`} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Empty state */}
                    {filteredItems.length === 0 && (
                        <Card className="rounded-2xl border-border/50 shadow-sm bg-card">
                            <CardContent className="p-8 text-center space-y-3">
                                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Search className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg">No results found</h3>
                                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                    Try changing filters, expanding your price range, or clearing saved-only mode.
                                </p>
                                <div className="flex items-center justify-center gap-2 pt-2">
                                    <Button className="rounded-full px-6" onClick={resetFilters}>Clear filters</Button>
                                    <Button variant="outline" className="rounded-full px-6" onClick={loadMore}>Load nearby items</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* View More / Trend */}
                    {items.length <= 6 && (
                        <Card className="rounded-2xl border-border/50 shadow-sm bg-gradient-to-r from-primary/10 to-transparent cursor-pointer hover:bg-primary/15 transition-colors" onClick={loadMore}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-sm md:text-base">View Items from Nearby Societies</span>
                                    <span className="text-xs md:text-sm text-muted-foreground">Expand search radius to 5km</span>
                                </div>
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="fixed bottom-24 right-4 z-40 md:hidden">
                        <Button size="icon" className="h-14 w-14 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all" onClick={() => setSellOpen(true)}>
                            <Plus className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Item Detail */}
            <Dialog open={!!selectedItem} onOpenChange={(o) => !o && setSelectedItem(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                    {selectedItem && (
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-muted">
                                <SafeImage
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <Badge className="bg-background/90 text-foreground border-0">{selectedItem.category}</Badge>
                                    <Badge className="bg-primary text-primary-foreground border-0">{selectedItem.price}</Badge>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <DialogHeader>
                                    <DialogTitle className="font-headline">{selectedItem.title}</DialogTitle>
                                    <DialogDescription className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> {selectedItem.subtitle}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="border-0 bg-muted/50">{selectedItem.condition}</Badge>
                                    {selectedItem.verified && (
                                        <Badge className="bg-emerald-500/10 text-emerald-700 border-0 gap-1">
                                            <ShieldCheck className="w-4 h-4" /> Verified seller
                                        </Badge>
                                    )}
                                    <Badge variant="secondary" className="border-0 bg-muted/50">{selectedItem.listingTime}</Badge>
                                </div>

                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {selectedItem.description ?? "Well-maintained item, available for quick pickup. Contact the seller for details."}
                                </p>

                                <Separator />

                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Seller</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{selectedItem.sellerName ?? "Community Member"}</p>
                                            <p className="text-xs text-muted-foreground">{selectedItem.sellerPhone ?? "Contact via in-app chat"}</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="rounded-full gap-2"
                                            onClick={() => toast({ title: "Calling is a demo", description: "In a real app, this would open the dialer / in-app call." })}
                                        >
                                            <PhoneCall className="w-4 h-4" /> Call
                                        </Button>
                                    </div>
                                </div>

                                <DialogFooter className="gap-2 sm:gap-2">
                                    <Button
                                        variant="secondary"
                                        className="rounded-full"
                                        onClick={() => {
                                            toggleSaved(selectedItem.id);
                                            toast({ title: savedIds.has(selectedItem.id) ? "Removed from saved" : "Saved", description: selectedItem.title });
                                        }}
                                    >
                                        <Bookmark className={`w-4 h-4 mr-2 ${savedIds.has(selectedItem.id) ? "fill-current" : ""}`} />
                                        {savedIds.has(selectedItem.id) ? "Saved" : "Save"}
                                    </Button>
                                    <Button
                                        className="rounded-full"
                                        onClick={() => toast({ title: "Message sent (demo)", description: "Seller will receive your request and respond shortly." })}
                                    >
                                        <MessageSquare className="w-4 h-4 mr-2" /> Message seller
                                    </Button>
                                </DialogFooter>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Sell Item (Mock) */}
            <Dialog open={sellOpen} onOpenChange={setSellOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline">Create a listing</DialogTitle>
                        <DialogDescription>Post an item for your community. This is a mock flow for the demo.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground">Title</p>
                                <Input placeholder="e.g., Study lamp, Dining table..." />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground">Price</p>
                                <Input placeholder="e.g., 1500" type="number" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground">Description</p>
                            <Input placeholder="Short description (condition, pickup, etc.)" />
                        </div>
                        <Card className="rounded-2xl border-border/50 bg-muted/20">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-sm">Safer marketplace</p>
                                    <p className="text-xs text-muted-foreground">Listings are visible only within your community.</p>
                                </div>
                                <Badge className="bg-primary/10 text-primary border-0">Community-only</Badge>
                            </CardContent>
                        </Card>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button variant="outline" className="rounded-full" onClick={() => setSellOpen(false)}>Cancel</Button>
                        <Button
                            className="rounded-full"
                            onClick={() => {
                                setSellOpen(false);
                                toast({ title: "Listing submitted (demo)", description: "Your listing will appear after moderation." });
                            }}
                        >
                            Publish listing
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
