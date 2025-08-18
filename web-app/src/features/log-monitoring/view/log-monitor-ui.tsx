import { Box, Typography, useTheme, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { tokens } from "../../../theme/theme";

const WEBSOCKET_URL = "ws://localhost:8080/logs";

interface LogEntry {
  level: "ERROR" | "WARN" | "INFO";
  message: string;
  timestamp: string;
}

const LogViewer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onmessage = (event) => {
      const msg = event.data as string;
      let level: LogEntry["level"] = "INFO";

      if (msg.includes("ERROR")) level = "ERROR";
      else if (msg.includes("WARN")) level = "WARN";

      const newLog: LogEntry = {
        level,
        message: msg,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: 3,
        }),
      };

      // Append log to the END (latest at bottom)
      setLogs((prev) => [...prev, newLog]);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const getBadgeColor = (level: string) => {
    switch (level) {
      case "ERROR":
        // Bright, high-contrast red with white text
        return { bg: "#E53935", text: "#FFFFFF" };
      case "WARN":
        // Strong yellow with black text
        return { bg: "#FBC02D", text: "#000000" };
      case "INFO":
        // Bold blue with white text
        return { bg: "#1E88E5", text: "#FFFFFF" };
      default:
        return { bg: "#9E9E9E", text: "#000000" };
    }
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={2}>
        📡 Real-time Log Monitor
      </Typography>

      {/* Log container */}
      <Paper
        elevation={6}
        sx={{
          backgroundColor: colors.primary[400],
          border: `1px solid ${colors.grey[700]}`,
          height: "70vh",
          overflowY: "auto",
          borderRadius: "12px",
          padding: "0",
          fontFamily: "monospace",
        }}
      >
        {logs.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 4 }}
          >
            Waiting for logs...
          </Typography>
        ) : (
          logs.map((log, index) => {
            const badge = getBadgeColor(log.level);
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "6px 10px",
                  borderBottom: `1px solid ${colors.grey[800]}`,
                  backgroundColor:
                    index % 2 === 0 ? `${colors.primary[500]}44` : "transparent",
                  animation: "fadeIn 0.3s ease",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(-4px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                {/* Timestamp */}
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.grey[400],
                    minWidth: "90px",
                  }}
                >
                  {log.timestamp}
                </Typography>

                {/* Badge */}
                <Box
                  sx={{
                    backgroundColor: badge.bg,
                    color: badge.text,
                    px: 1,
                    py: 0.3,
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    minWidth: "48px",
                    textAlign: "center",
                  }}
                >
                  {log.level}
                </Box>

                {/* Message */}
                <Typography
                  variant="body2"
                  sx={{
                    color: badge.bg,
                    flex: 1,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {log.message}
                </Typography>
              </Box>
            );
          })
        )}
        <div ref={logEndRef} />
      </Paper>
    </Box>
  );
};

export default LogViewer;
