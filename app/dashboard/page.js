import { Main } from "@/components/Main";

export const metadata = {
    title: "Broodl ⋅ Dashboard",
    
  };

  export default function DashboardPage() {

    const isAuthenticated = false;

    let children = (
      <Login/>
    )
    if (isAuthenticated) {
        children = (
          <Dashboard/>
        )
    }

    return (
      <Main>
        {children}
      </Main> 
    );
}  