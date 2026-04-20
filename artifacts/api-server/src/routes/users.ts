import { Router } from "express";
import type { IRouter } from "express";
import { db, usersTable, scriptsTable, scriptLikesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/users/:username", async (req, res): Promise<void> => {
  const username = Array.isArray(req.params.username)
    ? req.params.username[0]
    : req.params.username;

  const [user] = await db
    .select({
      id: usersTable.id,
      username: usersTable.username,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(eq(usersTable.username, username));

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const userScripts = await db
    .select()
    .from(scriptsTable)
    .where(eq(scriptsTable.authorId, user.id))
    .orderBy(sql`${scriptsTable.createdAt} DESC`);

  const totalLikes = userScripts.reduce((sum, s) => sum + s.likes, 0);

  const enrichedScripts = userScripts.map((script) => ({
    id: script.id,
    title: script.title,
    description: script.description,
    code: script.code,
    game: script.game,
    category: script.category,
    authorId: script.authorId,
    authorUsername: user.username,
    likes: script.likes,
    views: script.views,
    isVerified: script.isVerified,
    isPremium: script.isPremium,
    isLikedByMe: false,
    createdAt: script.createdAt.toISOString(),
    updatedAt: script.updatedAt.toISOString(),
  }));

  res.json({
    id: user.id,
    username: user.username,
    scriptCount: userScripts.length,
    totalLikes,
    createdAt: user.createdAt.toISOString(),
    scripts: enrichedScripts,
  });
});

export default router;
