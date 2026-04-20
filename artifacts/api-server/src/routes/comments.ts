import { Router } from "express";
import type { IRouter } from "express";
import { db, scriptCommentsTable, usersTable, scriptsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

function parseId(val: unknown): number | null {
  const n = parseInt(String(val), 10);
  return isNaN(n) || n <= 0 ? null : n;
}

router.get("/scripts/:id/comments", async (req, res): Promise<void> => {
  const scriptId = parseId(req.params.id);
  if (!scriptId) {
    res.status(400).json({ error: "Invalid script ID" });
    return;
  }

  const comments = await db
    .select({
      id: scriptCommentsTable.id,
      content: scriptCommentsTable.content,
      createdAt: scriptCommentsTable.createdAt,
      userId: scriptCommentsTable.userId,
      username: usersTable.username,
    })
    .from(scriptCommentsTable)
    .leftJoin(usersTable, eq(scriptCommentsTable.userId, usersTable.id))
    .where(eq(scriptCommentsTable.scriptId, scriptId))
    .orderBy(desc(scriptCommentsTable.createdAt));

  res.json(comments);
});

router.post("/scripts/:id/comments", requireAuth, async (req, res): Promise<void> => {
  const scriptId = parseId(req.params.id);
  if (!scriptId) {
    res.status(400).json({ error: "Invalid script ID" });
    return;
  }

  const content = typeof req.body?.content === "string" ? req.body.content.trim() : "";
  if (!content || content.length > 1000) {
    res.status(400).json({ error: "Content is required (max 1000 chars)" });
    return;
  }

  const [script] = await db
    .select({ id: scriptsTable.id })
    .from(scriptsTable)
    .where(eq(scriptsTable.id, scriptId));

  if (!script) {
    res.status(404).json({ error: "Script not found" });
    return;
  }

  const userId = (req as any).userId as number;

  const [comment] = await db
    .insert(scriptCommentsTable)
    .values({ scriptId, userId, content })
    .returning();

  const [user] = await db
    .select({ username: usersTable.username })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  res.status(201).json({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    userId: comment.userId,
    username: user?.username ?? "Unknown",
  });
});

router.delete("/scripts/:scriptId/comments/:commentId", requireAuth, async (req, res): Promise<void> => {
  const scriptId = parseId(req.params.scriptId);
  const commentId = parseId(req.params.commentId);

  if (!scriptId || !commentId) {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }

  const userId = (req as any).userId as number;

  const [comment] = await db
    .select({ id: scriptCommentsTable.id, userId: scriptCommentsTable.userId })
    .from(scriptCommentsTable)
    .where(eq(scriptCommentsTable.id, commentId));

  if (!comment) {
    res.status(404).json({ error: "Comment not found" });
    return;
  }

  if (comment.userId !== userId) {
    res.status(403).json({ error: "You can only delete your own comments" });
    return;
  }

  await db.delete(scriptCommentsTable).where(eq(scriptCommentsTable.id, commentId));

  res.json({ message: "Comment deleted" });
});

export default router;
