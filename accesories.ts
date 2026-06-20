import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { categoriesTable } from "./categories";
import { tenantsTable } from "./tenants";

export const accessoriesTable = pgTable("accessories", {
  id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  quantity: integer("quantity").notNull().default(0),
  buyPriceMmk: integer("buy_price_mmk").notNull(),
  categoryId: integer("category_id").references(() => categoriesTable.id, { onDelete: "set null" }),
  tenantId: integer("tenant_id").references(() => tenantsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAccessorySchema = createInsertSchema(accessoriesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAccessory = z.infer<typeof insertAccessorySchema>;
export type Accessory = typeof accessoriesTable.$inferSelect;
