'use server';

/**
 * @fileOverview A Genkit flow to summarize mentorship request tickets for information desk operators.
 *
 * - summarizeMentorshipRequest - A function that summarizes a mentorship request.
 * - SummarizeMentorshipRequestInput - The input type for the summarizeMentorshipRequest function.
 * - SummarizeMentorshipRequestOutput - The return type for the summarizeMentorshipRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMentorshipRequestInputSchema = z.object({
  requestDetails: z
    .string()
    .describe('The full details of the mentorship request ticket.'),
});
export type SummarizeMentorshipRequestInput = z.infer<
  typeof SummarizeMentorshipRequestInputSchema
>;

const SummarizeMentorshipRequestOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A short, one-sentence summary of the mentorship request ticket.'
    ),
  progress: z
    .string()
    .describe(
      'A short, one-sentence summary of what you have generated for the summary.'
    ),
});
export type SummarizeMentorshipRequestOutput = z.infer<
  typeof SummarizeMentorshipRequestOutputSchema
>;

export async function summarizeMentorshipRequest(
  input: SummarizeMentorshipRequestInput
): Promise<SummarizeMentorshipRequestOutput> {
  return summarizeMentorshipRequestFlow(input);
}

const summarizeMentorshipRequestPrompt = ai.definePrompt({
  name: 'summarizeMentorshipRequestPrompt',
  input: {schema: SummarizeMentorshipRequestInputSchema},
  output: {schema: SummarizeMentorshipRequestOutputSchema},
  prompt: `You are an information desk operator. Generate a short, one-sentence summary of the following mentorship request ticket details:\n\nRequest Details: {{{requestDetails}}}`,
});

const summarizeMentorshipRequestFlow = ai.defineFlow(
  {
    name: 'summarizeMentorshipRequestFlow',
    inputSchema: SummarizeMentorshipRequestInputSchema,
    outputSchema: SummarizeMentorshipRequestOutputSchema,
  },
  async input => {
    const {output} = await summarizeMentorshipRequestPrompt(input);
    return {
      ...output!,
      progress: 'Generated a one-sentence summary of the mentorship request.',
    };
  }
);
