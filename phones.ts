import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { categoriesTable } from "./categories";
import { tenantsTable } from "./tenants";

export const phonesTable = pgTable("phones", {
  id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  imei: text("imei"),
  color: text("color"),
  note: text("note"),
  buyPriceMmk: integer("buy_price_mmk").notNull(),
  categoryId: integer("category_id").references(() => categoriesTable.id, { onDelete: "set null" }),
  tenantId: integer("tenant_id").references(() => tenantsTable.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("in_stock"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPhoneSchema = createInsertSchema(phonesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPhone = z.infer<typeof insertPhoneSchema>;
export type Phone = typeof phonesTable.$inferSelect;
