"use client";
import {
  QueryClient,
  QueryClientProvider as QueryClientProvider_,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const QueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider_ client={queryClient}>{children}</QueryClientProvider_>
  );
};

export default QueryClientProvider;
