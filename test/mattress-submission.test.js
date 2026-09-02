import assert from "node:assert/strict";
import { test } from "node:test";
import { recommend } from "../src/apps.js";
import { handleMcpRequest } from "../src/mcp.js";
import { loadSubmission } from "../src/submissions.js";

test("mattress submission metadata is discovery-focused", () => {
  const submission = loadSubmission("mattress-finder");
  assert.equal(submission.proposedName, "Mattress Finder");
  assert.equal(submission.targetKeyword, "mattress finder");
  assert.ok(submission.keywords.includes("side sleeper mattress"));
  assert.match(submission.safetyPolicy, /clinician/);
});

test("hot side sleeper receives ranked mattress recommendations", () => {
  const result = recommend("mattress-finder", { query: "queen mattress for a hot side sleeper under $2000" });
  assert.equal(result.recommendations.length > 0, true);
  assert.match(result.recommendations[0].reasons.join(" "), /side sleeping|cooling/);
  assert.equal(result.presentation.cards[0].callToAction.label, "View offer");
});

test("published mattress app exposes only mattress tool", async () => {
  const previous = process.env.PUBLISHED_APP;
  process.env.PUBLISHED_APP = "mattress-finder";
  const response = handleMcpRequest({ jsonrpc: "2.0", id: 1, method: "tools/list" });
  assert.deepEqual(response.result.tools.map((tool) => tool.name), ["recommend_mattress"]);
  if (previous === undefined) delete process.env.PUBLISHED_APP;
  else process.env.PUBLISHED_APP = previous;
});

test("MCP mattress tool returns structured content", () => {
  const response = handleMcpRequest({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "recommend_mattress", arguments: { query: "firm king mattress under $2000" } } });
  assert.equal(response.result.structuredContent.appId, "mattress-finder");
  assert.equal(Array.isArray(response.result.structuredContent.recommendations), true);
});
