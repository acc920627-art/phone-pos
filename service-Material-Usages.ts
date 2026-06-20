import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { serviceMaterialsTable } from "./service-materials";
import { serviceTicketsTable } from "./service-tickets";
import { tenantsTable } from "./tenants";

export const serviceMaterialUsagesTable = pgTable("service_material_usages", {
  id: serial("id").primaryKey(),
  materialId: integer("material_id").notNull().references(() => serviceMaterialsTable.id, { onDelete: "restrict" }),
  serviceTicketId: integer("service_ticket_id").notNull().references(() => serviceTicketsTable.id, { onDelete: "cascade" }),
  quantityUsed: integer("quantity_used").notNull().default(1),
  notes: text("notes"),
  tenantId: integer("tenant_id").references(() => tenantsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertServiceMaterialUsageSchema = createInsertSchema(serviceMaterialUsagesTable).omit({ id: true, createdAt: true });
export type InsertServiceMaterialUsage = z.infer<typeof insertServiceMaterialUsageSchema>;
export type ServiceMaterialUsage = typeof serviceMaterialUsagesTable.$inferSelect;
