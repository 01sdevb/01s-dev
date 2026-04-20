import { Router } from "express";
import type { IRouter } from "express";
import { db, scriptRatingsTable, scriptsTable } from "@workspace/db";
import { eq, avg, and } from "drizzle-orm";
import { requireAuth, optionalAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

function parseId(val: unknown): number | null {
  const n = parseInt(String(val), 10);
  return isNaN(n) || n <= 0 ? null : n;
}

router.get("/scripts/:id/rating", optionalAuth, async (req, res): Promise<void> => {
  const scriptId = parseId(req.params.id);
  if (!scriptId) {
    res.status(400).json({ error: "Invalid script ID" });
    return;
  }

  const [avgResult] = await db
    .select({ avg: avg(scriptRatingsTable.rating) })
    .from(scriptRatingsTable)
    .where(eq(scriptRatingsTable.scriptId, scriptId));

  let myRating: number | null = null;
  if (req.userId) {
    const [myRow] = await db
      .select({ rating: scriptRatingsTable.rating })
      .from(scriptRatingsTable)
      .where(and(eq(scriptRatingsTable.scriptId, scriptId), eq(scriptRatingsTable.userId, req.userId)));
    myRating = myRow?.rating ?? null;
  }

  const [countResult] = await db
    .select({ count: scriptsTable.id })
    .from(scriptRatingsTable)
    .where(eq(scriptRatingsTable.scriptId, scriptId));

  res.json({
    average: avgResult?.avg ? parseFloat(Number(avgResult.avg).toFixed(1)) : null,
    myRating,
  });
});

router.post("/scripts/:id/rating", requireAuth, async (req, res): Promise<void> => {
  const scriptId = parseId(req.params.id);
  if (!scriptId) {
    res.status(400).json({ error: "Invalid script ID" });
    return;
  }

  const ratingVal = parseInt(String(req.body?.rating), 10);
  if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
    res.status(400).json({ error: "Rating must be between 1 and 5" });
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

  await db
    .insert(scriptRatingsTable)
    .values({ scriptId, userId: req.userId!, rating: ratingVal })
    .onConflictDoUpdate({
      target: [scriptRatingsTable.userId, scriptRatingsTable.scriptId],
      set: { rating: ratingVal },
    });

  const [avgResult] = await db
    .select({ avg: avg(scriptRatingsTable.rating) })
    .from(scriptRatingsTable)
    .where(eq(scriptRatingsTable.scriptId, scriptId));

  res.json({
    average: avgResult?.avg ? parseFloat(Number(avgResult.avg).toFixed(1)) : null,
    myRating: ratingVal,
  });
});

export default router;
