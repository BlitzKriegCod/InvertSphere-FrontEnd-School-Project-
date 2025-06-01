"use client";

import { useAuth } from "@/hooks/useAuth";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/ui/dashboard/stat-card";
import { ChartCard } from "@/components/ui/dashboard/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { getAllProducts, getLowStockProducts } from "@/lib/data/products";
import { getRecentSales } from "@/lib/data/sales";
import { getRecentInventoryMovements } from "@/lib/data/inventory";
import { getTopClients } from "@/lib/data/clients";
import { useEffect, useState } from "react";
import { Product, Sale, InventoryMovement, Client } from "@/lib/types";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  AlertTriangle,
  DollarSign,
  BarChart2,
  Boxes,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Truck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [recentMovements, setRecentMovements] = useState<InventoryMovement[]>([]);
  const [topClients, setTopClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, lowStockData, salesData, movementsData, clientsData] = await Promise.all([
          getAllProducts(),
          getLowStockProducts(),
          getRecentSales(),
          getRecentInventoryMovements(),
          getTopClients()
        ]);

        setProducts(productsData);
        setLowStockProducts(lowStockData);
        setRecentSales(salesData);
        setRecentMovements(movementsData);
        setTopClients(clientsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderRoleDashboard = () => {
    switch (user?.role) {
      case "admin":
        return renderAdminDashboard();
      case "manager":
        return renderManagerDashboard();
      case "sales":
        return renderSalesDashboard();
      case "inventory":
        return renderInventoryDashboard();
      case "auditor":
        return renderAuditorDashboard();
      default:
        return <p>Dashboard not available for your role.</p>;
    }
  };

  const renderAdminDashboard = () => {
    // Sample data for admin dashboard
    const salesData = [
      { name: "Jan", value: 24500 },
      { name: "Feb", value: 31200 },
      { name: "Mar", value: 27800 },
      { name: "Apr", value: 35600 },
      { name: "May", value: 42100 },
      { name: "Jun", value: 48900 },
      { name: "Jul", value: 53200 },
      { name: "Aug", value: 49800 },
      { name: "Sep", value: 55400 },
      { name: "Oct", value: 62300 },
      { name: "Nov", value: 58700 },
      { name: "Dec", value: 65100 }
    ];

    const categoryData = [
      { name: "Electronics", value: 45 },
      { name: "Furniture", value: 20 },
      { name: "Office Supplies", value: 35 }
    ];
    
    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Products"
            value={products.length}
            icon={<Package className="h-4 w-4" />}
            description="Total products in inventory"
            trend={{ value: 12, positive: true, label: "from last month" }}
          />
          <StatCard
            title="Total Sales"
            value="$12,543.32"
            icon={<ShoppingCart className="h-4 w-4" />}
            description="Total sales this month"
            trend={{ value: 8.2, positive: true, label: "from last month" }}
          />
          <StatCard
            title="Active Clients"
            value={topClients.length}
            icon={<Users className="h-4 w-4" />}
            description="Active clients this month"
            trend={{ value: 5, positive: true, label: "from last month" }}
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            icon={<AlertTriangle className="h-4 w-4" />}
            description="Items below minimum stock level"
            trend={{ value: 2, positive: false, label: "from last month" }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <ChartCard
            title="Monthly Sales"
            description="Revenue performance for the past 12 months"
            className="lg:col-span-4"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))'
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Inventory by Category" className="lg:col-span-3">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ShoppingCart className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {sale.customer}
                        <span className="ml-2 inline-flex">
                          <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'} className={sale.status === 'completed' ? 'bg-emerald-600' : ''}>
                            {sale.status}
                          </Badge>
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(sale.date).toLocaleDateString()} • ${sale.total.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sale.products.map(p => p.name).join(", ")}
                      </p>
                    </div>
                    <div className="font-medium">${sale.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <AlertTriangle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product.sku} • Stock: {product.stock}/{product.minStock}
                      </p>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${
                            product.stock < product.minStock 
                              ? "bg-destructive" 
                              : "bg-emerald-600"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (product.stock / product.minStock) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="font-medium">
                      {product.stock < product.minStock ? (
                        <Badge variant="destructive">Critical</Badge>
                      ) : (
                        <Badge variant="secondary">Low</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderManagerDashboard = () => {
    // Sample data for manager dashboard
    const revenueData = [
      { name: "Week 1", value: 8500 },
      { name: "Week 2", value: 7200 },
      { name: "Week 3", value: 9800 },
      { name: "Week 4", value: 11200 },
    ];
    
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Monthly Revenue"
            value="$36,700"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Sales Count"
            value="245"
            icon={<ShoppingCart className="h-4 w-4" />}
            trend={{ value: 5, positive: true }}
          />
          <StatCard
            title="Inventory Value"
            value="$198,750"
            icon={<Boxes className="h-4 w-4" />}
            trend={{ value: 2, positive: true }}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-7 mt-4">
          <ChartCard
            title="Weekly Revenue"
            description="Revenue for the current month by week"
            className="md:col-span-4"
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))'
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Top Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.slice(0, 5).map((client) => (
                  <div key={client.id} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-emerald-600 text-primary-foreground">
                        {client.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                    <div className="font-medium">${client.totalPurchases.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4">
          <ChartCard title="Recent Sales" className="w-full">
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <ShoppingCart className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.customer}
                      <span className="ml-2 inline-flex">
                        <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'} className={sale.status === 'completed' ? 'bg-emerald-600' : ''}>
                          {sale.status}
                        </Badge>
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString()} • ${sale.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {sale.products.map(p => p.name).join(", ")}
                    </p>
                  </div>
                  <div className="font-medium">${sale.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </>
    );
  };

  const renderSalesDashboard = () => {
    // Sample data for sales dashboard
    const dailySalesData = [
      { name: "Mon", value: 1200 },
      { name: "Tue", value: 1800 },
      { name: "Wed", value: 1400 },
      { name: "Thu", value: 2200 },
      { name: "Fri", value: 2400 },
      { name: "Sat", value: 1900 },
      { name: "Sun", value: 1000 },
    ];
    
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Sales"
            value="$2,400"
            icon={<ShoppingCart className="h-4 w-4" />}
            trend={{ value: 18, positive: true, label: "vs. yesterday" }}
          />
          <StatCard
            title="Weekly Goal"
            value="68%"
            icon={<TrendingUp className="h-4 w-4" />}
            description="$8,160 of $12,000 target"
          />
          <StatCard
            title="Returns Pending"
            value="3"
            icon={<ArrowDown className="h-4 w-4" />}
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            icon={<AlertTriangle className="h-4 w-4" />}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 mt-4">
          <ChartCard
            title="Daily Sales"
            description="Sales for the current week"
            className="md:col-span-3 lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Sales']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))'
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          
          <Card className="md:col-span-3 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Hot Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-600/10">
                          <Package className="h-4 w-4 text-emerald-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                    </div>
                    <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ShoppingCart className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {sale.customer}
                        <span className="ml-2 inline-flex">
                          <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'} className={sale.status === 'completed' ? 'bg-emerald-600' : ''}>
                            {sale.status}
                          </Badge>
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(sale.date).toLocaleDateString()} • Sales person: {sale.salesPerson}
                      </p>
                    </div>
                    <div className="font-medium">${sale.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderInventoryDashboard = () => {
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Stock Items"
            value={products.length}
            icon={<Boxes className="h-4 w-4" />}
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            icon={<AlertTriangle className="h-4 w-4" />}
            trend={{ value: 3, positive: false, label: "increase" }}
          />
          <StatCard
            title="Movements Today"
            value="12"
            icon={<ArrowUp className="h-4 w-4" />}
            description="7 entries, 5 exits"
          />
          <StatCard
            title="Active Suppliers"
            value="6"
            icon={<Truck className="h-4 w-4" />}
          />
        </div>
        
        <div className="grid gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Inventory Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${
                      movement.type === 'entry' ? 'bg-emerald-600/10' : 
                      movement.type === 'exit' ? 'bg-orange-600/10' : 
                      'bg-blue-600/10'
                    }`}>
                      {movement.type === 'entry' ? (
                        <ArrowUp className={`h-4 w-4 text-emerald-600`} />
                      ) : movement.type === 'exit' ? (
                        <ArrowDown className="h-4 w-4 text-orange-600" />
                      ) : (
                        <BarChart2 className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {movement.type === 'entry' ? 'Inventory Entry' : 
                         movement.type === 'exit' ? 'Inventory Exit' : 
                         'Inventory Adjustment'}
                        <span className="ml-2 inline-flex">
                          <Badge variant="secondary" className={
                            movement.type === 'entry' ? 'bg-emerald-600/20 text-emerald-600' : 
                            movement.type === 'exit' ? 'bg-orange-600/20 text-orange-600' : 
                            'bg-blue-600/20 text-blue-600'
                          }>
                            {movement.type}
                          </Badge>
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(movement.date).toLocaleDateString()} • {movement.reason}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {movement.products.map(p => `${p.name} (${p.quantity})`).join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <AlertTriangle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product.sku} • Location: {product.location}
                      </p>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${
                            product.stock < product.minStock 
                              ? "bg-destructive" 
                              : "bg-emerald-600"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (product.stock / product.minStock) * 100
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Stock: {product.stock}/{product.minStock} • Supplier: {product.supplier}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Warehouse Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Warehouse A</span>
                    <span className="text-sm font-medium">58%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-emerald-600"
                      style={{ width: "58%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Warehouse B</span>
                    <span className="text-sm font-medium">52%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-emerald-600"
                      style={{ width: "52%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Warehouse C</span>
                    <span className="text-sm font-medium">44%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-emerald-600"
                      style={{ width: "44%" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderAuditorDashboard = () => {
    // Sample data for auditor dashboard
    const discrepancyData = [
      { name: "Jan", value: 12 },
      { name: "Feb", value: 8 },
      { name: "Mar", value: 5 },
      { name: "Apr", value: 7 },
      { name: "May", value: 10 },
      { name: "Jun", value: 6 },
      { name: "Jul", value: 4 },
      { name: "Aug", value: 7 },
      { name: "Sep", value: 9 },
      { name: "Oct", value: 5 },
      { name: "Nov", value: 3 },
      { name: "Dec", value: 8 }
    ];
    
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Inventory Accuracy"
            value="98.2%"
            icon={<BarChart2 className="h-4 w-4" />}
            trend={{ value: 1.5, positive: true, label: "vs. last audit" }}
          />
          <StatCard
            title="Pending Discrepancies"
            value="3"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <StatCard
            title="Last Audit"
            value="Nov 25, 2023"
            icon={<BarChart2 className="h-4 w-4" />}
          />
          <StatCard
            title="Total Products Audited"
            value="1,254"
            icon={<Package className="h-4 w-4" />}
          />
        </div>
        
        <div className="grid gap-4 mt-4">
          <ChartCard
            title="Inventory Discrepancies by Month"
            description="Number of discrepancies found during audits"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={discrepancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Discrepancies']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))'
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        
        <div className="grid gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Inventory Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${
                      movement.type === 'entry' ? 'bg-emerald-600/10' : 
                      movement.type === 'exit' ? 'bg-orange-600/10' : 
                      'bg-blue-600/10'
                    }`}>
                      {movement.type === 'entry' ? (
                        <ArrowUp className={`h-4 w-4 text-emerald-600`} />
                      ) : movement.type === 'exit' ? (
                        <ArrowDown className="h-4 w-4 text-orange-600" />
                      ) : (
                        <BarChart2 className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {movement.type === 'entry' ? 'Inventory Entry' : 
                         movement.type === 'exit' ? 'Inventory Exit' : 
                         'Inventory Adjustment'}
                        <span className="ml-2 inline-flex">
                          <Badge variant="secondary" className={
                            movement.type === 'entry' ? 'bg-emerald-600/20 text-emerald-600' : 
                            movement.type === 'exit' ? 'bg-orange-600/20 text-orange-600' : 
                            'bg-blue-600/20 text-blue-600'
                          }>
                            {movement.type}
                          </Badge>
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(movement.date).toLocaleDateString()} • Created by: {movement.createdBy}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {movement.products.map(p => `${p.name} (${p.quantity})`).join(", ")}
                      </p>
                      {movement.reference && (
                        <p className="text-xs text-muted-foreground">
                          Reference: {movement.reference}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  return (
    <PageContainer
      title={`Welcome back, ${user?.name}`}
      description={`Here's what's happening with your inventory today.`}
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        renderRoleDashboard()
      )}
    </PageContainer>
  );
}