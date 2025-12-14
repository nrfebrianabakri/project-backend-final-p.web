export const healthCheck = (req, res) => {
  res.json({
    status: "ok",
    message: "Library API running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime() + "s"
  });
};
