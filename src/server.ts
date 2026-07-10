import app from "./app";
import { db } from "./config/database";

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server running on port 3001");
});

async function start() {
  try {
    await db.raw("SELECT 1");

    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log("Server running on port 3001");
    });

  } catch (error) {
    console.error("Database Error:", error);
  }
}

start();