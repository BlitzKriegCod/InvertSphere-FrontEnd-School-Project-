"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { getAllReturns } from "@/lib/data/sales";
import { Return } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { hasAccess } from "@/lib/utils/permissions";
import { Plus, Eye, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReturnsPage() {
  const { user } = useAuth();
  const [returns, setReturns] = useState<Return[]>([]);
  const [loading, setLoading] = useState(true);
  
  const canCreateReturn = user ? hasAccess(user.role, "returns", "create") : false;
  const canEditReturn = user ? hasAccess(user.role, "returns", "edit") : false;

  useEffect(() => {
    const fetchReturns = async () => {
      setLoading(true);
      try {
        const data = await getAllReturns();
        setReturns(data);
      } catch (error) {
        console.error("Error fetching returns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  const columns: ColumnDef<Return>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return <span className="text-sm">{new Date(row.original.date).toLocaleDateString()}</span>;
      },
    },
    {
      accessorKey: "saleId",
      header: "Sale Reference",
      cell: ({ row }) => {
        return <span className="font-medium">#{row.original.saleId}</span>;
      },
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return <span className="text-sm">{row.original.customer}</span>;
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
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => {
        return <span className="text-sm">{row.original.reason}</span>;
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge 
            variant="secondary" 
            className={
              status === 'processed' ? 'bg-emerald-600/20 text-emerald-600' : 
              status === 'rejected' ? 'bg-destructive/20 text-destructive' : 
              'bg-amber-500/20 text-amber-500'
            }
          >
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
            {canEditReturn && row.original.status === 'pending' && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Process</span>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer
      title="Returns"
      description="View and manage product returns and refunds"
    >
      <div className="flex justify-between mb-4">
        <div>
          {/* Filters could go here */}
        </div>
        {canCreateReturn && (
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            New Return
          </Button>
        )}
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading returns...</p>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={returns}
          searchKey="customer"
          searchPlaceholder="Search by customer..."
        />
      )}
    </PageContainer>
  );
}