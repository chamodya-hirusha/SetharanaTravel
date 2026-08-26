"use server";

import fs from "fs";
import path from "path";
import { ContactMessage } from "@/types";
import { revalidatePath } from "next/cache";

const DATA_PATH = path.join(process.cwd(), "data", "admin", "contacts.json");

function readContacts(): ContactMessage[] {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as ContactMessage[];
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
}

function writeContacts(items: ContactMessage[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function getContacts(): Promise<ContactMessage[]> {
  return readContacts();
}

export async function markContactAsRead(id: string) {
  const contacts = readContacts();
  const contactIndex = contacts.findIndex((c) => c.id === id);
  if (contactIndex > -1) {
    contacts[contactIndex].read = true;
    writeContacts(contacts);
    revalidatePath("/admin/contacts");
    revalidatePath("/admin");
  }
}

export async function deleteContact(id: string) {
  const contacts = readContacts();
  const newContacts = contacts.filter((c) => c.id !== id);
  writeContacts(newContacts);
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function saveContactSubmission(data: Omit<ContactMessage, "id" | "date" | "read">) {
  const contacts = readContacts();
  const newContact: ContactMessage = {
    id: Date.now().toString(),
    ...data,
    read: false,
    date: new Date().toISOString(),
  };
  contacts.unshift(newContact);
  writeContacts(contacts);
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}
