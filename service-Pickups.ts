import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { serviceTicketsTable } from "./service-tickets";

export const servicePickupsTable = pgTable("service_pickups", {
  id: serial("id").primaryKey(),
  serviceTicketId: integer("service_ticket_id").notNull().references(() => serviceTicketsTable.id, { onDelete: "cascade" }),
  paymentMethod: text("payment_method").notNull(),
  amountMmk: integer("amount_mmk").notNull(),
  receiverName: text("receiver_name"),
  receiverCode: text("receiver_code"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertServicePickupSchema = createInsertSchema(servicePickupsTable).omit({ id: true, createdAt: true });
export type InsertServicePickup = z.infer<typeof insertServicePickupSchema>;
export type ServicePickup = typeof servicePickupsTable.$inferSelect;
