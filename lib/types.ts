export type Role = 'admin' | 'manager' | 'sales' | 'inventory' | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  location: string;
  supplier: string;
  lastUpdated: string;
  abcCategory?: 'A' | 'B' | 'C';
  image?: string;
}

export interface Sale {
  id: string;
  date: string;
  products: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  customer: string;
  total: number;
  paymentMethod: string;
  salesPerson: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Return {
  id: string;
  saleId: string;
  date: string;
  reason: string;
  products: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  customer: string;
  total: number;
  status: 'pending' | 'processed' | 'rejected';
}

export interface InventoryMovement {
  id: string;
  type: 'entry' | 'exit' | 'adjustment';
  date: string;
  products: {
    productId: string;
    name: string;
    quantity: number;
  }[];
  reason: string;
  createdBy: string;
  reference?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  lastOrder?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  lastPurchase?: string;
  totalPurchases: number;
}

export interface Report {
  id: string;
  title: string;
  type: 'sales' | 'inventory' | 'audit' | 'financial';
  dateRange: {
    start: string;
    end: string;
  };
  createdBy: string;
  createdAt: string;
  data: any;
}

export interface AlertMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  title?: string;
}

export interface SectionAccess {
  [key: string]: {
    [key in Role]: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
  };
}