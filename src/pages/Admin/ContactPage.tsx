import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "../../components/ui/Card";
import { MessageCircle } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  preview: string;
  date: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Replace this with your actual API call
    const dummyContacts: Contact[] = [
      {
        _id: "1",
        name: "Afnan Naushad",
        email: "afnan@example.com",
        preview: "Interested in collaborating...",
        date: "2025-07-23",
      },
      {
        _id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        preview: "Loved your work. Want to discuss...",
        date: "2025-07-22",
      },
    ];

    setContacts(dummyContacts);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 font-orbitron text-border-white tracking-widest">
        <MessageCircle className="text-blue-500" />
        Contacts Received
      </h2>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card
            key={contact._id}
            className="p-5 flex justify-between items-center shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">
                {contact.email} · {contact.date}
              </p>
              <p className="mt-1 text-zinc-700">{contact.preview}</p>
            </div>
            <Button variant="outline">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
