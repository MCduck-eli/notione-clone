import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocument = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
        });
        return document;
    },
});

export const getDocument = query({
    args: {
        parentDocument: v.optional(v.id("documents")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
                q
                    .eq("userId", userId)
                    .eq("parentDocument", args.parentDocument),
            )
            .filter((q) => q.eq(q.field("isArchived"), false))
            .collect();

        return documents;
    },
});

export const archive = mutation({
    args: {
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const archiveChildren = async (parentId: Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) =>
                    q.eq("userId", userId).eq("parentDocument", parentId),
                )
                .collect();
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });

                archiveChildren(child._id);
            }
        };

        const existingUser = await ctx.db.get(args.id);

        archiveChildren(args.id);

        if (!existingUser) {
            throw new Error("User not found");
        }

        if (existingUser.userId !== userId) {
            throw new Error("User not found");
        }

        const document = await ctx.db.patch(args.id, { isArchived: true });

        return document;
    },
});

export const getTrashDocument = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), true))
            .collect();

        return documents;
    },
});

export const removeDocument = mutation({
    args: {
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingUser = await ctx.db.get(args.id);

        if (!existingUser) {
            throw new Error("User not found");
        }

        if (existingUser.userId !== userId) {
            throw new Error("User not found");
        }

        const documents = await ctx.db.delete(args.id);

        return documents;
    },
});

export const getDocumentById = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new Error("Document not found");
        }

        if (document.isPublished && !document.isArchived) {
            return document;
        }

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        if (document.userId !== userId) {
            throw new Error("User not found");
        }

        return document;
    },
});

export const updateFields = mutation({
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        const { id, ...rest } = args;

        const exitingDocument = await ctx.db.get(args.id);

        if (!exitingDocument) {
            throw new Error("Document not found");
        }

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        if (exitingDocument.userId !== userId) {
            throw new Error("User not found");
        }

        const document = await ctx.db.patch(id, rest);

        return document;
    },
});

export const restore = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const unarchivedChildren = async (documentId: Id<"documents">) => {
            const childrens = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) =>
                    q.eq("userId", userId).eq("parentDocument", documentId),
                )
                .collect();

            for (const child of childrens) {
                await ctx.db.patch(child._id, {
                    isArchived: false,
                });

                unarchivedChildren(child._id);
            }
        };

        const options: Partial<Doc<"documents">> = {
            isArchived: false,
        };

        if (existingDocument.parentDocument) {
            options.parentDocument = undefined;
        }

        const document = await ctx.db.patch(args.id, options);

        unarchivedChildren(args.id);

        return document;
    },
});

export const searchDocument = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }
        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect();

        return documents;
    },
});
