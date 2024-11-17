// src/utils/logger.ts
export class Logger {
  static info(message: string, meta?: Record<string, unknown>): void {
    console.log(JSON.stringify({ level: "info", message, ...meta }));
  }

  static error(message: string, error?: Error): void {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        error: error?.message,
        stack: error?.stack,
      })
    );
  }
}
