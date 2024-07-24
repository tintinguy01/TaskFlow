"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEventForm } from "@/hooks/use-event-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import DatetimePickerCalendarSettings from "../date-picker";
import TypeSelector from "../selector";
import { useRouter } from "next/navigation";
import { Description } from "@radix-ui/react-dialog";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const formSchema = z.object({
  Title: z.string(),
  Start: z.date(),
  End: z.date(),
  Type: z.string(),
});

export const EventForm = () => {
  const router = useRouter();
  const { isOpen, onClose } = useEventForm();

  const create = useMutation(api.events.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: '',
      Start: new Date(),
      End: new Date(),
      Type: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const startDate = new Date(values.Start);
    const endDate = new Date(values.End);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid dates!');
      return;
    }

    const timezoneOffsetMinutes = startDate.getTimezoneOffset();
    startDate.setMinutes(startDate.getMinutes() - timezoneOffsetMinutes);
    endDate.setMinutes(endDate.getMinutes() - timezoneOffsetMinutes);

    const startDateString = startDate.toISOString().slice(0, 16).replace('T', ' ');
    const endDateString = endDate.toISOString().slice(0, 16).replace('T', ' ');

    const onCreate = () => {
      const promise = create({ 
        title: values.Title,
        start: startDateString,
        end: endDateString,
        calendarId: values.Type,
       });

       toast.promise(promise, {
        loading: "Creating a new event...",
        success: "New event created!",
        error: "Failed to create a new event."
       });
    }

    await onCreate();

    onClose();
    router.push('/documents/calendar');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-full p-6">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-lg font-medium">Add Event</DialogTitle>
        </DialogHeader>
        <div className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="Title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <DatetimePickerCalendarSettings {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="End"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End</FormLabel>
                    <FormControl>
                      <DatetimePickerCalendarSettings {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <TypeSelector {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <Description className="text-[0.8rem] text-muted-foreground" id="dialog-description">Please input your event details.</Description>
      </DialogContent>
    </Dialog>
  );
};
