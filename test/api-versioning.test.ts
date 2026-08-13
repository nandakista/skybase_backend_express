import test from "node:test";
import assert from "node:assert/strict";

import app from "../src/app";

test("API v1 is exposed under /api/v1", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    assert.ok(address && typeof address === "object" && address.port);

    const response = await fetch(`http://127.0.0.1:${address.port}/api/v1`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(body, /Basecode Express API V1/i);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
