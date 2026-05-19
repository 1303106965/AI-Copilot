import express from "express";

const app = express();

app.use(express.json());

/**
 * health check
 */
app.get("/health", (_, res) => {
  res.json({
    success: true,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `server running:
${PORT}`
  );
});
