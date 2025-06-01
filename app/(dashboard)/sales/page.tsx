"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { getAllSales } from "@/lib/data/sales";
import { Sale } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { hasAccess } from "@/lib/utils/permissions";
import { Plus, Eye, RotateCcw, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SalesPage() {
  const { user } = useAuth();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  
  const canCreateSale = user ? hasAccess(user.role, "sales", "create") : false;
  const canEditSale = user ? hasAccess(user.role, "sales", "edit") : false;
  const canReturnSale = user ? hasAccess(user.role, "returns", "create") : false;

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const data = await getAllSales();
        setSales(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const columns: ColumnDef<Sale>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return <span className="text-sm">{new Date(row.original.date).toLocaleDateString()}</span>;
      },
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium">{row.original.customer}</span>
            <span className="text-xs text-muted-foreground">Sales: {row.original.salesPerson}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => {
        const products = row.original.products;
        return (
          <div className="max-w-[250px]">
            <span className="text-sm">
              {products.map(p => p.name).join(", ")}
            </span>
            <span className="text-xs block text-muted-foreground">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        return <span className="font-medium">${row.original.total.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      cell: ({ row }) => {
        const method = row.original.paymentMethod;
        const formattedMethod = method
          .split("_")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        return <span className="text-sm">{formattedMethod}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === 'completed' ? 'default' : 'secondary'} className={status === 'completed' ? 'bg-emerald-600' : ''}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
            {canEditSale && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
            {canReturnSale && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Return</span>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer
      title="Sales"
      description="View and manage all sales transactions"
    >
      <div className="flex justify-between mb-4">
        <div>
          {/* Filters could go here */}
        </div>
        {canCreateSale && (
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            New Sale
          </Button>
        )}
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading sales...</p>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={sales}
          searchKey="customer"
          searchPlaceholder="Search by customer..."
        />
      )}
    </PageContainer>
  );
}