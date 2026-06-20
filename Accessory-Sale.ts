import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { accessoriesTable } from "./accessories";
import { customersTable } from "./customers";
import { usersTable } from "./users";
import { tenantsTable } from "./tenants";

export const accessorySalesTable = pgTable("accessory_sales", {
  id: serial("id").primaryKey(),
  accessoryId: integer("accessory_id").notNull().references(() => accessoriesTable.id, { onDelete: "restrict" }),
  customerId: integer("customer_id").references(() => customersTable.id, { onDelete: "set null" }),
  soldByUserId: integer("sold_by_user_id").references(() => usersTable.id, { onDelete: "set null" }),
  quantity: integer("quantity").notNull(),
  sellPriceMmk: integer("sell_price_mmk").notNull(),
  paymentMethod: text("payment_method").notNull(),
  note: text("note"),
  tenantId: integer("tenant_id").references(() => tenantsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAccessorySaleSchema = createInsertSchema(accessorySalesTable).omit({ id: true, createdAt: true });
export type InsertAccessorySale = z.infer<typeof insertAccessorySaleSchema>;
export type AccessorySale = typeof accessorySalesTable.$inferSelect;
