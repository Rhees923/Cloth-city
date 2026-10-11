import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Edit, 
  Trash2, 
  Truck, 
  ShieldCheck, 
  Settings, 
  ArrowUpRight, 
  Download, 
  Eye, 
  X,
  Search,
  MessageSquare,
  Star,
  Upload,
  Image as ImageIcon,
  Warehouse,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  Layers,
  Lock,
  Key
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus, Size, Gender, Category, FitType } from '../../types';
import { 
  MONTHLY_SALES_ANALYTICS, 
  TOP_PRODUCTS_DISTRIBUTION, 
  CATEGORY_REVENUE_DATA,
  HERO_BANNER_IMG,
  OVERSIZED_TEE_IMG,
  BAGGY_CARGOS_IMG,
  KERALA_FESTIVE_IMG 
} from '../../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCouponActive,
    enquiries,
    updateEnquiryStatus,
    moderateReview,
    currentUser,
    login,
    navigateTo,
    showToast,
    setActiveInvoiceOrder,
    setIsInvoiceModalOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'products' | 'orders' | 'inventory' | 'warehouses' | 'customers' | 'coupons' | 'reviews' | 'enquiries' | 'settings' | 'audit'
  >('overview');

  // Admin access gate check - required password is "clothcity"
  const [adminPasscode, setAdminPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(currentUser?.role === 'admin');

  // Product CRUD states
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(OVERSIZED_TEE_IMG);

  // Form states for Product
  const [prodForm, setProdForm] = useState({
    title: '',
    subtitle: '',
    sku: '',
    price: 699,
    mrp: 1299,
    gender: 'unisex' as Gender,
    category: 'oversized-tshirts' as Category,
    fitType: 'Oversized' as FitType,
    fabric: '100% Breathable Combed Cotton (240 GSM), pre-shrunk for Kerala weather',
    careInstructions: 'Machine wash cold inside out, tumble dry low.',
    description: '',
    highlights: ['240 GSM Heavyweight French Terry', 'Breathable anti-sweat weave', 'Reinforced drop shoulders'],
    image: OVERSIZED_TEE_IMG,
    colorName: 'Washed Charcoal',
    colorHex: '#27272a',
    stockS: 15,
    stockM: 25,
    stockL: 20,
    stockXL: 10,
    isTrending: true,
    isNewArrival: true
  });

  // Coupon form state
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCouponForm, setNewCouponForm] = useState({
    code: '',
    discountType: 'percentage' as const,
    discountValue: 20,
    minOrderValue: 999,
    maxDiscount: 400,
    description: '',
    validUntil: '2026-12-31'
  });

  // Order status modal
  const [selectedOrderToFulfill, setSelectedOrderToFulfill] = useState<Order | null>(null);
  const [newFulfillStatus, setNewFulfillStatus] = useState<OrderStatus>('Shipped');
  const [courierNameInput, setCourierNameInput] = useState('DTDC Kerala Express');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');

  // Analytics KPI calculations
  const totalRevenue = orders.filter((o) => o.paymentStatus === 'Paid').reduce((s, o) => s + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const totalInventoryUnits = products.reduce((acc, p) => acc + p.variants.reduce((s, v) => s + v.stock, 0), 0);
  const lowStockProducts = products.filter((p) => p.variants.some((v) => v.stock < 5));

  // Multi-Warehouse mock data
  const warehouses = [
    { id: 'wh-01', name: 'Kochi Central Fulfillment Hub', location: 'Aluva / Seaport-Airport Road, Kochi', capacity: '12,000 units', currentStock: 7850, manager: 'Sujith Kumar', status: 'Optimal' },
    { id: 'wh-02', name: 'Kozhikode Regional Hub', location: 'Near Mavoor Road, Calicut', capacity: '5,000 units', currentStock: 3420, manager: 'Rias Ahmed', status: 'Optimal' },
    { id: 'wh-03', name: 'Trivandrum South Depot', location: 'Kazhakkoottam / Technopark Zone', capacity: '4,000 units', currentStock: 2190, manager: 'Anoop Nair', status: 'Restock Required' }
  ];

  // Customers mock data
  const customersList = [
    { id: 'c-01', name: 'Anandhu Mohan', email: 'anandhu.mohan@example.com', district: 'Ernakulam', ordersCount: 4, totalSpend: 5490, loyaltyPoints: 450 },
    { id: 'c-02', name: 'Meera Rajesh', email: 'meera.rajesh@gmail.com', district: 'Kozhikode', ordersCount: 3, totalSpend: 3890, loyaltyPoints: 310 },
    { id: 'c-03', name: 'Gautham Krishna', email: 'gautham.k@cet.ac.in', district: 'Thiruvananthapuram', ordersCount: 5, totalSpend: 7200, loyaltyPoints: 580 },
    { id: 'c-04', name: 'Fathima Rafeeq', email: 'fathima.r@yahoo.com', district: 'Malappuram', ordersCount: 2, totalSpend: 2490, loyaltyPoints: 190 },
    { id: 'c-05', name: 'Arjun Nambiar', email: 'arjun.nambiar@outlook.com', district: 'Kannur', ordersCount: 6, totalSpend: 8650, loyaltyPoints: 690 }
  ];

  // Handle Admin Passcode Login - MUST BE "clothcity"
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = adminPasscode.trim().toLowerCase();
    if (cleanPass !== 'clothcity') {
      setLoginError('Incorrect password! The admin master password is "clothcity".');
      return;
    }
    setLoginError(null);
    login('admin@clothcity.in', 'admin');
    setIsAdminAuthenticated(true);
    showToast('Administrator authenticated successfully!');
  };

  // Image Upload handler via FileReader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultString = reader.result as string;
        setImagePreviewUrl(resultString);
        setProdForm((prev) => ({ ...prev, image: resultString }));
        showToast('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.title || !prodForm.description) {
      alert('Please fill product title and description');
      return;
    }

    const skuGenerated = prodForm.sku || `CC-${prodForm.title.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const variants = [
      { id: `v-${Date.now()}-s`, size: 'S' as Size, colorName: prodForm.colorName, colorHex: prodForm.colorHex, stock: Number(prodForm.stockS), sku: `${skuGenerated}-S` },
      { id: `v-${Date.now()}-m`, size: 'M' as Size, colorName: prodForm.colorName, colorHex: prodForm.colorHex, stock: Number(prodForm.stockM), sku: `${skuGenerated}-M` },
      { id: `v-${Date.now()}-l`, size: 'L' as Size, colorName: prodForm.colorName, colorHex: prodForm.colorHex, stock: Number(prodForm.stockL), sku: `${skuGenerated}-L` },
      { id: `v-${Date.now()}-xl`, size: 'XL' as Size, colorName: prodForm.colorName, colorHex: prodForm.colorHex, stock: Number(prodForm.stockXL), sku: `${skuGenerated}-XL` }
    ];

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        title: prodForm.title,
        subtitle: prodForm.subtitle,
        sku: skuGenerated,
        price: Number(prodForm.price),
        mrp: Number(prodForm.mrp),
        gender: prodForm.gender,
        category: prodForm.category,
        fitType: prodForm.fitType,
        fabric: prodForm.fabric,
        description: prodForm.description,
        images: [imagePreviewUrl || prodForm.image],
        isTrending: prodForm.isTrending,
        isNewArrival: prodForm.isNewArrival,
        variants
      });
      setEditingProduct(null);
    } else {
      addProduct({
        title: prodForm.title,
        subtitle: prodForm.subtitle,
        sku: skuGenerated,
        price: Number(prodForm.price),
        mrp: Number(prodForm.mrp),
        gender: prodForm.gender,
        category: prodForm.category,
        collections: ['college-wear', 'weekend-fits'],
        fitType: prodForm.fitType,
        fabric: prodForm.fabric,
        careInstructions: prodForm.careInstructions,
        description: prodForm.description,
        highlights: prodForm.highlights,
        images: [imagePreviewUrl || prodForm.image],
        variants,
        availableColors: [{ name: prodForm.colorName, hex: prodForm.colorHex }],
        isTrending: prodForm.isTrending,
        isNewArrival: prodForm.isNewArrival
      });
    }

    setIsAddProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponForm.code) return;
    addCoupon({
      ...newCouponForm,
      active: true
    });
    setIsAddCouponOpen(false);
  };

  const handleUpdateOrderStatusSubmit = () => {
    if (selectedOrderToFulfill) {
      updateOrderStatus(
        selectedOrderToFulfill.id,
        newFulfillStatus,
        courierNameInput,
        trackingNumberInput || `DTDC-KER-${Math.floor(10000000 + Math.random() * 90000000)}`
      );
      setSelectedOrderToFulfill(null);
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Order Number,Date,Customer,Amount,Status,Payment,District\n" +
      orders.map(o => `${o.orderNumber},${o.createdAt},${o.customerName},${o.totalAmount},${o.orderStatus},${o.paymentMethod},${o.shippingAddress.district}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clothcity_sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Sales report CSV downloaded.');
  };

  // If not authenticated, show secure admin login card with password validation
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-zinc-950 text-[#B4F724] font-display font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            CC
          </div>
          <div>
            <h2 className="font-display font-extrabold text-2xl text-zinc-950">
              ClothCity Operations Console
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Authorized access for Kerala warehouse, analytics & inventory management
            </p>
          </div>

          {/* Password Prompt Notification */}
          <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-zinc-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-zinc-900" />
              <span>Admin Password: <strong className="font-mono text-zinc-950 bg-[#B4F724]/60 px-1.5 py-0.5 rounded font-bold">clothcity</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setAdminPasscode('clothcity');
                setLoginError(null);
              }}
              className="text-[11px] font-bold text-zinc-900 hover:underline cursor-pointer"
            >
              Quick-Fill
            </button>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-200">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@clothcity.in"
                className="w-full bg-zinc-50 text-xs p-3 rounded-xl border border-zinc-200"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Master Security Passcode
              </label>
              <input
                type="password"
                placeholder="Enter password (clothcity)"
                value={adminPasscode}
                onChange={(e) => {
                  setAdminPasscode(e.target.value);
                  setLoginError(null);
                }}
                className="w-full bg-zinc-50 text-xs p-3 rounded-xl border border-zinc-200 font-mono"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-zinc-950 hover:bg-black text-[#B4F724] text-xs font-extrabold uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
            >
              Unlock Admin Portal
            </button>
          </form>

          <p className="text-[11px] text-zinc-400">
            ClothCity Internal System v2.8 · Kochi Fulfillment Hub
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold bg-[#B4F724] text-black px-2 py-0.5 rounded uppercase tracking-wider">
              Control Center
            </span>
            <span className="text-xs text-zinc-500 font-medium">Kochi Central Warehouse (Ernakulam)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-950 mt-1">
            ClothCity Business Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setImagePreviewUrl(OVERSIZED_TEE_IMG);
              setProdForm({
                title: '',
                subtitle: '',
                sku: `CC-${Math.floor(1000 + Math.random() * 9000)}`,
                price: 699,
                mrp: 1299,
                gender: 'unisex',
                category: 'oversized-tshirts',
                fitType: 'Oversized',
                fabric: '100% Breathable Combed Cotton (240 GSM), pre-shrunk for Kerala weather',
                careInstructions: 'Machine wash cold inside out, tumble dry low.',
                description: '',
                highlights: ['240 GSM Heavyweight French Terry', 'Breathable anti-sweat weave', 'Reinforced drop shoulders'],
                image: OVERSIZED_TEE_IMG,
                colorName: 'Washed Charcoal',
                colorHex: '#27272a',
                stockS: 15,
                stockM: 25,
                stockL: 20,
                stockXL: 10,
                isTrending: true,
                isNewArrival: true
              });
              setIsAddProductModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#B4F724] hover:bg-[#a3e635] text-black font-extrabold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="px-3.5 py-2 border border-zinc-200 hover:bg-zinc-100 text-xs font-bold text-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            View Storefront
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-200 scrollbar-none">
        {[
          { id: 'overview', label: 'Sales & Charts', icon: BarChart3 },
          { id: 'analytics', label: 'Deep Analytics', icon: TrendingUp },
          { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
          { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
          { id: 'inventory', label: 'Stock & SKUs', icon: AlertTriangle },
          { id: 'warehouses', label: 'Warehouses (3)', icon: Warehouse },
          { id: 'customers', label: `Customers (${customersList.length})`, icon: Users },
          { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
          { id: 'reviews', label: 'Reviews Moderation', icon: Star },
          { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'audit', label: 'Audit Logs', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                active 
                  ? 'bg-zinc-950 text-[#B4F724] shadow-sm' 
                  : 'bg-white text-zinc-600 hover:text-black hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. TAB: OVERVIEW & RECHARTS CHARTS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* KPI Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm">
              <span className="text-xs text-zinc-500 font-semibold">Total Revenue (Paid)</span>
              <p className="text-2xl font-display font-extrabold text-zinc-950 mt-1 tabular-nums">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +28% Onam & Festival Spike
              </span>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm">
              <span className="text-xs text-zinc-500 font-semibold">Gross Profit Margin</span>
              <p className="text-2xl font-display font-extrabold text-zinc-950 mt-1 tabular-nums">
                64.5%
              </p>
              <span className="text-[11px] text-zinc-500 font-medium mt-1 block">
                Net Profit: ₹3,78,000 (Oct)
              </span>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm">
              <span className="text-xs text-zinc-500 font-semibold">Avg. Order Value (AOV)</span>
              <p className="text-2xl font-display font-extrabold text-zinc-950 mt-1 tabular-nums">
                ₹{avgOrderValue || 1450}
              </p>
              <span className="text-[11px] text-zinc-500 font-medium mt-1 block">
                Average 2.2 items / basket
              </span>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm">
              <span className="text-xs text-zinc-500 font-semibold">Total Stock Units</span>
              <p className="text-2xl font-display font-extrabold text-zinc-950 mt-1 tabular-nums">
                {totalInventoryUnits}
              </p>
              <span className="text-[11px] text-amber-600 font-bold mt-1 block">
                {lowStockProducts.length} variants need reordering
              </span>
            </div>
          </div>

          {/* RECHARTS SECTION 1: Monthly Sales Revenue Trend & Top Performing Products */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Monthly Sales Revenue & Net Profit Area Chart */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-extrabold text-base text-zinc-950 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-zinc-900" />
                    <span>Monthly Sales & Revenue Trend (2026)</span>
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Gross sales revenue and realized profit across all 14 Kerala fulfillment regions
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#B4F724] border border-black/20" />
                    <span className="text-zinc-700">Gross Sales (₹)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-zinc-900" />
                    <span className="text-zinc-700">Net Profit (₹)</span>
                  </div>
                </div>
              </div>

              {/* Recharts Area Chart */}
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MONTHLY_SALES_ANALYTICS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B4F724" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#B4F724" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#18181b" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#18181b" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#71717a' }} tickLine={false} axisLine={{ stroke: '#e4e4e7' }} />
                    <YAxis 
                      tick={{ fontSize: 11, fill: '#71717a' }} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => `₹${val / 1000}k`} 
                    />
                    <Tooltip 
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
                      contentStyle={{ backgroundColor: '#18181b', color: '#fff', borderRadius: '1rem', border: 'none', fontSize: '12px' }}
                      itemStyle={{ color: '#B4F724' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Gross Revenue" 
                      stroke="#84cc16" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      name="Net Profit" 
                      stroke="#18181b" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#colorProfit)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top-Performing Product Distribution (PieChart) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-extrabold text-base text-zinc-950 flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-zinc-900" />
                  <span>Top Product Sales Share</span>
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Volume breakdown of best-selling Kerala fits
                </p>
              </div>

              {/* Recharts Pie Chart */}
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={TOP_PRODUCTS_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="sales"
                    >
                      {TOP_PRODUCTS_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="#ffffff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any, name: any, props: any) => [
                        `${value} units (₹${props.payload.revenue.toLocaleString('en-IN')})`, 
                        props.payload.name
                      ]}
                      contentStyle={{ backgroundColor: '#18181b', color: '#fff', borderRadius: '1rem', border: 'none', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend Summary */}
              <div className="space-y-1.5 text-xs">
                {TOP_PRODUCTS_DISTRIBUTION.slice(0, 4).map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                      <span className="text-zinc-700 truncate">{item.name}</span>
                    </div>
                    <span className="font-bold text-zinc-900 tabular-nums">{item.sales} units</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RECHARTS SECTION 2: Category Revenue Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display font-extrabold text-base text-zinc-950 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-900" />
                  <span>Revenue by Apparel Category (YTD 2026)</span>
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Comparison of demand between oversized t-shirts, cargos, co-ords, and coastal shirts
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#71717a' }} tickLine={false} axisLine={{ stroke: '#e4e4e7' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#71717a' }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip 
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                    contentStyle={{ backgroundColor: '#18181b', color: '#fff', borderRadius: '1rem', border: 'none', fontSize: '12px' }}
                  />
                  <Bar dataKey="revenue" fill="#18181b" radius={[8, 8, 0, 0]}>
                    {CATEGORY_REVENUE_DATA.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={index === 0 ? '#B4F724' : index === 1 ? '#18181b' : '#3f3f46'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-zinc-950">
                Recent Orders Stream
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-black hover:underline cursor-pointer"
              >
                View all orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-medium">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-50">
                      <td className="p-3 font-bold text-zinc-900">{o.orderNumber}</td>
                      <td className="p-3">{o.customerName}</td>
                      <td className="p-3 text-zinc-600">{o.shippingAddress.district}</td>
                      <td className="p-3 font-bold tabular-nums">₹{o.totalAmount}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-800">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrderToFulfill(o);
                            setNewFulfillStatus(o.orderStatus);
                          }}
                          className="px-2.5 py-1 bg-black text-white text-[11px] font-bold rounded-lg cursor-pointer"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB: DEEP FINANCIAL ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-xl text-zinc-950">
                Kerala Financial & Tax Performance
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                GST reports, return adjustments, packaging expenses, and regional shipping ROI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                <span className="text-xs text-zinc-500">Gross Sales</span>
                <p className="text-xl font-bold text-zinc-950 mt-1">₹5,85,000</p>
                <span className="text-[11px] text-zinc-400">Total order billings</span>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                <span className="text-xs text-zinc-500">Cost of Goods Sold (COGS)</span>
                <p className="text-xl font-bold text-zinc-950 mt-1">₹1,75,500</p>
                <span className="text-[11px] text-zinc-400">Cotton mills & fabrication</span>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                <span className="text-xs text-zinc-500">Kerala GST Realized (5%)</span>
                <p className="text-xl font-bold text-zinc-950 mt-1">₹29,250</p>
                <span className="text-[11px] text-zinc-400">CGST ₹14,625 + SGST ₹14,625</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200">
              <h4 className="font-bold text-sm text-zinc-900 mb-2">District Conversion & AOV Breakdown</h4>
              <div className="space-y-2 text-xs text-zinc-700">
                <div className="flex justify-between p-2.5 bg-zinc-50 rounded-xl">
                  <span>1. Ernakulam / Kochi (Metro Express)</span>
                  <span className="font-bold tabular-nums">42% of volume · AOV ₹1,680</span>
                </div>
                <div className="flex justify-between p-2.5 bg-zinc-50 rounded-xl">
                  <span>2. Kozhikode / Calicut Beach Hub</span>
                  <span className="font-bold tabular-nums">26% of volume · AOV ₹1,420</span>
                </div>
                <div className="flex justify-between p-2.5 bg-zinc-50 rounded-xl">
                  <span>3. Thiruvananthapuram (Technopark / CET)</span>
                  <span className="font-bold tabular-nums">18% of volume · AOV ₹1,550</span>
                </div>
                <div className="flex justify-between p-2.5 bg-zinc-50 rounded-xl">
                  <span>4. All other 11 Kerala Districts</span>
                  <span className="font-bold tabular-nums">14% of volume · AOV ₹1,290</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-zinc-950">
              Catalog Products ({products.length})
            </h3>
            <button
              onClick={() => {
                setEditingProduct(null);
                setImagePreviewUrl(OVERSIZED_TEE_IMG);
                setIsAddProductModalOpen(true);
              }}
              className="px-4 py-2 bg-black text-[#B4F724] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product with Image</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] bg-zinc-100">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-black text-white px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    {p.sku && (
                      <span className="absolute top-2 right-2 text-[10px] font-mono font-bold bg-white/90 text-black px-2 py-0.5 rounded shadow-sm">
                        {p.sku}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">{p.title}</h4>
                    <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{p.subtitle}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-zinc-950">₹{p.price}</span>
                      <span className="text-xs text-zinc-400 line-through">₹{p.mrp}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.variants.map((v) => (
                        <span key={v.id} className="text-[10px] px-2 py-0.5 bg-zinc-100 rounded text-zinc-700">
                          {v.size}: <strong>{v.stock}</strong> in stock
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setImagePreviewUrl(p.images[0]);
                      setProdForm({
                        title: p.title,
                        subtitle: p.subtitle,
                        sku: p.sku || '',
                        price: p.price,
                        mrp: p.mrp,
                        gender: p.gender,
                        category: p.category,
                        fitType: p.fitType,
                        fabric: p.fabric,
                        careInstructions: p.careInstructions,
                        description: p.description,
                        highlights: p.highlights,
                        image: p.images[0],
                        colorName: p.availableColors[0]?.name || 'Charcoal',
                        colorHex: p.availableColors[0]?.hex || '#27272a',
                        stockS: p.variants.find(v => v.size === 'S')?.stock || 10,
                        stockM: p.variants.find(v => v.size === 'M')?.stock || 20,
                        stockL: p.variants.find(v => v.size === 'L')?.stock || 15,
                        stockXL: p.variants.find(v => v.size === 'XL')?.stock || 5,
                        isTrending: !!p.isTrending,
                        isNewArrival: !!p.isNewArrival
                      });
                      setIsAddProductModalOpen(true);
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-zinc-700 hover:text-black cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-zinc-950">
              Orders Management ({orders.length})
            </h3>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Order Number</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Customer & Phone</th>
                    <th className="p-3.5">Kerala Address</th>
                    <th className="p-3.5">Total & Payment</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-medium">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-50">
                      <td className="p-3.5 font-bold text-zinc-900">{o.orderNumber}</td>
                      <td className="p-3.5 text-zinc-500">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="p-3.5">
                        <span className="font-bold block text-zinc-900">{o.customerName}</span>
                        <span className="text-zinc-500 text-[11px]">{o.customerPhone}</span>
                      </td>
                      <td className="p-3.5 text-zinc-600 max-w-xs truncate">
                        {o.shippingAddress.locality}, {o.shippingAddress.district} - {o.shippingAddress.pincode}
                      </td>
                      <td className="p-3.5">
                        <span className="font-extrabold text-zinc-950 tabular-nums">₹{o.totalAmount}</span>
                        <span className="block text-[10px] text-zinc-500">{o.paymentMethod} ({o.paymentStatus})</span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-800">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrderToFulfill(o);
                            setNewFulfillStatus(o.orderStatus);
                          }}
                          className="px-2.5 py-1 bg-black text-white text-[11px] font-bold rounded-lg cursor-pointer"
                        >
                          Fulfill / Track
                        </button>
                        <button
                          onClick={() => {
                            setActiveInvoiceOrder(o);
                            setIsInvoiceModalOpen(true);
                          }}
                          className="px-2 py-1 text-zinc-600 hover:text-black text-[11px] font-semibold cursor-pointer"
                        >
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB: INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <h3 className="font-display font-bold text-lg text-zinc-950">
            Real-Time Inventory & Size Variant Monitor
          </h3>
          <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Product Title</th>
                  <th className="p-3.5">SKU</th>
                  <th className="p-3.5">Size</th>
                  <th className="p-3.5">Color</th>
                  <th className="p-3.5">Current Stock</th>
                  <th className="p-3.5 text-right">Quick Stock Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-medium">
                {products.flatMap((p) =>
                  p.variants.map((v) => (
                    <tr key={v.id} className="hover:bg-zinc-50">
                      <td className="p-3.5 font-bold text-zinc-900">{p.title}</td>
                      <td className="p-3.5 font-mono text-[11px] text-zinc-600">{v.sku}</td>
                      <td className="p-3.5 font-bold">{v.size}</td>
                      <td className="p-3.5">{v.colorName}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          v.stock < 5 ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-800'
                        }`}>
                          {v.stock} units
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => updateStock(p.id, v.id, Math.max(0, v.stock - 5))}
                          className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 rounded text-[11px] font-bold cursor-pointer"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => updateStock(p.id, v.id, v.stock + 10)}
                          className="px-2 py-1 bg-black text-white hover:bg-zinc-800 rounded text-[11px] font-bold cursor-pointer"
                        >
                          +10 Restock
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB: MULTI-WAREHOUSE LOCATIONS */}
      {activeTab === 'warehouses' && (
        <div className="space-y-6">
          <h3 className="font-display font-bold text-lg text-zinc-950">
            Kerala Distribution Warehouses & Depots
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warehouses.map((wh) => (
              <div key={wh.id} className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                    {wh.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    wh.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {wh.status}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-zinc-950">{wh.name}</h4>
                <p className="text-xs text-zinc-500">{wh.location}</p>
                <div className="pt-2 border-t border-zinc-100 text-xs space-y-1 text-zinc-700">
                  <p>Capacity: <strong>{wh.capacity}</strong></p>
                  <p>Stock Count: <strong>{wh.currentStock} units</strong></p>
                  <p>Lead Manager: <strong>{wh.manager}</strong></p>
                </div>
                <button
                  onClick={() => showToast(`Initiated stock audit for ${wh.name}`)}
                  className="w-full mt-2 py-2 bg-zinc-100 hover:bg-zinc-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Initiate Stock Transfer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB: CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <h3 className="font-display font-bold text-lg text-zinc-950">
            Kerala Customer Directory & Loyalty Rewards
          </h3>
          <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">District</th>
                  <th className="p-3.5">Orders Count</th>
                  <th className="p-3.5">Total Spent</th>
                  <th className="p-3.5">Loyalty Coins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-medium">
                {customersList.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-50">
                    <td className="p-3.5 font-bold text-zinc-950">{c.name}</td>
                    <td className="p-3.5 text-zinc-600">{c.email}</td>
                    <td className="p-3.5">{c.district}</td>
                    <td className="p-3.5 font-bold tabular-nums">{c.ordersCount} orders</td>
                    <td className="p-3.5 font-bold tabular-nums text-emerald-800">₹{c.totalSpend.toLocaleString('en-IN')}</td>
                    <td className="p-3.5 font-bold text-zinc-900 bg-zinc-50/50">{c.loyaltyPoints} Coins</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. TAB: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-zinc-950">
              Coupons & Promotional Rules
            </h3>
            <button
              onClick={() => setIsAddCouponOpen(true)}
              className="px-4 py-2 bg-black text-[#B4F724] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div key={c.code} className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-zinc-950 bg-[#B4F724] px-2 py-0.5 rounded">
                      {c.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-600'}`}>
                      {c.active ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-2">{c.description}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Min Order: ₹{c.minOrderValue} · Valid: {c.validUntil}</p>
                </div>
                <button
                  onClick={() => toggleCouponActive(c.code)}
                  className="px-3 py-1.5 border border-zinc-300 hover:border-black text-xs font-bold rounded-xl cursor-pointer"
                >
                  {c.active ? 'Pause' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. TAB: REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <h3 className="font-display font-bold text-lg text-zinc-950">
            Verified Customer Reviews Moderation
          </h3>
          <div className="space-y-4">
            {products.flatMap((p) =>
              p.reviews.map((r) => (
                <div key={r.id} className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-950">{r.userName}</span>
                      <span className="text-xs text-zinc-500">({r.userCity})</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded">Verified</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-800 mt-1">{r.title}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{r.comment}</p>
                    <p className="text-[11px] text-zinc-400 mt-1">Item: {p.title} · Fit: {r.fitFeedback}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => moderateReview(p.id, r.id, 'approved')}
                      className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => moderateReview(p.id, r.id, 'rejected')}
                      className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 10. TAB: CUSTOMER ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <h3 className="font-display font-bold text-lg text-zinc-950">
            Customer Inquiries & Support Tickets
          </h3>
          <div className="space-y-4">
            {enquiries.map((msg) => (
              <div key={msg.id} className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-950">{msg.name} ({msg.email})</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    msg.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {msg.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs font-bold text-zinc-800">{msg.subject}</p>
                <p className="text-xs text-zinc-600">{msg.message}</p>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => updateEnquiryStatus(msg.id, 'replied')}
                    className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Mark as Replied via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. TAB: STORE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 max-w-xl space-y-4">
          <h3 className="font-display font-bold text-base text-zinc-950 mb-2">
            Store & Logistics Configuration
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Free Delivery Threshold (INR)
              </label>
              <input type="number" defaultValue={999} className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200" />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Store WhatsApp Support Number
              </label>
              <input type="text" defaultValue="+91 98471 23456" className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200" />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Central Warehouse Hub Address
              </label>
              <input type="text" defaultValue="ClothCity Hub, Seaport-Airport Road, Kochi, Kerala" className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200" />
            </div>
            <button
              onClick={() => showToast('Store settings saved successfully.')}
              className="px-5 py-2 bg-black text-white font-bold rounded-xl cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* 12. TAB: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 space-y-3">
          <h3 className="font-display font-bold text-base text-zinc-950 mb-2">
            Operations Audit Log
          </h3>
          <div className="text-xs text-zinc-600 space-y-2 font-mono">
            <p>• {new Date().toLocaleTimeString()} - Admin signed in from Kochi Operations Hub</p>
            <p>• 2026-10-10 18:20 - Order CC-KER-84920 marked as Shipped via DTDC Aluva</p>
            <p>• 2026-10-10 14:00 - Inventory check completed: 100% matched physical warehouse count</p>
            <p>• 2026-10-09 11:15 - Kasavu Boxy Linen Co-Ord catalog price updated to ₹1499</p>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL WITH REAL IMAGE UPLOAD */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddProductModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <h3 className="font-display font-bold text-lg text-zinc-950">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Kerala Fashion Product'}
                </h3>
                <button onClick={() => setIsAddProductModalOpen(false)} className="p-1.5 text-zinc-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="mt-5 space-y-4 max-h-[72vh] overflow-y-auto pr-1">
                
                {/* Real Image Upload Container */}
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                    Product Photography & Visual Asset
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Live Preview Thumbnail */}
                    <div className="w-24 h-32 rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-300 shrink-0 relative">
                      <img
                        src={imagePreviewUrl || prodForm.image}
                        alt="Product Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2 w-full text-xs">
                      {/* Local File Upload Input */}
                      <div>
                        <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-black text-[#B4F724] text-xs font-bold rounded-xl cursor-pointer hover:bg-zinc-800 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[11px] text-zinc-500 ml-2">PNG, JPG, WebP supported</span>
                      </div>

                      {/* Image URL Input */}
                      <div>
                        <input
                          type="text"
                          placeholder="Or paste image URL..."
                          value={prodForm.image}
                          onChange={(e) => {
                            setProdForm({ ...prodForm, image: e.target.value });
                            setImagePreviewUrl(e.target.value);
                          }}
                          className="w-full bg-white text-xs p-2 rounded-xl border border-zinc-300 font-mono"
                        />
                      </div>

                      {/* Quick Kerala Presets */}
                      <div className="flex items-center gap-1.5 pt-1 text-[10px]">
                        <span className="text-zinc-500 font-bold">Presets:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreviewUrl(OVERSIZED_TEE_IMG);
                            setProdForm({ ...prodForm, image: OVERSIZED_TEE_IMG });
                          }}
                          className="px-2 py-0.5 bg-zinc-200 hover:bg-zinc-300 rounded font-semibold cursor-pointer"
                        >
                          Oversized Tee
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreviewUrl(BAGGY_CARGOS_IMG);
                            setProdForm({ ...prodForm, image: BAGGY_CARGOS_IMG });
                          }}
                          className="px-2 py-0.5 bg-zinc-200 hover:bg-zinc-300 rounded font-semibold cursor-pointer"
                        >
                          Baggy Cargos
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreviewUrl(KERALA_FESTIVE_IMG);
                            setProdForm({ ...prodForm, image: KERALA_FESTIVE_IMG });
                          }}
                          className="px-2 py-0.5 bg-zinc-200 hover:bg-zinc-300 rounded font-semibold cursor-pointer"
                        >
                          Kasavu Co-Ord
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Name & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Product Title</label>
                    <input
                      type="text"
                      value={prodForm.title}
                      onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                      placeholder="e.g. Kozhikode Heavy Boxy Street Tee"
                      className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">SKU / Code</label>
                    <input
                      type="text"
                      value={prodForm.sku}
                      onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                      placeholder="CC-TEE-0484"
                      className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Subtitle / Selling Hook</label>
                  <input
                    type="text"
                    value={prodForm.subtitle}
                    onChange={(e) => setProdForm({ ...prodForm, subtitle: e.target.value })}
                    placeholder="240 GSM Combed Cotton for coastal climate"
                    className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Sale Price (₹)</label>
                    <input
                      type="number"
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                      className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">MRP Strike Price (₹)</label>
                    <input
                      type="number"
                      value={prodForm.mrp}
                      onChange={(e) => setProdForm({ ...prodForm, mrp: Number(e.target.value) })}
                      className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Gender</label>
                    <select
                      value={prodForm.gender}
                      onChange={(e) => setProdForm({ ...prodForm, gender: e.target.value as Gender })}
                      className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                    >
                      <option value="unisex">Unisex</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Category</label>
                    <select
                      value={prodForm.category}
                      onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as Category })}
                      className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                    >
                      <option value="oversized-tshirts">Oversized T-Shirts</option>
                      <option value="graphic-tshirts">Graphic T-Shirts</option>
                      <option value="plain-tshirts">Plain T-Shirts</option>
                      <option value="shirts">Shirts</option>
                      <option value="jeans">Jeans</option>
                      <option value="pants-cargos">Pants & Cargos</option>
                      <option value="shorts">Shorts</option>
                      <option value="coords">Co-Ord Sets</option>
                      <option value="hoodies">Hoodies</option>
                      <option value="caps-accessories">Caps & Accessories</option>
                      <option value="ethnicwear">Ethnicwear</option>
                      <option value="sportswear">Sportswear</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Fit Type</label>
                    <select
                      value={prodForm.fitType}
                      onChange={(e) => setProdForm({ ...prodForm, fitType: e.target.value as FitType })}
                      className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                    >
                      <option value="Oversized">Oversized</option>
                      <option value="Drop-Shoulder">Drop-Shoulder</option>
                      <option value="Boxy">Boxy</option>
                      <option value="Baggy">Baggy</option>
                      <option value="Relaxed">Relaxed</option>
                      <option value="Straight">Straight</option>
                      <option value="Regular">Regular</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Fabric & Weather Specs</label>
                  <input
                    type="text"
                    value={prodForm.fabric}
                    onChange={(e) => setProdForm({ ...prodForm, fabric: e.target.value })}
                    className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={prodForm.description}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                    placeholder="Describe tailoring, styling advice for Kerala youth..."
                    required
                  />
                </div>

                {/* Stock per size */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Stock Quantities Per Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold">Size S</span>
                      <input type="number" value={prodForm.stockS} onChange={(e) => setProdForm({ ...prodForm, stockS: Number(e.target.value) })} className="w-full bg-zinc-50 text-xs p-2 rounded-lg border border-zinc-200" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold">Size M</span>
                      <input type="number" value={prodForm.stockM} onChange={(e) => setProdForm({ ...prodForm, stockM: Number(e.target.value) })} className="w-full bg-zinc-50 text-xs p-2 rounded-lg border border-zinc-200" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold">Size L</span>
                      <input type="number" value={prodForm.stockL} onChange={(e) => setProdForm({ ...prodForm, stockL: Number(e.target.value) })} className="w-full bg-zinc-50 text-xs p-2 rounded-lg border border-zinc-200" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold">Size XL</span>
                      <input type="number" value={prodForm.stockXL} onChange={(e) => setProdForm({ ...prodForm, stockXL: Number(e.target.value) })} className="w-full bg-zinc-50 text-xs p-2 rounded-lg border border-zinc-200" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-1.5 text-xs text-zinc-800 cursor-pointer">
                    <input type="checkbox" checked={prodForm.isTrending} onChange={(e) => setProdForm({ ...prodForm, isTrending: e.target.checked })} className="rounded" />
                    <span>Trending Now Tag</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-800 cursor-pointer">
                    <input type="checkbox" checked={prodForm.isNewArrival} onChange={(e) => setProdForm({ ...prodForm, isNewArrival: e.target.checked })} className="rounded" />
                    <span>New Arrival Tag</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddProductModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-zinc-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-black text-[#B4F724] text-xs font-bold rounded-xl">
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE ORDER STATUS MODAL */}
      {selectedOrderToFulfill && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrderToFulfill(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 animate-in zoom-in-95 duration-150">
              <h3 className="font-display font-bold text-base text-zinc-950 mb-1">
                Fulfill Order {selectedOrderToFulfill.orderNumber}
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                Destination: {selectedOrderToFulfill.shippingAddress.locality}, {selectedOrderToFulfill.shippingAddress.district}
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">New Order Status</label>
                  <select
                    value={newFulfillStatus}
                    onChange={(e) => setNewFulfillStatus(e.target.value as OrderStatus)}
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Courier Partner</label>
                  <input
                    type="text"
                    value={courierNameInput}
                    onChange={(e) => setCourierNameInput(e.target.value)}
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">AWB Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    placeholder="e.g. DTDC-KER-94821034"
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setSelectedOrderToFulfill(null)} className="px-4 py-2 text-xs font-semibold text-zinc-600">
                  Cancel
                </button>
                <button onClick={handleUpdateOrderStatusSubmit} className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl">
                  Update & Notify Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE COUPON MODAL */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddCouponOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 animate-in zoom-in-95 duration-150">
              <h3 className="font-display font-bold text-base text-zinc-950 mb-3">
                Create New Promotional Coupon
              </h3>
              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Coupon Code</label>
                  <input
                    type="text"
                    placeholder="e.g. ONAM25"
                    value={newCouponForm.code}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, code: e.target.value.toUpperCase() })}
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 uppercase font-bold"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Discount (%)</label>
                    <input
                      type="number"
                      value={newCouponForm.discountValue}
                      onChange={(e) => setNewCouponForm({ ...newCouponForm, discountValue: Number(e.target.value) })}
                      className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Min Order (₹)</label>
                    <input
                      type="number"
                      value={newCouponForm.minOrderValue}
                      onChange={(e) => setNewCouponForm({ ...newCouponForm, minOrderValue: Number(e.target.value) })}
                      className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 25% festive discount for Kerala customers"
                    value={newCouponForm.description}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, description: e.target.value })}
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                    required
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddCouponOpen(false)} className="px-4 py-2 text-xs font-semibold text-zinc-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl">
                    Create Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
