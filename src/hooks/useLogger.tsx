import { useState, useCallback } from "react";

export type LogLevel = "info" | "success" | "error" | "warning";

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  metadata?: any;
}

interface UseLoggerOptions {
  maxLogs?: number;
  enableConsole?: boolean;
  context?: string;
}

export const useLogger = (options: UseLoggerOptions = {}) => {
  const { maxLogs = 50, enableConsole = true, context } = options;
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback(
    (level: LogLevel, message: string, metadata?: any) => {
      const logEntry: LogEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        level,
        message,
        context,
        metadata,
      };

      setLogs((prev) => [logEntry, ...prev.slice(0, maxLogs - 1)]);

      // Console logging with appropriate level
      if (enableConsole) {
        const logPrefix = context ? `[${context}]` : "";
        const logMessage = `${logPrefix} ${message}`;

        switch (level) {
          case "error":
            console.error(`❌ ${logMessage}`, metadata);
            break;
          case "warning":
            console.warn(`⚠️ ${logMessage}`, metadata);
            break;
          case "success":
            console.log(`✅ ${logMessage}`, metadata);
            break;
          case "info":
          default:
            console.log(`ℹ️ ${logMessage}`, metadata);
            break;
        }
      }
    },
    [maxLogs, enableConsole, context],
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const getLogsByLevel = useCallback(
    (level: LogLevel) => logs.filter((log) => log.level === level),
    [logs],
  );

  const getLogStats = useCallback(() => {
    const stats = logs.reduce(
      (acc, log) => {
        acc[log.level] = (acc[log.level] || 0) + 1;
        return acc;
      },
      {} as Record<LogLevel, number>,
    );

    return {
      total: logs.length,
      ...stats,
    };
  }, [logs]);

  return {
    logs,
    addLog,
    clearLogs,
    getLogsByLevel,
    getLogStats,
  };
};
