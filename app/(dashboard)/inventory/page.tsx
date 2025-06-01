"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { getAllInventoryMovements } from "@/lib/data/inventory";
import { InventoryMovement } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { hasAccess } from "@/lib/utils/permissions";
import { Plus, ArrowUp, ArrowDown, BarChart2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InventoryPage() {
  const { user } = useAuth();
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  
  const canCreateMovement = user ? hasAccess(user.role, "inventory", "create") : false;

  useEffect(() => {
    const fetchMovements = async () => {
      setLoading(true);
      try {
        const data = await getAllInventoryMovements();
        setMovements(data);
      } catch (error) {
        console.error("Error fetching inventory movements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, []);

  const columns: ColumnDef<InventoryMovement>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return <span className="text-sm">{new Date(row.original.date).toLocaleDateString()}</span>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <Badge 
            variant="secondary" 
            className={
              type === 'entry' ? 'bg-emerald-600/20 text-emerald-600' : 
              type === 'exit' ? 'bg-orange-600/20 text-orange-600' : 
              'bg-blue-600/20 text-blue-600'
            }
          >
            {type === 'entry' ? 'Entry' : type === 'exit' ? 'Exit' : 'Adjustment'}
          </Badge>
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
              {products.map(p => `${p.name} (${p.quantity})`).join(", ")}
            </span>
            <span className="text-xs block text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}
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
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }) => {
        return <span className="text-sm">{row.original.createdBy}</span>;
      },
    },
    {
      accessorKey: "reference",
      header: "Reference",
      cell: ({ row }) => {
        return row.original.reference ? (
          <span className="text-sm">#{row.original.reference}</span>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
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
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer
      title="Inventory Management"
      description="Track and manage inventory movements"
    >
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Movements</TabsTrigger>
            <TabsTrigger value="entry">Entries</TabsTrigger>
            <TabsTrigger value="exit">Exits</TabsTrigger>
            <TabsTrigger value="adjustment">Adjustments</TabsTrigger>
          </TabsList>

          {canCreateMovement && (
            <div className="flex gap-2">
              <Button variant="outline" className="text-emerald-600 border-emerald-600">
                <ArrowUp className="mr-2 h-4 w-4" />
                New Entry
              </Button>
              <Button variant="outline" className="text-orange-600 border-orange-600">
                <ArrowDown className="mr-2 h-4 w-4" />
                New Exit
              </Button>
              <Button variant="outline" className="text-blue-600 border-blue-600">
                <BarChart2 className="mr-2 h-4 w-4" />
                New Adjustment
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="all" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Loading inventory movements...</p>
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={movements}
              searchKey="reason"
              searchPlaceholder="Search by reason..."
            />
          )}
        </TabsContent>
        
        <TabsContent value="entry" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Loading inventory entries...</p>
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={movements.filter(m => m.type === 'entry')}
              searchKey="reason"
              searchPlaceholder="Search by reason..."
            />
          )}
        </TabsContent>
        
        <TabsContent value="exit" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Loading inventory exits...</p>
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={movements.filter(m => m.type === 'exit')}
              searchKey="reason"
              searchPlaceholder="Search by reason..."
            />
          )}
        </TabsContent>
        
        <TabsContent value="adjustment" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Loading inventory adjustments...</p>
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={movements.filter(m => m.type === 'adjustment')}
              searchKey="reason"
              searchPlaceholder="Search by reason..."
            />
          )}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}