import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { phonesTable } from "./phones";
import { customersTable } from "./customers";
import { usersTable } from "./users";
import { tenantsTable } from "./tenants";

export const phoneSalesTable = pgTable("phone_sales", {
  id: serial("id").primaryKey(),
  phoneId: integer("phone_id").notNull().references(() => phonesTable.id, { onDelete: "restrict" }),
  customerId: integer("customer_id").references(() => customersTable.id, { onDelete: "set null" }),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone"),
  soldByUserId: integer("sold_by_user_id").references(() => usersTable.id, { onDelete: "set null" }),
  paymentMethod: text("payment_method").notNull(),
  sellPriceMmk: integer("sell_price_mmk").notNull(),
  warrantyMonths: integer("warranty_months").notNull().default(12),
  note: text("note"),
  tenantId: integer("tenant_id").references(() => tenantsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPhoneSaleSchema = createInsertSchema(phoneSalesTable).omit({ id: true, createdAt: true });
export type InsertPhoneSale = z.infer<typeof insertPhoneSaleSchema>;
export type PhoneSale = typeof phoneSalesTable.$inferSelect;
