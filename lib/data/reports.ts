import { Report } from "@/lib/types";

export const reports: Report[] = [
  {
    id: "r1",
    title: "Monthly Sales Report - November 2023",
    type: "sales",
    dateRange: {
      start: "2023-11-01",
      end: "2023-11-30"
    },
    createdBy: "Manager User",
    createdAt: "2023-11-30T18:00:00",
    data: {
      totalSales: 12500.54,
      totalOrders: 45,
      avgOrderValue: 277.79,
      topProducts: [
        { name: "Professional Notebook Computer", units: 6, revenue: 10799.94 },
        { name: "Laptop Pro X", units: 5, revenue: 6499.95 },
        { name: "Office Chair Deluxe", units: 12, revenue: 2999.88 }
      ],
      salesByDay: [
        { date: "2023-11-01", amount: 450.35 },
        { date: "2023-11-02", amount: 325.78 },
        { date: "2023-11-03", amount: 780.45 },
        { date: "2023-11-04", amount: 0 },
        { date: "2023-11-05", amount: 0 },
        { date: "2023-11-06", amount: 1254.67 },
        { date: "2023-11-07", amount: 876.23 },
        { date: "2023-11-08", amount: 567.89 },
        { date: "2023-11-09", amount: 654.32 },
        { date: "2023-11-10", amount: 639.96 },
        { date: "2023-11-11", amount: 0 },
        { date: "2023-11-12", amount: 0 },
        { date: "2023-11-13", amount: 699.98 },
        { date: "2023-11-14", amount: 1359.84 },
        { date: "2023-11-15", amount: 5399.97 },
        { date: "2023-11-16", amount: 314.85 },
        { date: "2023-11-17", amount: 1849.94 },
        { date: "2023-11-18", amount: 2759.97 },
        { date: "2023-11-19", amount: 1299.99 },
        { date: "2023-11-20", amount: 0 },
        // Rest of the month with 0 or some values
      ]
    }
  },
  {
    id: "r2",
    title: "Inventory Status Report - Q4 2023",
    type: "inventory",
    dateRange: {
      start: "2023-10-01",
      end: "2023-12-31"
    },
    createdBy: "Inventory User",
    createdAt: "2023-11-28T14:30:00",
    data: {
      totalItems: 1254,
      totalValue: 198750.45,
      lowStockItems: 8,
      categoryBreakdown: [
        { category: "Electronics", count: 548, value: 125678.90 },
        { category: "Furniture", count: 125, value: 42567.80 },
        { category: "Office Supplies", count: 581, value: 30503.75 }
      ],
      warehouseUtilization: [
        { warehouse: "Warehouse A", capacity: 1500, used: 875 },
        { warehouse: "Warehouse B", capacity: 1200, used: 634 },
        { warehouse: "Warehouse C", capacity: 800, used: 354 }
      ]
    }
  },
  {
    id: "r3",
    title: "Annual Audit Report - 2023",
    type: "audit",
    dateRange: {
      start: "2023-01-01",
      end: "2023-12-31"
    },
    createdBy: "Auditor User",
    createdAt: "2023-11-25T16:45:00",
    data: {
      totalAudits: 12,
      discrepancies: 23,
      resolvedDiscrepancies: 20,
      inventoryAccuracy: 98.2,
      recommendations: [
        "Implement barcode scanning for all warehouse operations",
        "Schedule monthly cycle counts for high-value items",
        "Review access controls for inventory management system"
      ]
    }
  },
  {
    id: "r4",
    title: "Quarterly Financial Performance - Q3 2023",
    type: "financial",
    dateRange: {
      start: "2023-07-01",
      end: "2023-09-30"
    },
    createdBy: "Admin User",
    createdAt: "2023-10-15T09:30:00",
    data: {
      revenue: 325678.90,
      costOfGoods: 214567.43,
      grossProfit: 111111.47,
      grossMargin: 34.1,
      operatingExpenses: 78456.32,
      netProfit: 32655.15,
      netMargin: 10.0,
      monthlyBreakdown: [
        { month: "Jul 2023", revenue: 98765.43, profit: 10234.56 },
        { month: "Aug 2023", revenue: 112345.67, profit: 11876.54 },
        { month: "Sep 2023", revenue: 114567.80, profit: 10544.05 }
      ]
    }
  }
];

export async function getAllReports(): Promise<Report[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [...reports];
}

export async function getReportById(id: string): Promise<Report | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return reports.find(report => report.id === id) || null;
}

export async function getReportsByType(type: 'sales' | 'inventory' | 'audit' | 'financial'): Promise<Report[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return reports.filter(report => report.type === type);
}

export async function getRecentReports(limit: number = 5): Promise<Report[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [...reports]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}