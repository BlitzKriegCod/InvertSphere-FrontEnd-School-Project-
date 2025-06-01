"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/data/products";
import { Product } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { hasAccess } from "@/lib/utils/permissions";
import { Plus, Package, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const canCreateProduct = user ? hasAccess(user.role, "products", "create") : false;
  const canEditProduct = user ? hasAccess(user.role, "products", "edit") : false;
  const canDeleteProduct = user ? hasAccess(user.role, "products", "delete") : false;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded overflow-hidden bg-muted">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-600/10">
                  <Package className="h-4 w-4 text-emerald-600" />
                </div>
              )}
            </div>
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        return <span className="text-sm">{row.original.category}</span>;
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return <span className="font-medium">${row.original.price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const product = row.original;
        const isLowStock = product.stock <= product.minStock;
        return (
          <div className="flex flex-col">
            <span className="font-medium flex items-center gap-2">
              {product.stock}
              {isLowStock && (
                <Badge variant="destructive" className="text-xs">Low</Badge>
              )}
            </span>
            <span className="text-xs text-muted-foreground">Min: {product.minStock}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        return <span className="text-sm">{row.original.location}</span>;
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) => {
        return <span className="text-sm">{new Date(row.original.lastUpdated).toLocaleDateString()}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {canEditProduct && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
            {canDeleteProduct && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer
      title="Products"
      description="View and manage your product inventory"
    >
      <div className="flex justify-between mb-4">
        <div>
          {/* Filters could go here */}
        </div>
        {canCreateProduct && (
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        )}
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          searchKey="name"
          searchPlaceholder="Search products..."
        />
      )}
    </PageContainer>
  );
}