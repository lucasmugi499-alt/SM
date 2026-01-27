'use server';

/**
 * @fileOverview Suggests a priority level for new support tickets based on the content of the ticket.
 *
 * - suggestTicketPriority - A function that suggests a priority level for a support ticket.
 * - SuggestTicketPriorityInput - The input type for the suggestTicketPriority function.
 * - SuggestTicketPriorityOutput - The return type for the suggestTicketPriority function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTicketPriorityInputSchema = z.object({
  ticketContent: z
    .string()
    .describe('The content of the support ticket, including the user description.'),
});
export type SuggestTicketPriorityInput = z.infer<typeof SuggestTicketPriorityInputSchema>;

const SuggestTicketPriorityOutputSchema = z.object({
  suggestedPriority: z
    .enum(['high', 'medium', 'low'])
    .describe(
      'The suggested priority level for the ticket. High indicates an urgent request.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested priority level.'),
});
export type SuggestTicketPriorityOutput = z.infer<typeof SuggestTicketPriorityOutputSchema>;

export async function suggestTicketPriority(
  input: SuggestTicketPriorityInput
): Promise<SuggestTicketPriorityOutput> {
  return suggestTicketPriorityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTicketPriorityPrompt',
  input: {schema: SuggestTicketPriorityInputSchema},
  output: {schema: SuggestTicketPriorityOutputSchema},
  prompt: `You are an AI assistant helping to prioritize support tickets for an information desk.

  Based on the content of the ticket, determine whether the ticket should be marked as high, medium, or low priority.
  High priority tickets are urgent and require immediate attention.

  Ticket Content: {{{ticketContent}}}

  Respond with a JSON object containing the suggestedPriority (high, medium, or low) and reasoning for the suggested priority.
  The reasoning should briefly explain why the ticket was assigned the given priority.

  Adhere to the following output schema:
  {
    "suggestedPriority": "string",
    "reasoning": "string"
  }`,
});

const suggestTicketPriorityFlow = ai.defineFlow(
  {
    name: 'suggestTicketPriorityFlow',
    inputSchema: SuggestTicketPriorityInputSchema,
    outputSchema: SuggestTicketPriorityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
