'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending volunteer activities to residents.
 *
 * The flow takes into account the resident's past volunteer work and preferences to suggest relevant opportunities.
 * It exports:
 *   - recommendVolunteerActivities: The main function to trigger the flow.
 *   - RecommendVolunteerActivitiesInput: The input type for the function.
 *   - RecommendVolunteerActivitiesOutput: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendVolunteerActivitiesInputSchema = z.object({
  residentId: z.string().describe('The unique identifier of the resident.'),
  pastVolunteerWork: z
    .array(z.string())
    .describe('A list of the resident\'s past volunteer activities.'),
  preferences: z
    .string()
    .describe('The resident\'s preferences for volunteer activities.'),
});
export type RecommendVolunteerActivitiesInput = z.infer<
  typeof RecommendVolunteerActivitiesInputSchema
>;

const RecommendVolunteerActivitiesOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended volunteer activities.'),
});
export type RecommendVolunteerActivitiesOutput = z.infer<
  typeof RecommendVolunteerActivitiesOutputSchema
>;

export async function recommendVolunteerActivities(
  input: RecommendVolunteerActivitiesInput
): Promise<RecommendVolunteerActivitiesOutput> {
  return recommendVolunteerActivitiesFlow(input);
}

const recommendVolunteerActivitiesPrompt = ai.definePrompt({
  name: 'recommendVolunteerActivitiesPrompt',
  input: {schema: RecommendVolunteerActivitiesInputSchema},
  output: {schema: RecommendVolunteerActivitiesOutputSchema},
  prompt: `You are an AI assistant designed to recommend volunteer activities to residents based on their past work and preferences.

  Past Volunteer Work: {{pastVolunteerWork}}
  Preferences: {{preferences}}

  Based on this information, recommend 3-5 volunteer activities that would be a good fit for the resident. Return the recommendations as a list of strings.
  Make sure that the recommendation are aligned with the resident's expressed interests. The recommmendations should be concise, and actionable.
  For example, if the resident has a preference for working with children, suggest activities like "Mentoring Program at the Community Center" or "Reading to Children at the Local Library."
  If the resident is interested in gardening and outdoor activities, suggest activities like "Community Garden Maintenance" or "Park Clean-up Events."
  If no past volunteer work exists, recommend general volunteer activities.
  Here are some examples of volunteer activities: Gardening, Book Club, Sports, Tutoring, Repair services, Carpooling.
  Recommendations:
  `,
});

const recommendVolunteerActivitiesFlow = ai.defineFlow(
  {
    name: 'recommendVolunteerActivitiesFlow',
    inputSchema: RecommendVolunteerActivitiesInputSchema,
    outputSchema: RecommendVolunteerActivitiesOutputSchema,
  },
  async input => {
    const {output} = await recommendVolunteerActivitiesPrompt(input);
    return output!;
  }
);
