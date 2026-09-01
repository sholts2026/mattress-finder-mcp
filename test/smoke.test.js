import assert from "node:assert/strict";
import { test } from "node:test";
import { recommend } from "../src/apps.js";
import { handleMcpRequest } from "../src/mcp.js";

test("pet food recommendations avoid stated chicken allergy", () => {
  const result = recommend("pet-food-finder", {
    query: "best dog food for a 6 year old golden retriever with chicken allergy and sensitive stomach under $100/month"
  });

  assert.equal(result.recommendations.length > 0, true);
  assert.equal(result.recommendations[0].sku, "ollie-fresh-mixed-plan");
  assert.match(result.recommendations[0].reasons.join(" "), /avoids chicken|sensitive stomach/);
});

test("mcp tools/list returns commerce tools", () => {
  const response = handleMcpRequest({ jsonrpc: "2.0", id: 1, method: "tools/list" });

  assert.equal(response.result.tools.length, 2);
  assert.equal(response.result.tools[0].name, "recommend_pet_food");
});

test("published pet food app exposes only dog food tool", async () => {
  const previous = process.env.PUBLISHED_APP;
  process.env.PUBLISHED_APP = "pet-food-finder";

  const { handleMcpRequest: isolatedHandleMcpRequest } = await import(`../src/mcp.js?published=${Date.now()}`);
  const response = isolatedHandleMcpRequest({ jsonrpc: "2.0", id: 1, method: "tools/list" });

  assert.deepEqual(response.result.tools.map((tool) => tool.name), ["recommend_pet_food"]);

  if (previous === undefined) delete process.env.PUBLISHED_APP;
  else process.env.PUBLISHED_APP = previous;
});
