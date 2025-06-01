import { Supplier } from "@/lib/types";

export const suppliers: Supplier[] = [
  {
    id: "sup1",
    name: "TechSuppliers Inc.",
    contact: "John Smith",
    email: "john@techsuppliers.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Blvd, San Francisco, CA 94105",
    products: ["p1", "p6", "p7"],
    lastOrder: "2023-11-15"
  },
  {
    id: "sup2",
    name: "Furniture Plus",
    contact: "Sarah Johnson",
    email: "sarah@furnitureplus.com",
    phone: "+1 (555) 234-5678",
    address: "456 Office Ave, Chicago, IL 60603",
    products: ["p2", "p9"],
    lastOrder: "2023-11-12"
  },
  {
    id: "sup3",
    name: "LightTech Co.",
    contact: "Michael Wong",
    email: "michael@lighttech.com",
    phone: "+1 (555) 345-6789",
    address: "789 Bright St, Austin, TX 78701",
    products: ["p3"],
    lastOrder: "2023-11-14"
  },
  {
    id: "sup4",
    name: "PaperWorks Ltd.",
    contact: "Emily Chen",
    email: "emily@paperworks.com",
    phone: "+1 (555) 456-7890",
    address: "101 Stationery Rd, Seattle, WA 98101",
    products: ["p4", "p8"],
    lastOrder: "2023-11-10"
  },
  {
    id: "sup5",
    name: "AudioGear Inc.",
    contact: "David Rodriguez",
    email: "david@audiogear.com",
    phone: "+1 (555) 567-8901",
    address: "202 Sound St, Los Angeles, CA 90012",
    products: ["p5"],
    lastOrder: "2023-11-14"
  },
  {
    id: "sup6",
    name: "OfficeTech Solutions",
    contact: "Lisa Thompson",
    email: "lisa@officetech.com",
    phone: "+1 (555) 678-9012",
    address: "303 Tech Plaza, Denver, CO 80202",
    products: ["p10"],
    lastOrder: "2023-11-07"
  }
];

export async function getAllSuppliers(): Promise<Supplier[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [...suppliers];
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return suppliers.find(supplier => supplier.id === id) || null;
}

export async function getSuppliersByProduct(productId: string): Promise<Supplier[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return suppliers.filter(supplier => 
    supplier.products.includes(productId)
  );
}

export async function getRecentSuppliers(limit: number = 5): Promise<Supplier[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [...suppliers]
    .sort((a, b) => new Date(b.lastOrder || '').getTime() - new Date(a.lastOrder || '').getTime())
    .slice(0, limit);
}