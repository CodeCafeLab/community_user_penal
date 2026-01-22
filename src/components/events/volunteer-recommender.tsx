'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recommendVolunteerActivities } from '@/ai/flows/recommend-volunteer-activities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

const volunteerSchema = z.object({
  pastVolunteerWork: z.string().optional(),
  preferences: z.string().min(10, { message: 'Please describe your interests.' }),
});

type VolunteerFormInput = z.infer<typeof volunteerSchema>;

export function VolunteerRecommender() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<VolunteerFormInput>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      pastVolunteerWork: '',
      preferences: '',
    },
  });

  const onSubmit: SubmitHandler<VolunteerFormInput> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await recommendVolunteerActivities({
        residentId: 'user-123',
        pastVolunteerWork: data.pastVolunteerWork?.split(',').map(s => s.trim()) || [],
        preferences: data.preferences,
      });
      setRecommendations(result.recommendations);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline text-accent">Find Your Perfect Volunteer Role</CardTitle>
        </div>
        <CardDescription>
          Tell us about your interests and past experiences, and our AI will suggest volunteer opportunities for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pastVolunteerWork"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Volunteer Work (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Soup kitchen, park clean-up, tutoring"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests & Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I enjoy working with children, gardening, and organizing events."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get Recommendations
            </Button>
          </form>
        </Form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        
        {recommendations.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold font-headline mb-2">Here are some suggestions for you:</h4>
            <div className="flex flex-wrap gap-2">
              {recommendations.map((rec, index) => (
                <Badge key={index} variant="outline" className="text-base py-1 px-3 border-accent text-accent bg-accent/10">
                  {rec}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
