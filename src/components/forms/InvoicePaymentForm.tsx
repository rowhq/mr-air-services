'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

const STAX_MERCHANT_ID = 'Mr-Air-Services-LLC-1a36cbeada70';
const THANK_YOU_URL = 'https://www.mrairservices.com/Thank-You.aspx';

export function InvoicePaymentForm() {
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    // Convert amount to whole number (remove decimals for Stax)
    const totalAmount = Math.round(parseFloat(amount) * 100) / 100;
    const totalForUrl = Math.round(totalAmount);

    // Build Stax Payments URL
    const params = new URLSearchParams();
    if (memo) params.set('memo', memo);
    params.set('total', totalForUrl.toString());
    params.set('r', THANK_YOU_URL);

    const paymentUrl = `https://app.staxpayments.com/#/pay/${STAX_MERCHANT_ID}?${params.toString()}`;
    window.open(paymentUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-2">
          Invoice Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="1"
            step="0.01"
            required
            className="w-full pl-8 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="memo" className="block text-sm font-medium text-slate-700 mb-2">
          Invoice Number / Memo
        </label>
        <input
          type="text"
          id="memo"
          name="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Enter invoice number or note"
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!amount}
      >
        Pay Now
      </Button>

      <div className="flex items-center justify-center gap-3 pt-2 text-slate-400">
        <svg className="h-8" viewBox="0 0 50 16" fill="currentColor">
          <text x="0" y="12" fontSize="10" fontWeight="bold">VISA</text>
        </svg>
        <svg className="h-5 w-8" viewBox="0 0 32 20" fill="none">
          <circle cx="10" cy="10" r="8" fill="#EB001B" opacity="0.7"/>
          <circle cx="22" cy="10" r="8" fill="#F79E1B" opacity="0.7"/>
        </svg>
        <span className="text-xs font-medium">AMEX</span>
        <span className="text-xs font-medium">Discover</span>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Secure payment via Stax. Google Pay, PayPal, and Bank (ACH) also accepted.
      </p>
    </form>
  );
}
