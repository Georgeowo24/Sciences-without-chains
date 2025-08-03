import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import app from "@/firebase/firebase";

import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { NavbarLog } from "@/components/navbarLog";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpieza al desmontar
  }, [auth]);

  return (
    <div className="relative flex flex-col h-screen">
      {user ? <NavbarLog /> : <Navbar />}

      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
