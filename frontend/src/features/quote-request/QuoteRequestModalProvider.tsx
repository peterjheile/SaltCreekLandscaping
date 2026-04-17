"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import QuoteRequestModal from "@/components/services/QuoteRequestModal";
import type { ServiceCategory } from "@/features/services/types";

type QuoteRequestModalContextValue = {
  openQuoteRequestModal: (serviceCategoryId?: string) => void;
  closeQuoteRequestModal: () => void;
};

const QuoteRequestModalContext =
  createContext<QuoteRequestModalContextValue | null>(null);

type QuoteRequestModalProviderProps = {
  children: React.ReactNode;
  serviceCategories: ServiceCategory[];
};

export function QuoteRequestModalProvider({
  children,
  serviceCategories,
}: QuoteRequestModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialServiceCategoryId, setInitialServiceCategoryId] = useState<
    string | undefined
  >(undefined);

  const openQuoteRequestModal = useCallback((serviceCategoryId?: string) => {
    setInitialServiceCategoryId(serviceCategoryId);
    setIsOpen(true);
  }, []);

  const closeQuoteRequestModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      openQuoteRequestModal,
      closeQuoteRequestModal,
    }),
    [openQuoteRequestModal, closeQuoteRequestModal]
  );

  return (
    <QuoteRequestModalContext.Provider value={value}>
      {children}

      <QuoteRequestModal
        isOpen={isOpen}
        onClose={closeQuoteRequestModal}
        serviceCategories={serviceCategories}
        initialServiceCategoryId={initialServiceCategoryId}
      />
    </QuoteRequestModalContext.Provider>
  );
}

export function useQuoteRequestModal() {
  const context = useContext(QuoteRequestModalContext);

  if (!context) {
    throw new Error(
      "useQuoteRequestModal must be used within a QuoteRequestModalProvider."
    );
  }

  return context;
}