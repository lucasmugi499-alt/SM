'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { bookAppointmentAction } from '@/app/actions';
import { MENTOR_ROLES } from '@/lib/constants';

const formSchema = z.object({
  role: z.string().min(1, 'Please select a role/title.'),
  phone: z.string().min(10, 'A valid phone number is required.'),
  details: z.string().min(20, 'Please provide at least 20 characters.'),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit Request
    </Button>
  );
}

export function AppointmentForm() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formState, formAction] = useFormState(bookAppointmentAction, {
    success: false,
    message: '',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      phone: '',
      details: '',
    },
  });

  useEffect(() => {
    if (formState.success) {
      setDialogOpen(true);
      form.reset();
    }
    // We don't want to react to form changes here, only formState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);


  return (
    <>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel>I am looking for a...</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name="role"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role or title" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MENTOR_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tell us about your needs</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what you want to achieve or discuss..."
                    className="resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
          {!formState.success && formState.message && (
             <p className="text-sm font-medium text-destructive">{formState.message}</p>
          )}
        </form>
      </Form>
      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delivered ✅</AlertDialogTitle>
            <AlertDialogDescription>
              Your request has been delivered to the Spark Mentorship Information Desk.
              <br />
              <strong className="mt-2 block">
                Reference ID: {formState.referenceId}
              </strong>
              We’ll contact you using the phone number you provided.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
