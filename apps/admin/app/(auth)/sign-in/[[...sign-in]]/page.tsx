import { SignIn } from "@clerk/nextjs";
import { Shield } from "lucide-react";

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen bg-[#1c1c1e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-[20px] bg-[#FF3B30] flex items-center justify-center mx-auto mb-4 shadow-[0_4px_20px_rgba(255,59,48,0.4)]">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Access</h1>
          <p className="text-[#8e8e93] mt-2">
            Restricted to authorized super admins only
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[#3a3a3c] bg-[#2c2c2e]",
              headerTitle: "text-xl font-bold text-white",
              headerSubtitle: "text-[#8e8e93]",
              formButtonPrimary: "bg-[#FF3B30] hover:bg-[#E0342A] rounded-[13px] h-11",
              formFieldInput: "rounded-[13px] bg-[#3a3a3c] border-[#48484a] text-white h-11",
              formFieldLabel: "text-[#8e8e93]",
              socialButtonsBlockButton: "rounded-[13px] border-[#3a3a3c] bg-[#3a3a3c] text-white",
              footerActionLink: "text-[#FF3B30]",
            },
          }}
          forceRedirectUrl="/admin/dashboard"
        />
      </div>
    </div>
  );
}
