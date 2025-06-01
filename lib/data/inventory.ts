import { InventoryMovement } from "@/lib/types";

export const inventoryMovements: InventoryMovement[] = [
  {
    id: "im1",
    type: "entry",
    date: "2023-11-15T09:30:00",
    products: [
      { productId: "p1", name: "Laptop Pro X", quantity: 10 },
      { productId: "p5", name: "Wireless Headphones", quantity: 20 }
    ],
    reason: "Supplier delivery",
    createdBy: "Inventory User",
    reference: "PO-2023-112"
  },
  {
    id: "im2",
    type: "exit",
    date: "2023-11-16T14:20:00",
    products: [
      { productId: "p2", name: "Office Chair Deluxe", quantity: 5 }
    ],
    reason: "Sale",
    createdBy: "Sales User",
    reference: "s2"
  },
  {
    id: "im3",
    type: "adjustment",
    date: "2023-11-17T11:15:00",
    products: [
      { productId: "p4", name: "Premium Notebook Set", quantity: -3 }
    ],
    reason: "Inventory count correction",
    createdBy: "Inventory User"
  },
  {
    id: "im4",
    type: "entry",
    date: "2023-11-14T10:45:00",
    products: [
      { productId: "p3", name: "Smart Desk Lamp", quantity: 30 },
      { productId: "p8", name: "Whiteboard Marker Set", quantity: 50 }
    ],
    reason: "Supplier delivery",
    createdBy: "Inventory User",
    reference: "PO-2023-111"
  },
  {
    id: "im5",
    type: "exit",
    date: "2023-11-15T16:30:00",
    products: [
      { productId: "p7", name: "Professional Notebook Computer", quantity: 3 }
    ],
    reason: "Sale",
    createdBy: "Sales User",
    reference: "s4"
  },
  {
    id: "im6",
    type: "entry",
    date: "2023-11-18T08:45:00",
    products: [
      { productId: "p6", name: "Ergonomic Keyboard", quantity: 15 }
    ],
    reason: "Return from customer",
    createdBy: "Sales User",
    reference: "r3"
  },
  {
    id: "im7",
    type: "adjustment",
    date: "2023-11-19T09:20:00",
    products: [
      { productId: "p10", name: "Document Scanner", quantity: 2 }
    ],
    reason: "Found additional inventory during audit",
    createdBy: "Auditor User"
  }
];

export async function getAllInventoryMovements(): Promise<InventoryMovement[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...inventoryMovements];
}

export async function getInventoryMovementById(id: string): Promise<InventoryMovement | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return inventoryMovements.find(movement => movement.id === id) || null;
}

export async function getInventoryMovementsByType(type: 'entry' | 'exit' | 'adjustment'): Promise<InventoryMovement[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return inventoryMovements.filter(movement => movement.type === type);
}

export async function getRecentInventoryMovements(limit: number = 5): Promise<InventoryMovement[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [...inventoryMovements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getInventoryMovementsByProduct(productId: string): Promise<InventoryMovement[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return inventoryMovements.filter(movement => 
    movement.products.some(product => product.productId === productId)
  );
}