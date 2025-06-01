import { Sale, Return } from "@/lib/types";

export const sales: Sale[] = [
  {
    id: "s1",
    date: "2023-11-18T14:30:00",
    products: [
      { productId: "p1", name: "Laptop Pro X", quantity: 2, price: 1299.99 },
      { productId: "p5", name: "Wireless Headphones", quantity: 1, price: 159.99 }
    ],
    customer: "TechCorp LLC",
    total: 2759.97,
    paymentMethod: "credit_card",
    salesPerson: "Sales User",
    status: "completed"
  },
  {
    id: "s2",
    date: "2023-11-17T10:15:00",
    products: [
      { productId: "p2", name: "Office Chair Deluxe", quantity: 5, price: 249.99 },
      { productId: "p9", name: "Conference Table", quantity: 1, price: 599.99 }
    ],
    customer: "Office Solutions Inc.",
    total: 1849.94,
    paymentMethod: "bank_transfer",
    salesPerson: "Manager User",
    status: "completed"
  },
  {
    id: "s3",
    date: "2023-11-16T16:45:00",
    products: [
      { productId: "p4", name: "Premium Notebook Set", quantity: 10, price: 24.99 },
      { productId: "p8", name: "Whiteboard Marker Set", quantity: 5, price: 12.99 }
    ],
    customer: "Edu Supplies Co.",
    total: 314.85,
    paymentMethod: "credit_card",
    salesPerson: "Sales User",
    status: "completed"
  },
  {
    id: "s4",
    date: "2023-11-15T09:30:00",
    products: [
      { productId: "p7", name: "Professional Notebook Computer", quantity: 3, price: 1799.99 }
    ],
    customer: "Creative Agency Partners",
    total: 5399.97,
    paymentMethod: "credit_card",
    salesPerson: "Manager User",
    status: "completed"
  },
  {
    id: "s5",
    date: "2023-11-14T13:20:00",
    products: [
      { productId: "p3", name: "Smart Desk Lamp", quantity: 8, price: 79.99 },
      { productId: "p6", name: "Ergonomic Keyboard", quantity: 8, price: 89.99 }
    ],
    customer: "StartUp Hub",
    total: 1359.84,
    paymentMethod: "credit_card",
    salesPerson: "Sales User",
    status: "completed"
  },
  {
    id: "s6",
    date: "2023-11-13T11:10:00",
    products: [
      { productId: "p10", name: "Document Scanner", quantity: 2, price: 349.99 }
    ],
    customer: "Legal Firm Associates",
    total: 699.98,
    paymentMethod: "bank_transfer",
    salesPerson: "Manager User",
    status: "completed"
  },
  {
    id: "s7",
    date: "2023-11-19T10:30:00",
    products: [
      { productId: "p1", name: "Laptop Pro X", quantity: 1, price: 1299.99 }
    ],
    customer: "Individual Customer",
    total: 1299.99,
    paymentMethod: "credit_card",
    salesPerson: "Sales User",
    status: "pending"
  },
  {
    id: "s8",
    date: "2023-11-10T15:45:00",
    products: [
      { productId: "p5", name: "Wireless Headphones", quantity: 4, price: 159.99 }
    ],
    customer: "Audio Distributors Ltd.",
    total: 639.96,
    paymentMethod: "bank_transfer",
    salesPerson: "Sales User",
    status: "completed"
  }
];

export const returns: Return[] = [
  {
    id: "r1",
    saleId: "s1",
    date: "2023-11-19T09:15:00",
    reason: "Product defective",
    products: [
      { productId: "p5", name: "Wireless Headphones", quantity: 1, price: 159.99 }
    ],
    customer: "TechCorp LLC",
    total: 159.99,
    status: "processed"
  },
  {
    id: "r2",
    saleId: "s3",
    date: "2023-11-17T14:20:00",
    reason: "Wrong product",
    products: [
      { productId: "p4", name: "Premium Notebook Set", quantity: 2, price: 24.99 }
    ],
    customer: "Edu Supplies Co.",
    total: 49.98,
    status: "processed"
  },
  {
    id: "r3",
    saleId: "s5",
    date: "2023-11-15T16:30:00",
    reason: "Customer dissatisfaction",
    products: [
      { productId: "p6", name: "Ergonomic Keyboard", quantity: 1, price: 89.99 }
    ],
    customer: "StartUp Hub",
    total: 89.99,
    status: "pending"
  }
];

export async function getAllSales(): Promise<Sale[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...sales];
}

export async function getSaleById(id: string): Promise<Sale | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return sales.find(sale => sale.id === id) || null;
}

export async function getAllReturns(): Promise<Return[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [...returns];
}

export async function getReturnById(id: string): Promise<Return | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return returns.find(returnItem => returnItem.id === id) || null;
}

export async function getReturnsBySale(saleId: string): Promise<Return[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return returns.filter(returnItem => returnItem.saleId === saleId);
}

export async function getRecentSales(limit: number = 5): Promise<Sale[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [...sales]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}