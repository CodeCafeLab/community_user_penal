export function WelcomeHeader({ name }: { name: string }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
                {getGreeting()}, {name}!
            </h1>
            <p className="text-muted-foreground">Here’s what’s happening in your community today.</p>
        </div>
    );
}
