import assert from "node:assert/strict";
import { test } from "node:test";
import { recommend } from "../src/apps.js";
import { loadSubmission } from "../src/submissions.js";

test("dog food submission metadata is discovery-focused", () => {
  const submission = loadSubmission("pet-food-finder");

  assert.equal(submission.proposedName, "Dog Food Finder");
  assert.equal(submission.targetKeyword, "dog food finder");
  assert.equal(submission.starterPrompts.length, 3);
  assert.ok(submission.keywords.includes("sensitive stomach dog food"));
  assert.match(submission.safetyPolicy, /veterinarian/);
});

test("dog food recommendation includes ChatGPT-ready presentation", () => {
  const result = recommend("pet-food-finder", {
    query: "fresh dog food for a picky senior dog with chicken allergy under $120/month"
  });

  assert.equal(result.presentation.title, "Dog Food Finder");
  assert.equal(result.presentation.cards.length > 0, true);
  assert.equal(result.presentation.cards[0].callToAction.label, "View offer");
  assert.match(result.presentation.disclosure, /commission/);
});
