import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Laptop Pro X",
    sku: "LPX-2023",
    category: "Electronics",
    price: 1299.99,
    cost: 899.99,
    stock: 45,
    minStock: 10,
    location: "Warehouse A",
    supplier: "TechSuppliers Inc.",
    lastUpdated: "2023-11-15",
    abcCategory: "A",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p2",
    name: "Office Chair Deluxe",
    sku: "OCD-2023",
    category: "Furniture",
    price: 249.99,
    cost: 149.99,
    stock: 32,
    minStock: 5,
    location: "Warehouse B",
    supplier: "Furniture Plus",
    lastUpdated: "2023-11-12",
    abcCategory: "B",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p3",
    name: "Smart Desk Lamp",
    sku: "SDL-2023",
    category: "Electronics",
    price: 79.99,
    cost: 39.99,
    stock: 120,
    minStock: 20,
    location: "Warehouse A",
    supplier: "LightTech Co.",
    lastUpdated: "2023-11-18",
    abcCategory: "C",
    image: "https://images.pexels.com/photos/3637741/pexels-photo-3637741.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p4",
    name: "Premium Notebook Set",
    sku: "PNS-2023",
    category: "Office Supplies",
    price: 24.99,
    cost: 12.49,
    stock: 210,
    minStock: 30,
    location: "Warehouse C",
    supplier: "PaperWorks Ltd.",
    lastUpdated: "2023-11-10",
    abcCategory: "C",
    image: "https://images.pexels.com/photos/6249/notebooks-laptop-computer-office.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p5",
    name: "Wireless Headphones",
    sku: "WHP-2023",
    category: "Electronics",
    price: 159.99,
    cost: 89.99,
    stock: 60,
    minStock: 15,
    location: "Warehouse A",
    supplier: "AudioGear Inc.",
    lastUpdated: "2023-11-14",
    abcCategory: "B",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p6",
    name: "Ergonomic Keyboard",
    sku: "EKB-2023",
    category: "Electronics",
    price: 89.99,
    cost: 49.99,
    stock: 8,
    minStock: 10,
    location: "Warehouse A",
    supplier: "TechSuppliers Inc.",
    lastUpdated: "2023-11-13",
    abcCategory: "B",
    image: "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p7",
    name: "Professional Notebook Computer",
    sku: "PNC-2023",
    category: "Electronics",
    price: 1799.99,
    cost: 1299.99,
    stock: 18,
    minStock: 5,
    location: "Warehouse A",
    supplier: "TechSuppliers Inc.",
    lastUpdated: "2023-11-12",
    abcCategory: "A",
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p8",
    name: "Whiteboard Marker Set",
    sku: "WMS-2023",
    category: "Office Supplies",
    price: 12.99,
    cost: 5.99,
    stock: 150,
    minStock: 30,
    location: "Warehouse C",
    supplier: "PaperWorks Ltd.",
    lastUpdated: "2023-11-09",
    abcCategory: "C",
    image: "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p9",
    name: "Conference Table",
    sku: "CTB-2023",
    category: "Furniture",
    price: 599.99,
    cost: 399.99,
    stock: 5,
    minStock: 2,
    location: "Warehouse B",
    supplier: "Furniture Plus",
    lastUpdated: "2023-11-08",
    abcCategory: "A",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p10",
    name: "Document Scanner",
    sku: "DSC-2023",
    category: "Electronics",
    price: 349.99,
    cost: 249.99,
    stock: 25,
    minStock: 5,
    location: "Warehouse A",
    supplier: "OfficeTech Solutions",
    lastUpdated: "2023-11-07",
    abcCategory: "B",
    image: "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export async function getAllProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...products];
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return products.find(product => product.id === id) || null;
}

export async function getLowStockProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return products.filter(product => product.stock <= product.minStock);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return products.filter(product => product.category === category);
}

export async function getProductsByAbcCategory(category: 'A' | 'B' | 'C'): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return products.filter(product => product.abcCategory === category);
}