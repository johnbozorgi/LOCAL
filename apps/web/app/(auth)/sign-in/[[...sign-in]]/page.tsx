import { SignIn } from "@clerk/nextjs";
import { Zap } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007AFF]/5 via-white to-[#AF52DE]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-[20px] bg-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-[0_4px_20px_rgba(0,122,255,0.4)]">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#1c1c1e]">LocalSEO Co-Pilot</h1>
          <p className="text-[#8e8e93] mt-2">
            Your AI-powered local SEO partner for Texas businesses
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border-0",
              headerTitle: "text-xl font-bold text-[#1c1c1e]",
              headerSubtitle: "text-[#8e8e93]",
              formButtonPrimary:
                "bg-[#007AFF] hover:bg-[#0066DD] rounded-[13px] h-11 text-base font-semibold",
              formFieldInput:
                "rounded-[13px] border-[#e5e5ea] h-11 text-base",
              socialButtonsBlockButton:
                "rounded-[13px] border-[#e5e5ea] h-11 font-semibold",
              footerActionLink: "text-[#007AFF] font-semibold",
            },
          }}
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
