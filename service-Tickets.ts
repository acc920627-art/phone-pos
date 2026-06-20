import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { customersTable } from "./customers";
import { usersTable } from "./users";
import { tenantsTable } from "./tenants";

export const serviceTicketsTable = pgTable("service_tickets", {
  id: serial("id").primaryKey(),
  voucherNumber: text("voucher_number").notNull().unique(),
  customerId: integer("customer_id").references(() => customersTable.id, { onDelete: "set null" }),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone"),
  receivedByUserId: integer("received_by_user_id").references(() => usersTable.id, { onDelete: "set null" }),
  modelName: text("model_name").notNull(),
  phoneError: text("phone_error").notNull(),
  depositMmk: integer("deposit_mmk").notNull().default(0),
  technicianName: text("technician_name"),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  tenantId: integer("tenant_id").references(() => tenantsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertServiceTicketSchema = createInsertSchema(serviceTicketsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  voucherNumber: true,
});
export type InsertServiceTicket = z.infer<typeof insertServiceTicketSchema>;
export type ServiceTicket = typeof serviceTicketsTable.$inferSelect;
