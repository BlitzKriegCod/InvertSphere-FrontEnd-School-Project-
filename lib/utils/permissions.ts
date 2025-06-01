import { Role } from "@/lib/types";

// Define access permissions by section and role
export const sectionPermissions = {
  dashboard: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: false, edit: false, delete: false },
    inventory: { view: true, create: false, edit: false, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  products: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: false, edit: false, delete: false },
    inventory: { view: true, create: true, edit: true, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  sales: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: true, edit: true, delete: false },
    inventory: { view: true, create: false, edit: false, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  returns: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: true, edit: true, delete: false },
    inventory: { view: true, create: false, edit: false, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  inventory: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: false, edit: false, delete: false },
    inventory: { view: true, create: true, edit: true, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  suppliers: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: false, edit: false, delete: false },
    inventory: { view: true, create: true, edit: true, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  clients: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: true, edit: true, delete: false },
    inventory: { view: false, create: false, edit: false, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  reports: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: true, edit: false, delete: false },
    sales: { view: true, create: false, edit: false, delete: false },
    inventory: { view: true, create: true, edit: false, delete: false },
    auditor: { view: true, create: true, edit: false, delete: false }
  },
  users: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: false, edit: false, delete: false },
    sales: { view: false, create: false, edit: false, delete: false },
    inventory: { view: false, create: false, edit: false, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  },
  settings: {
    admin: { view: true, create: true, edit: true, delete: true },
    manager: { view: true, create: false, edit: false, delete: false },
    sales: { view: false, create: false, edit: false, delete: false },
    inventory: { view: false, create: false, edit: false, delete: false },
    auditor: { view: true, create: false, edit: false, delete: false }
  }
};

// Define type for valid section names
type SectionKey = keyof typeof sectionPermissions;

// Check if a string is a valid section key
function isSectionKey(key: string): key is SectionKey {
  return key in sectionPermissions;
}

// Check if a user has access to a specific section and action
export function hasAccess(role: Role, section: string, action: 'view' | 'create' | 'edit' | 'delete'): boolean {
  if (!isSectionKey(section)) {
    return false;
  }
  
  return sectionPermissions[section][role][action];
}

// Get all sections a user can view
export function getAccessibleSections(role: Role): string[] {
  return Object.keys(sectionPermissions).filter(section => 
    hasAccess(role, section, 'view')
  );
}

// Get navigation items based on role
export function getNavigation(role: Role) {
  const sections = getAccessibleSections(role);
  
  return [
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard', visible: sections.includes('dashboard') },
    { name: 'Products', href: '/products', icon: 'Package', visible: sections.includes('products') },
    { name: 'Sales', href: '/sales', icon: 'ShoppingCart', visible: sections.includes('sales') },
    { name: 'Returns', href: '/returns', icon: 'RotateCcw', visible: sections.includes('returns') },
    { name: 'Inventory', href: '/inventory', icon: 'Boxes', visible: sections.includes('inventory') },
    { name: 'Suppliers', href: '/suppliers', icon: 'Truck', visible: sections.includes('suppliers') },
    { name: 'Clients', href: '/clients', icon: 'Users', visible: sections.includes('clients') },
    { name: 'Reports', href: '/reports', icon: 'BarChart2', visible: sections.includes('reports') },
    { name: 'Users', href: '/users', icon: 'UserCog', visible: sections.includes('users') },
    { name: 'Settings', href: '/settings', icon: 'Settings', visible: sections.includes('settings') },
  ].filter(item => item.visible);
}