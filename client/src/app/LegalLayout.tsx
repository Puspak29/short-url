import { ArrowLeft } from "lucide-react";

const APP_NAME = import.meta.env.VITE_APP_NAME;
const LegalLayout = ({ type }: { type: 'terms' | 'privacy' }) => {
  const isTerms = type === 'terms';
  
  return (
    <div className="bg-zinc-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm font-bold text-emerald-500 mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Home
        </button>
        
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">
          {isTerms ? 'Terms of Service' : 'Privacy Policy'}
        </h1>
        <p className="text-zinc-500 font-medium mb-12">Last Updated: March 12, 2024</p>

        <div className="prose prose-invert max-w-none text-zinc-400 font-medium leading-relaxed space-y-12">
          {isTerms ? (
            <>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">1. Acceptance of Terms</h2>
                <p>By accessing and using {APP_NAME}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our infrastructure.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">2. User Responsibilities</h2>
                <p>You are responsible for all activity that occurs under your account. You must not use our service for any illegal activities, including but not limited to phishing, malware distribution, or spamming.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">3. Subscription & Billing</h2>
                <p>We offer Free, Pro, and Enterprise tiers. Subscriptions are billed in advance on a monthly or annual basis and are non-refundable except where required by law.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">4. Termination</h2>
                <p>We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms.</p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">1. Information We Collect</h2>
                <p>We collect information you provide directly to us (name, email) and technical data automatically collected when you or your visitors interact with shortened links (IP address, device type, region).</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">2. How We Use Data</h2>
                <p>We use the collected data to provide, maintain, and improve our services, develop new features, and protect {APP_NAME} and our users.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">3. Data Sharing</h2>
                <p>We do not sell your personal data. We only share information with third-party service providers (like payment processors) as necessary to provide our service.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-white">4. Security</h2>
                <p>We implement industry-standard security measures to protect your data, but no method of transmission over the Internet is 100% secure.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;