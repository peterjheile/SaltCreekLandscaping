"use client";

import { createContext, useContext } from "react";
import type { ServiceCategory } from "@/features/services/types";

const ServiceContext = createContext<ServiceCategory[] | null>(null);

type ServiceProviderProps = {
  children: React.ReactNode;
  serviceCategories: ServiceCategory[];
};

export function ServiceProvider({
  children,
  serviceCategories,
}: ServiceProviderProps) {
  return (
    <ServiceContext.Provider value={serviceCategories}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceCategories() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error(
      "useServiceCategories must be used within a ServiceProvider."
    );
  }

  return context;
}