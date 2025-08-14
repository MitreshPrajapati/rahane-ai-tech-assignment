import { AuthProvider } from "@/context/AuthContext";

export default function Dashboard() {
  return (
    <AuthProvider>
        <div>Home</div>
      {/* <DashboardLayout>
        <div>Home</div>
      </DashboardLayout> */}
    </AuthProvider>
  );
}
