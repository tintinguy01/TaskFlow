import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { createEventsServicePlugin } from '@schedule-x/events-service';

const eventsServicePlugin = createEventsServicePlugin();

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const events = await ctx.db.query('events')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect();
      
    return events.map((event: any) => ({
      _id: event._id,
      title: event.title,
      start: event.start,
      end: event.end,
      calendarId: event.calendarId,
    }));
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    start: v.string(),
    end: v.string(),
    calendarId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const event = await ctx.db.insert("events", {
      title: args.title,
      start: args.start,
      end: args.end,
      calendarId: args.calendarId,
      userId,
    });

    return event;
  }
});

export const remove = mutation({
  args: {
    id: v.id("events"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingEvent = await ctx.db.get(args.id);

    if (!existingEvent) {
      throw new Error("Not found");
    }

    if (existingEvent.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const event = await ctx.db.delete(args.id);

    return event;
  }
});
