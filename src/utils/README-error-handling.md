# Centralized Error Handling System

This document explains the new centralized error handling system that provides consistent error handling across the application.

## Overview

The error handling system consists of several utilities:

1. **`api-error-handler.ts`** - Core error handling logic
2. **`api-response-handler.ts`** - API response standardization
3. **`api-helpers.ts`** - Common API patterns and utilities
4. **`useLogger.tsx`** - Consistent logging hook

## Before vs After

### Before (Manual Error Handling)

```typescript
// ❌ Repetitive and inconsistent
const confirmVoucherScan = async (code: string) => {
  try {
    const res = await voucherServices.verifyScanVoucher({ code });
    return res;
  } catch (error) {
    console.error("Verify scan voucher failed:", error);
    // Manual error handling everywhere
    if (error.response?.status === 404) {
      addToast({
        title: "Error!",
        description: "Voucher tidak ditemukan",
        color: "danger",
      });
    } else if (error.response?.status === 400) {
      addToast({
        title: "Error!",
        description: "QR Code tidak valid",
        color: "danger",
      });
    }
    // ... more repetitive code
    return null;
  }
};
```

### After (Centralized Error Handling)

```typescript
// ✅ Clean and consistent
const confirmVoucherScan = async (code: string) => {
  try {
    const res = await voucherServices.verifyScanVoucher({ code });
    return res;
  } catch (error: any) {
    console.error("Verify scan voucher failed:", error);
    return null; // Error handling is done in service layer
  }
};
```

## Usage Examples

### 1. Basic API Call with Error Handling

```typescript
import { apiPatterns, toast } from "@/utils/api-helpers";

// Create operation
const createEvent = async (eventData: EventData) => {
  const result = await apiPatterns.create(eventServices.create, eventData, {
    successMessage: "Event berhasil dibuat!",
    onSuccess: (data) => {
      // Handle success
      router.push(`/events/${data.id}`);
    },
    onError: (error) => {
      // Custom error handling if needed
      console.error("Failed to create event:", error);
    },
  });

  return result;
};

// Read operation
const fetchEvents = async () => {
  const result = await apiPatterns.read(eventServices.getAll, {
    onSuccess: (data) => {
      setEvents(data);
    },
  });

  return result;
};
```

### 2. Using the Logger Hook

```typescript
import { useLogger } from "@/hooks/useLogger";

const MyComponent = () => {
  const { logs, addLog, clearLogs } = useLogger({
    context: "EventManager",
    maxLogs: 100,
  });

  const handleAction = async () => {
    addLog("info", "Starting event creation...");

    try {
      const result = await createEvent(eventData);
      addLog("success", "Event created successfully", { eventId: result.id });
    } catch (error) {
      addLog("error", "Failed to create event", { error });
    }
  };

  return (
    <div>
      {/* Your component */}
      <div>
        <h3>Logs ({logs.length})</h3>
        {logs.map(log => (
          <div key={log.id} className={`log-${log.level}`}>
            [{log.timestamp}] {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 3. Enhanced Service Layer

```typescript
// services/event.service.ts
import { withErrorHandling } from "@/utils/api-error-handler";
import instance from "@/libs/axios/instance";

const eventServices = {
  create: async (data: EventData) => {
    const { data: result, error } = await withErrorHandling(
      () => instance.post("/events", data),
      {
        customMessages: {
          400: "Data event tidak valid",
          409: "Event dengan nama tersebut sudah ada",
        },
      },
    );

    if (error) throw new Error(error);
    return result;
  },

  getAll: async () => {
    const { data: result, error } = await withErrorHandling(
      () => instance.get("/events"),
      {
        showToast: false, // Don't show toast for read operations
      },
    );

    if (error) throw new Error(error);
    return result;
  },
};
```

### 4. Quick Toast Notifications

```typescript
import { toast } from "@/utils/api-helpers";

// Instead of manually creating addToast calls
toast.success("Operation completed successfully!");
toast.error("Something went wrong");
toast.warning("Please check your input");
toast.info("New update available");
```

### 5. Async Operation Hook

```typescript
import { useAsyncOperation } from "@/utils/api-helpers";

const MyComponent = () => {
  const { isLoading, error, execute, clearError } = useAsyncOperation();

  const handleSubmit = async () => {
    const result = await execute(
      () => eventServices.create(formData),
      {
        onSuccess: (data) => {
          router.push(`/events/${data.id}`);
        },
        onError: (error) => {
          // Custom error handling
          setFormErrors(error);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};
```

## Benefits

1. **Consistency** - All errors are handled the same way across the app
2. **Maintainability** - Error messages and handling logic in one place
3. **Reusability** - Common patterns can be reused easily
4. **Better UX** - Consistent error messages and toast notifications
5. **Debugging** - Centralized logging with context and metadata
6. **Type Safety** - Full TypeScript support with proper typing

## Migration Guide

1. **Replace manual try/catch blocks** with `withErrorHandling` or `apiPatterns`
2. **Use the logger hook** instead of manual console.log statements
3. **Standardize toast notifications** using the `toast` utility
4. **Update service layers** to use the new error handling utilities
5. **Replace manual loading states** with `useAsyncOperation` where appropriate

## Configuration

You can customize error messages and behavior by:

1. **Updating custom messages** in `api-error-handler.ts`
2. **Modifying default toast behavior** in `api-response-handler.ts`
3. **Adding new API patterns** in `api-helpers.ts`
4. **Extending the logger** with additional metadata fields

This system provides a solid foundation for consistent error handling across your entire application while remaining flexible and extensible.
