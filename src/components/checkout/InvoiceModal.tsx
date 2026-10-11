import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { Order } from '../../types';
import { useStore } from '../../context/StoreContext';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  // 5% apparel GST rate breakdown
  const taxableValue = Math.round(order.totalAmount / 1.05);
  const gstAmount = order.totalAmount - taxableValue;
  const cgst = (gstAmount / 2).toFixed(2);
  const sgst = (gstAmount / 2).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity print:hidden"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 animate-in zoom-in-95 duration-150 print:p-0 print:shadow-none print:rounded-none">
          
          {/* Top Bar with Print Actions */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-200 print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-zinc-900">
                Tax Invoice: {order.invoiceNumber}
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Paid & Verified
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Body */}
          <div className="pt-6 space-y-6 text-xs text-zinc-800">
            
            {/* Header: Seller & Customer */}
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-black text-[#B4F724] font-black flex items-center justify-center text-xs">
                    CC
                  </div>
                  <span className="font-display font-black text-base text-black">CLOTHCITY RETAIL PVT LTD</span>
                </div>
                <p className="text-zinc-600">Building 4, Kochi Infopark Express Avenue</p>
                <p className="text-zinc-600">Kakkanad, Ernakulam District, Kerala - 682042</p>
                <p className="text-zinc-600">GSTIN: <strong>32AABCC9812K1Z9</strong> (Kerala)</p>
                <p className="text-zinc-600">State Code: 32 (Kerala)</p>
                <p className="text-zinc-600">Email: care@clothcity.in | +91 98471 23456</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-zinc-900 uppercase">Original For Recipient</p>
                <p className="font-bold text-sm text-zinc-950 mt-1">{order.invoiceNumber}</p>
                <p className="text-zinc-600">Order Ref: {order.orderNumber}</p>
                <p className="text-zinc-600">Invoice Date: {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                <p className="text-zinc-600">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
              </div>
            </div>

            {/* Bill To & Ship To */}
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-200">
              <div>
                <p className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] mb-1">
                  Billed To / Delivered To:
                </p>
                <p className="font-bold text-zinc-900">{order.shippingAddress.fullName}</p>
                <p className="text-zinc-600">{order.shippingAddress.street}</p>
                <p className="text-zinc-600">{order.shippingAddress.locality}</p>
                <p className="text-zinc-600">{order.shippingAddress.city}, {order.shippingAddress.district} - {order.shippingAddress.pincode}</p>
                <p className="text-zinc-600">Kerala, India</p>
                <p className="text-zinc-600">Phone: {order.shippingAddress.phone}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] mb-1">
                  Logistics & Fulfillment:
                </p>
                <p className="font-semibold text-zinc-900">{order.courierName || 'DTDC Kerala Express'}</p>
                <p className="text-zinc-600">AWB Tracking: {order.trackingNumber}</p>
                <p className="text-zinc-600">Est. Delivery: {order.estimatedDeliveryDate}</p>
                <p className="text-zinc-600">Place of Supply: Kerala (32)</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 font-bold text-zinc-700 uppercase tracking-wider">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">HSN Code</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Price</th>
                    <th className="p-2.5 text-right">Total (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-medium">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5">
                        <span className="font-bold text-zinc-900">{item.title}</span>
                        <span className="block text-[11px] text-zinc-500">
                          Size: {item.size} · Color: {item.color}
                        </span>
                      </td>
                      <td className="p-2.5 text-zinc-600 tabular-nums">61091000</td>
                      <td className="p-2.5 text-center tabular-nums">{item.quantity}</td>
                      <td className="p-2.5 text-right tabular-nums">₹{item.unitPrice}</td>
                      <td className="p-2.5 text-right font-bold tabular-nums">₹{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-zinc-200 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Gross Value:</span>
                  <span className="tabular-nums font-semibold">₹{order.itemTotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({order.couponCode || 'PROMO'}):</span>
                    <span className="tabular-nums font-semibold">-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Charges:</span>
                  <span className="tabular-nums font-semibold">
                    {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500 text-[11px] pt-1 border-t border-zinc-100">
                  <span>Taxable Value:</span>
                  <span className="tabular-nums">₹{taxableValue}</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>CGST (2.5%):</span>
                  <span className="tabular-nums">₹{cgst}</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>SGST (2.5%):</span>
                  <span className="tabular-nums">₹{sgst}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Invoice Total:</span>
                  <span className="tabular-nums">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Declaration & Footer */}
            <div className="pt-6 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500">
              <div>
                <p className="font-semibold text-zinc-700">Declaration:</p>
                <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-zinc-900">For ClothCity Retail Pvt Ltd</p>
                <p className="mt-4 text-zinc-400 italic">Authorized Signatory</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
