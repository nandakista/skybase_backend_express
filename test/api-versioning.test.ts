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

test("health checker is public and returns expected payload", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    assert.ok(address && typeof address === "object" && address.port);

    const response = await fetch(`http://127.0.0.1:${address.port}/api/v1/health-checker`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "ok");
    assert.equal(body.service, "api-gateway-afms");
    assert.equal(typeof body.timestamp, "string");
    assert.equal(typeof body.uptime, "number");
    assert.ok(!Number.isNaN(new Date(body.timestamp).getTime()));
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
