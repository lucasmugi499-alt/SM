'use server';

import { z } from 'zod';
import { suggestTicketPriority } from '@/ai/flows/suggest-ticket-priority';

const formSchema = z.object({
  role: z.string().min(1, 'Please select a role.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  details: z.string().min(10, 'Please provide some details about your request.'),
});

type FormState = {
  success: boolean;
  message: string;
  referenceId?: string;
};

export async function bookAppointmentAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    role: formData.get('role'),
    phone: formData.get('phone'),
    details: formData.get('details'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
    };
  }
  
  const { role, phone, details } = validatedFields.data;

  try {
    // Generate a unique reference ID
    const referenceId = `SPK-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;

    const ticketContent = `Role/Title: ${role}\nPhone: ${phone}\nDetails: ${details}`;

    // Simulate sending to the Information Desk (e.g., saving to Firestore)
    console.log('--- New Mentorship Request ---');
    console.log('Reference ID:', referenceId);
    console.log('Content:', ticketContent);
    console.log('Status: Delivered to Information Desk');

    // Use GenAI to suggest priority
    const prioritySuggestion = await suggestTicketPriority({ ticketContent });
    
    console.log('--- AI Ticket Intelligence ---');
    console.log('Suggested Priority:', prioritySuggestion.suggestedPriority);
    console.log('Reasoning:', prioritySuggestion.reasoning);
    console.log('----------------------------');


    // Simulate sending a confirmation email
    console.log(`Simulating confirmation email send for ${referenceId}.`);

    return {
      success: true,
      message: 'Your request has been delivered to the Spark Mentorship Information Desk.',
      referenceId: referenceId,
    };
  } catch (error) {
    console.error('Error booking appointment:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
