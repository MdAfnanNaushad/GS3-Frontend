"use client";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "../../components/ui/Card";
import { MessageCircle, X } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message?: string;
  messagePreview: string;
  createdAt: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/contact");
        setContacts(res.data.data);
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch contacts.");
        }
      }
    };
    fetchContacts();
  });

  const handleViewDetails = async (contactId: string) => {
    try {
      const res = await api.get(`/contact/${contactId}`);
      setSelectedContact(res.data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Failed to fetch contact details:", err);
        setError(
          err.response?.data?.message || "Failed to fetch contact details."
        );
      } else {
        setError("An unexpected error occurred while fetching details.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6 flex items-center gap-2 font-orbitron text-border-white tracking-widest">
        <MessageCircle className="text-white h-8 w-8" />
        Contacts Received
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card
            key={contact._id}
            className="p-5 flex justify-between items-center shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">
                {contact.email} ·{" "}
                {new Date(contact.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-1 text-zinc-700">{contact.messagePreview}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => handleViewDetails(contact._id)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedContact.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {selectedContact.email}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Received: {new Date(selectedContact.createdAt).toLocaleString()}
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <p className="text-base text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                {selectedContact.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
