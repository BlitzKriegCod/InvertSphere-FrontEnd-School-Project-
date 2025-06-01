import { User, Role } from "@/lib/types";

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@inventsphere.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@inventsphere.com",
    role: "manager",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Sales User",
    email: "sales@inventsphere.com",
    role: "sales",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Inventory User",
    email: "inventory@inventsphere.com",
    role: "inventory",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "5",
    name: "Auditor User",
    email: "auditor@inventsphere.com",
    role: "auditor",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

// Simulate authentication
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // For demo purposes, any password will work
  const user = users.find(user => user.email === email);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return user || null;
}

export async function getUserById(id: string): Promise<User | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return users.find(user => user.id === id) || null;
}

export async function getAllUsers(): Promise<User[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [...users];
}