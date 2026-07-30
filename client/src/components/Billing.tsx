import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { createOrder as createOrderApi, verifyOrder, cancelSubscription as cancelSubApi } from '../actions/subscriptionAction';
import { CheckCircle2, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    features: [
      '10 links monthly capacity',
      '2 lifetime custom aliases',
      'Standard analytics dashboard',
      'Overall URL stats',
      'Community support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹89',
    features: [
      '100 links monthly capacity',
      '20 lifetime custom aliases',
      'Standard analytics dashboard',
      'Device & country analytics',
      'Individual URL analytics',
      'Dynamic QR code generator',
      'Community support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '₹299',
    features: [
      '1000 links monthly capacity',
      '200 lifetime custom aliases',
      'Advanced analytics dashboard',
      'Browser, OS & referrer tracking',
      '30-day click history',
      'Individual URL analytics (all metrics)',
      'Dynamic QR code generator',
      'Dedicated account support'
    ]
  }
];

function Billing() {
  const { user, checkAuthStatus } = useAuthStore();
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState<string | null>(null);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (plan: 'pro' | 'enterprise') => {
    setLoading(plan);

    try {
      const orderRes = await createOrderApi(plan);
      if (!orderRes.success) {
        addToast({ message: orderRes.message || 'Failed to create order', type: 'error' });
        setLoading(null);
        return;
      }

      const { order } = orderRes.data;
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        addToast({ message: 'Failed to load payment gateway. Please try again.', type: 'error' });
        setLoading(null);
        return;
      }

      const options = {
        key: order.key_id,
        order_id: order.id,
        name: import.meta.env.VITE_APP_NAME || 'Shortify',
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: '#059669' },
        handler: async (response: any) => {
          const verifyRes = await verifyOrder(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );

          if (verifyRes.success) {
            addToast({
              message: `Upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)} successfully!`,
              type: 'success'
            });
            await checkAuthStatus();
          } else {
            addToast({
              message: verifyRes.message || 'Payment verification failed. Please contact support.',
              type: 'error'
            });
          }
          setLoading(null);
        },
        modal: {
          ondismiss: () => setLoading(null),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        addToast({ message: 'Payment failed. Please try again.', type: 'error' });
        setLoading(null);
      });
      rzp.open();
    } catch {
      addToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    setLoading('cancel');
    try {
      const res = await cancelSubApi();
      if (res.success) {
        addToast({ message: 'Subscription canceled successfully', type: 'success' });
        await checkAuthStatus();
      } else {
        addToast({ message: res.message || 'Failed to cancel subscription', type: 'error' });
      }
    } catch {
      addToast({ message: 'Something went wrong', type: 'error' });
    }
    setLoading(null);
  };

  const isOnPlan = (planId: string) => user?.plan === planId;

  const getButton = (plan: typeof PLANS[number]) => {
    if (isOnPlan(plan.id)) {
      return (
        <button
          disabled
          className="w-full py-3 rounded-xl font-bold text-sm bg-zinc-950 text-zinc-600 border border-zinc-800"
        >
          Current Plan
        </button>
      );
    }

    if (plan.id === 'free') {
      return null;
    }

    return (
      <button
        onClick={() => handleSubscribe(plan.id as 'pro' | 'enterprise')}
        disabled={loading !== null}
        className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading === plan.id ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
        ) : (
          'Subscribe'
        )}
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white tracking-tight">Billing</h2>
        <p className="text-zinc-500 font-medium text-sm mt-1">Manage your subscription and payment details.</p>
      </div>

      {user?.subscriptionStatus === 'active' && user?.plan !== 'free' && (
        <div className="mb-8 p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white">
              Active Plan: <span className="text-emerald-500 capitalize">{user.plan}</span>
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">Your subscription is active.</p>
          </div>
          <button
            onClick={handleCancel}
            disabled={loading === 'cancel'}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600/10 text-rose-500 border border-rose-600/20 hover:bg-rose-600/20 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading === 'cancel' ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> Canceling...</>
            ) : (
              'Cancel Subscription'
            )}
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map(p => (
          <div
            key={p.id}
            className={`flex flex-col p-8 bg-zinc-900 rounded-3xl border-2 transition-all ${
              isOnPlan(p.id) ? 'border-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-zinc-800'
            }`}
          >
            <div className="mb-6">
              <h4 className="font-black text-white text-lg">{p.name}</h4>
              <div className="text-3xl font-black text-emerald-500 mt-1">
                {p.price}
                <span className="text-sm font-bold text-zinc-500">/mo</span>
              </div>
            </div>

            <div className="h-px bg-zinc-800 mb-6" />

            <ul className="space-y-3 mb-8 flex-1">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {getButton(p)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Billing;
