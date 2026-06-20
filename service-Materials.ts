import { pgTable, serial, text, integer, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { tenantsTable } from "./tenants";

export const serviceMaterialsTable = pgTable("service_materials", {
  id: serial("id").primaryKey(),
  voucherNumber: text("voucher_number").unique(),
  receptionVoucher: text("reception_voucher"),
  itemName: text("item_name").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPriceMmk: integer("unit_price_mmk").notNull().default(0),
  supplierName: text("supplier_name"),
  boughtDate: date("bought_date").notNull(),
  notes: text("notes"),
  tenantId: integer("tenant_id").references(() => tenantsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertServiceMaterialSchema = createInsertSchema(serviceMaterialsTable).omit({ id: true, createdAt: true });
export type InsertServiceMaterial = z.infer<typeof insertServiceMaterialSchema>;
export type ServiceMaterial = typeof serviceMaterialsTable.$inferSelect;
