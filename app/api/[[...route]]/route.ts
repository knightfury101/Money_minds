import accounts from "./accounts";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";
import plaid from "./plaid";
import subscriptions from "./subscriptions";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app
  .route("/summary", summary)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/plaid", plaid)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
