"use client";

import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send, User, Bookmark, Hash, TrendingUp, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SafeImage } from '@/components/safe-image';
import { useToast } from '@/hooks/use-toast';
import { useMemo, useState } from 'react';

const stories = [
    { id: 1, user: 'You', img: 'https://github.com/shadcn.png', isUser: true },
    { id: 2, user: 'Alice', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60' },
    { id: 3, user: 'Bob', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=60' },
    { id: 4, user: 'Charlie', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60' },
    { id: 5, user: 'Diana', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60' },
    { id: 6, user: 'Evan', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60' },
];

type Post = {
    id: number;
    user: string;
    role: string;
    avatar: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    time: string;
    liked: boolean;
    verified?: boolean;
    tags?: string[];
};

const initialPosts: Post[] = [
    {
        id: 1,
        user: 'Alice Johnson',
        role: 'Resident • A-101',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60',
        content: 'The sunset view from the terrace was absolutely stunning today! 🌅 Who else caught it?',
        image: 'https://images.unsplash.com/photo-1616036740257-9449ea1f6605?w=800&auto=format&fit=crop&q=80',
        likes: 45,
        comments: 12,
        shares: 2,
        time: '2 hours ago',
        liked: true,
        verified: false,
        tags: ["#Community", "#Sunset"]
    },
    {
        id: 2,
        user: 'Green Valley Admin',
        role: 'Management',
        avatar: 'https://github.com/shadcn.png',
        content: '📢 Important: The swimming pool maintenance is scheduled for tomorrow (16th Jan) from 10 AM to 4 PM. We apologize for the inconvenience.',
        likes: 89,
        comments: 4,
        shares: 15,
        time: '5 hours ago',
        liked: false,
        verified: true,
        tags: ["#PoolMaintenance", "#Important"]
    },
    {
        id: 3,
        user: 'Yoga Club',
        role: 'Community Group',
        avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&auto=format&fit=crop&q=60',
        content: 'Morning yoga session at the park! 🧘‍♀️ Join us every day at 6:30 AM. Fresh air and good vibes guaranteed!',
        image: '/images/yoga.png',
        likes: 34,
        comments: 8,
        shares: 5,
        time: 'Yesterday',
        liked: false,
        verified: true,
        tags: ["#YogaClub", "#Wellness"]
    }
];

export default function SocialPage() {
    const { toast } = useToast();
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [query, setQuery] = useState("");
    const [composerOpen, setComposerOpen] = useState(false);
    const [postViewer, setPostViewer] = useState<Post | null>(null);
    const [savedOnly, setSavedOnly] = useState(false);
    const [savedIds, setSavedIds] = useState<Set<number>>(() => new Set([2]));
    const [draftText, setDraftText] = useState("");
    const [draftImage, setDraftImage] = useState("");

    const filteredPosts = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((p) => {
            if (savedOnly && !savedIds.has(p.id)) return false;
            if (!q) return true;
            const hay = `${p.user} ${p.role} ${p.content} ${(p.tags ?? []).join(" ")}`.toLowerCase();
            return hay.includes(q);
        });
    }, [posts, query, savedOnly, savedIds]);

    const toggleSaved = (id: number) => {
        setSavedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleLike = (id: number) => {
        setPosts((prev) =>
            prev.map((p) => {
                if (p.id !== id) return p;
                const nextLiked = !p.liked;
                return { ...p, liked: nextLiked, likes: Math.max(0, p.likes + (nextLiked ? 1 : -1)) };
            })
        );
    };

    const publishPost = () => {
        const text = draftText.trim();
        if (!text) {
            toast({ title: "Write something first", description: "Your post needs a message." });
            return;
        }
        const newPost: Post = {
            id: Date.now(),
            user: "You",
            role: "Resident • Your Flat",
            avatar: "https://github.com/shadcn.png",
            content: text,
            image: draftImage.trim() ? draftImage.trim() : undefined,
            likes: 0,
            comments: 0,
            shares: 0,
            time: "Just now",
            liked: false,
            verified: false,
            tags: ["#Update"]
        };
        setPosts((prev) => [newPost, ...prev]);
        setDraftText("");
        setDraftImage("");
        setComposerOpen(false);
        toast({ title: "Posted", description: "Your update is live in the community feed." });
    };

    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8 w-full max-w-7xl mx-auto px-4 md:px-0">

            {/* Mobile Header */}
            <div className="flex items-center justify-between py-2 sticky top-0 bg-background/95 backdrop-blur z-20 md:hidden">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold font-headline">Community Feed</h1>
                    <Badge className="bg-primary/10 text-primary border-0 text-[10px] h-5">Live</Badge>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => {
                            setSavedOnly((v) => !v);
                            toast({ title: savedOnly ? "Showing all posts" : "Showing saved posts" });
                        }}
                    >
                        <Bookmark className={`w-6 h-6 ${savedOnly ? "text-primary" : "text-foreground/80"}`} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full relative"
                        onClick={() => toast({ title: "Inbox (demo)", description: "Direct messages will appear here." })}
                    >
                        <MessageCircle className="w-6 h-6 text-foreground/80" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Feed Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Search (mobile-first) */}
                    <div className="md:hidden">
                        <div className="relative">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search posts, people, tags..."
                                className="bg-card rounded-2xl h-11"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <Badge className="bg-muted/40 text-muted-foreground border-0 text-[10px]">Ctrl K</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Stories */}
                    <div className="relative">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex w-max space-x-4 p-1">
                                {stories.map((story) => (
                                    <div
                                        key={story.id}
                                        className="flex flex-col items-center gap-1 cursor-pointer group"
                                        onClick={() => toast({ title: "Stories (demo)", description: `Opening ${story.user}'s story...` })}
                                    >
                                        <div className={`relative p-[2px] rounded-full ${story.isUser ? 'bg-muted' : 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500'}`}>
                                            <div className="bg-background rounded-full p-[2px] group-hover:scale-95 transition-transform">
                                                <Avatar className="w-16 h-16 md:w-20 md:h-20 border-2 border-background">
                                                    <AvatarImage src={story.img} className="object-cover" />
                                                    <AvatarFallback>{story.user[0]}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            {story.isUser && (
                                                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 border-2 border-background">
                                                    <Send className="w-3 h-3 rotate-45" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{story.user}</span>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="hidden" />
                        </ScrollArea>
                    </div>

                    {/* New Post Input */}
                    <Card className="rounded-2xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-4 md:p-6">
                            <div className="flex gap-4 items-center mb-4">
                                <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 ring-primary/10">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>ME</AvatarFallback>
                                </Avatar>
                                <div
                                    className="flex-1 bg-muted/30 hover:bg-muted/50 transition-colors rounded-2xl h-12 flex items-center px-4 text-sm text-muted-foreground cursor-pointer border border-border/50"
                                    onClick={() => setComposerOpen(true)}
                                >
                                    What&apos;s happening in the community?
                                </div>
                            </div>
                            <div className="flex justify-between items-center pl-14 md:pl-16">
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full px-3 h-9 text-xs gap-2"
                                        onClick={() => {
                                            setComposerOpen(true);
                                            toast({ title: "Add media", description: "Attach a photo in the composer (demo)." });
                                        }}
                                    >
                                        <ImageIcon className="w-4 h-4" /> Photo
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full px-3 h-9 text-xs gap-2"
                                        onClick={() => toast({ title: "Tagging (demo)", description: "You can tag residents/groups in the composer." })}
                                    >
                                        <User className="w-4 h-4" /> Tag
                                    </Button>
                                </div>
                                <Button
                                    size="sm"
                                    className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                                    onClick={() => setComposerOpen(true)}
                                >
                                    Post
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posts */}
                    <div className="space-y-6">
                        {filteredPosts.map((post) => (
                            <Card key={post.id} className="rounded-2xl border-border/50 shadow-sm overflow-hidden bg-card hover:shadow-md transition-shadow duration-300">
                                <CardHeader className="p-4 md:p-5 flex flex-row items-center gap-3">
                                    <Avatar className="w-10 h-10 md:w-12 md:h-12 border border-border">
                                        <AvatarImage src={post.avatar} />
                                        <AvatarFallback>{post.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm md:text-base leading-none hover:underline cursor-pointer">{post.user}</h3>
                                        <p className="text-[11px] md:text-xs text-muted-foreground mt-1">{post.role} • {post.time}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground rounded-full"
                                        onClick={() => toast({ title: "Post actions (demo)", description: "Edit, pin, report, and share options would appear here." })}
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 md:p-5 md:pt-0 space-y-3">
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/90">{post.content}</p>
                                    {!!post.tags?.length && (
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((t) => (
                                                <Badge key={t} variant="secondary" className="border-0 bg-muted/40 cursor-pointer hover:bg-primary/10" onClick={() => setQuery(t)}>
                                                    {t}
                                                </Badge>
                                            ))}
                                            {post.verified && (
                                                <Badge className="bg-emerald-500/10 text-emerald-700 border-0 flex items-center gap-1">
                                                    <Sparkles className="w-3.5 h-3.5" /> Verified
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                    {post.image && (
                                        <div className="relative w-full rounded-xl overflow-hidden shadow-sm border border-border/50 group cursor-pointer" onClick={() => setPostViewer(post)}>
                                            <SafeImage
                                                src={post.image}
                                                alt="Post content"
                                                width={800}
                                                height={600}
                                                className="object-cover w-full h-auto max-h-[500px] transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="p-2 px-4 md:px-6 border-t bg-muted/5 flex justify-between">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleLike(post.id)}
                                        className={`gap-2 ${post.liked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 hover:bg-red-50 transition-all rounded-full px-4 h-10`}
                                    >
                                        <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                                        <span className="text-xs md:text-sm font-medium">{post.likes}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 transition-all rounded-full px-4 h-10"
                                        onClick={() => {
                                            setPostViewer(post);
                                            toast({ title: "Comments (demo)", description: "Opening post details..." });
                                        }}
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="text-xs md:text-sm font-medium">{post.comments}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-50 transition-all rounded-full px-4 h-10"
                                        onClick={() => toast({ title: "Shared (demo)", description: "Link copied to clipboard in a real app." })}
                                    >
                                        <Share2 className="w-5 h-5" />
                                        <span className="text-xs md:text-sm font-medium">{post.shares}</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar (Desktop) */}
                <div className="hidden lg:col-span-4 lg:block space-y-6">
                    <Card className="rounded-2xl border-border/50 shadow-sm bg-card sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-lg">Trending in Community</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { tag: "#SummerFest2026", posts: "1.2k posts" },
                                { tag: "#PoolMaintenance", posts: "45 posts" },
                                { tag: "#LostKeys", posts: "12 posts" },
                                { tag: "#YogaClub", posts: "89 posts" }
                            ].map((topic, i) => (
                                <div key={i} className="flex items-center justify-between cursor-pointer group" onClick={() => setQuery(topic.tag)}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Hash className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">{topic.tag}</p>
                                            <p className="text-xs text-muted-foreground">{topic.posts}</p>
                                        </div>
                                    </div>
                                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-border/50 shadow-sm bg-card">
                        <CardHeader>
                            <CardTitle className="text-lg">Suggested People</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">New Resident {i + 1}</p>
                                            <p className="text-xs text-muted-foreground">Block B</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="rounded-full text-xs h-7 px-3" onClick={() => toast({ title: "Followed (demo)", description: `You will now see updates from New Resident ${i + 1}.` })}>
                                        Follow
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile FAB */}
            <div className="fixed bottom-24 right-4 z-40 md:hidden">
                <Button size="icon" className="h-14 w-14 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all" onClick={() => setComposerOpen(true)}>
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            {/* Composer */}
            <Dialog open={composerOpen} onOpenChange={setComposerOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline">Create a post</DialogTitle>
                        <DialogDescription>Share updates, photos, or community announcements.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        <Textarea
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            placeholder="What would you like to share today?"
                            className="min-h-[120px] rounded-xl"
                        />
                        <Input
                            value={draftImage}
                            onChange={(e) => setDraftImage(e.target.value)}
                            placeholder="Optional: paste an image URL (demo)"
                            className="rounded-xl"
                        />
                        <div className="flex flex-wrap gap-2">
                            {["#SummerFest2026", "#YogaClub", "#Maintenance", "#LostAndFound"].map((t) => (
                                <Badge
                                    key={t}
                                    variant="secondary"
                                    className="border-0 bg-muted/40 cursor-pointer hover:bg-primary/10"
                                    onClick={() => setDraftText((v) => (v.includes(t) ? v : `${v}${v ? " " : ""}${t}`))}
                                >
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button variant="outline" className="rounded-full" onClick={() => setComposerOpen(false)}>Cancel</Button>
                        <Button className="rounded-full" onClick={publishPost}>Post</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Post Viewer */}
            <Dialog open={!!postViewer} onOpenChange={(o) => !o && setPostViewer(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                    {postViewer && (
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative bg-muted">
                                <SafeImage
                                    src={postViewer.image || "/images/placeholder.svg"}
                                    alt="Post media"
                                    width={900}
                                    height={900}
                                    className="object-cover w-full h-full max-h-[520px]"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border border-border">
                                        <AvatarImage src={postViewer.avatar} />
                                        <AvatarFallback>{postViewer.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="font-semibold truncate">{postViewer.user}</p>
                                        <p className="text-xs text-muted-foreground">{postViewer.role} • {postViewer.time}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-foreground/90 leading-relaxed">{postViewer.content}</p>
                                <div className="flex flex-wrap gap-2">
                                    {postViewer.tags?.map((t) => (
                                        <Badge key={t} variant="secondary" className="border-0 bg-muted/40 cursor-pointer" onClick={() => setQuery(t)}>
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-2 pt-2">
                                    <Button variant="secondary" className="rounded-xl" onClick={() => toggleLike(postViewer.id)}>
                                        <Heart className={`w-4 h-4 mr-2 ${postViewer.liked ? "fill-current text-red-500" : ""}`} />
                                        Like
                                    </Button>
                                    <Button variant="secondary" className="rounded-xl" onClick={() => toast({ title: "Comments (demo)", description: "Comment threads will appear here." })}>
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Comment
                                    </Button>
                                    <Button variant="secondary" className="rounded-xl" onClick={() => toast({ title: "Shared (demo)", description: "Share sheet will open on mobile." })}>
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <Button
                                        variant="outline"
                                        className="rounded-full"
                                        onClick={() => {
                                            toggleSaved(postViewer.id);
                                            toast({ title: savedIds.has(postViewer.id) ? "Removed from saved" : "Saved", description: "You can view saved posts anytime." });
                                        }}
                                    >
                                        <Bookmark className={`w-4 h-4 mr-2 ${savedIds.has(postViewer.id) ? "fill-current" : ""}`} />
                                        {savedIds.has(postViewer.id) ? "Saved" : "Save"}
                                    </Button>
                                    <Button variant="link" className="text-primary" onClick={() => toast({ title: "Report (demo)", description: "Moderation tools would open here." })}>
                                        Report
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
