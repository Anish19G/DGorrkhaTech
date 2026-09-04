import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6">
      <div className="mb-8 flex items-center gap-2 text-xl font-bold text-slate-900">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
          DG
        </span>
        DGorkhaTech Admin
      </div>
      <LoginForm />
    </div>
  );
}
