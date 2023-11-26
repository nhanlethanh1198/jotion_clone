import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
    handler: async (ctx) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) {
            throw new Error("Not authenticated");
        }

        const documents = await ctx.db.query("welcomeTrigger").collect();

        return documents;
    }
})

export const getByUserId = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) {
            throw new Error("Not authenticated");
        }

        const trickger = await ctx.db.query("welcomeTrigger")
            .withIndex("by_user", (q) => (
                q
                    .eq("userId", args.userId)
            ))
            .collect();

        return trickger;
    }
})

export const findOwning = query({
    handler: async (ctx) => {
        const identify = await ctx.auth.getUserIdentity();
        
        if (!identify) {
            throw new Error("Not authenticated");
        }

        const trickger = await ctx.db.query("welcomeTrigger").filter((q) => (
            q.eq("userId", identify.subject)
        )).first();

        return trickger;
    }
})

export const create = mutation({
    args: {
        isTriggered: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) {
            throw new Error("Not authenticated");
        }

        const trickger = await ctx.db.insert("welcomeTrigger", {
            userId: identify.subject,
            isTriggered: args.isTriggered,
        });

        return trickger;
    }
})

export const update = mutation({
    args: {
        id: v.id("welcomeTrigger"),
        isTriggered: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) {
            throw new Error("Not authenticated");
        }

        const trickger = await ctx.db.patch(args.id, {
            isTriggered: args.isTriggered,
        });

        return trickger;
    }
})