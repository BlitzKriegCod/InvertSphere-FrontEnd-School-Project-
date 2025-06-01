import { Client } from "@/lib/types";

export const clients: Client[] = [
  {
    id: "c1",
    name: "TechCorp LLC",
    email: "purchasing@techcorp.com",
    phone: "+1 (555) 987-6543",
    address: "789 Enterprise Dr, Boston, MA 02110",
    lastPurchase: "2023-11-18",
    totalPurchases: 8750.45
  },
  {
    id: "c2",
    name: "Office Solutions Inc.",
    email: "orders@officesolutions.com",
    phone: "+1 (555) 876-5432",
    address: "456 Business Park, New York, NY 10001",
    lastPurchase: "2023-11-17",
    totalPurchases: 12430.87
  },
  {
    id: "c3",
    name: "Edu Supplies Co.",
    email: "procurement@edusupplies.com",
    phone: "+1 (555) 765-4321",
    address: "123 Learning Ave, Portland, OR 97201",
    lastPurchase: "2023-11-16",
    totalPurchases: 5678.25
  },
  {
    id: "c4",
    name: "Creative Agency Partners",
    email: "admin@creativeagency.com",
    phone: "+1 (555) 654-3210",
    address: "101 Design Blvd, Miami, FL 33101",
    lastPurchase: "2023-11-15",
    totalPurchases: 9876.50
  },
  {
    id: "c5",
    name: "StartUp Hub",
    email: "operations@startuphub.com",
    phone: "+1 (555) 543-2109",
    address: "202 Innovation Way, San Jose, CA 95113",
    lastPurchase: "2023-11-14",
    totalPurchases: 4321.75
  },
  {
    id: "c6",
    name: "Legal Firm Associates",
    email: "purchasing@legalfirm.com",
    phone: "+1 (555) 432-1098",
    address: "303 Justice St, Washington, DC 20001",
    lastPurchase: "2023-11-13",
    totalPurchases: 7654.30
  },
  {
    id: "c7",
    name: "Individual Customer",
    email: "jane.doe@example.com",
    phone: "+1 (555) 321-0987",
    address: "404 Residential Dr, Phoenix, AZ 85001",
    lastPurchase: "2023-11-19",
    totalPurchases: 1299.99
  },
  {
    id: "c8",
    name: "Audio Distributors Ltd.",
    email: "orders@audiodistributors.com",
    phone: "+1 (555) 210-9876",
    address: "505 Sound Circle, Nashville, TN 37203",
    lastPurchase: "2023-11-10",
    totalPurchases: 11234.56
  }
];

export async function getAllClients(): Promise<Client[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [...clients];
}

export async function getClientById(id: string): Promise<Client | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return clients.find(client => client.id === id) || null;
}

export async function getTopClients(limit: number = 5): Promise<Client[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [...clients]
    .sort((a, b) => b.totalPurchases - a.totalPurchases)
    .slice(0, limit);
}

export async function getRecentClients(limit: number = 5): Promise<Client[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [...clients]
    .sort((a, b) => new Date(b.lastPurchase || '').getTime() - new Date(a.lastPurchase || '').getTime())
    .slice(0, limit);
}