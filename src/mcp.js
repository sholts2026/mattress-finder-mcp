import { recommend } from "./apps.js";

const toolDefinitions = [
  {
    name: "recommend_pet_food",
    title: "Recommend dog food",
    description: "Recommend dog food by allergies, life stage, breed size, stomach sensitivity, picky eating, and monthly budget.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        budget: { type: "number" },
        limit: { type: "number" },
        lifeStage: { type: "string", enum: ["puppy", "adult", "senior"] },
        breedSize: { type: "string", enum: ["small", "medium", "large"] },
        avoidProteins: { type: "array", items: { type: "string" } },
        goals: {
          type: "array",
          items: {
            type: "string",
            enum: ["sensitive_stomach", "picky_eater", "weight_management", "fresh", "budget"]
          }
        }
      },
      required: ["query"]
    },
    outputSchema: {
      type: "object",
      properties: {
        appId: { type: "string" },
        displayName: { type: "string" },
        recommendations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              sku: { type: "string" },
              name: { type: "string" },
              merchant: { type: "string" },
              price: { type: "number" },
              score: { type: "number" },
              reasons: { type: "array", items: { type: "string" } },
              buyUrl: { type: "string" },
              affiliateDisclosure: { type: "string" }
            }
          }
        },
        nextQuestions: { type: "array", items: { type: "string" } }
      }
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false
    }
  },
  {
    name: "recommend_mattress",
    title: "Recommend mattresses",
    description: "Recommend mattresses by sleep position, heat, firmness, partner needs, size, trial, and budget.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        budget: { type: "number" },
        limit: { type: "number" },
        sleepPosition: { type: "string", enum: ["side", "back", "stomach", "combo"] },
        firmness: { type: "string", enum: ["soft", "medium", "firm"] },
        hotSleeper: { type: "boolean" },
        couple: { type: "boolean" },
        backPainContext: { type: "boolean" },
        size: { type: "string", enum: ["twin", "twin xl", "full", "queen", "king", "cal king", "split king"] }
      },
      required: ["query"]
    },
    outputSchema: {
      type: "object",
      properties: {
        appId: { type: "string" },
        displayName: { type: "string" },
        recommendations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              sku: { type: "string" },
              name: { type: "string" },
              merchant: { type: "string" },
              price: { type: "number" },
              score: { type: "number" },
              reasons: { type: "array", items: { type: "string" } },
              buyUrl: { type: "string" },
              affiliateDisclosure: { type: "string" }
            }
          }
        },
        nextQuestions: { type: "array", items: { type: "string" } }
      }
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false
    }
  }
];

function isToolAllowed(name) {
  if (process.env.PUBLISHED_APP === "pet-food-finder") return name === "recommend_pet_food";
  if (process.env.PUBLISHED_APP === "mattress-finder") return name === "recommend_mattress";
  return true;
}

function allowedTools() {
  return toolDefinitions.filter((tool) => isToolAllowed(tool.name));
}

export function handleMcpRequest(message) {
  if (Array.isArray(message)) {
    return message
      .filter((item) => item.id !== undefined)
      .map((item) => handleMcpRequest(item));
  }

  if (!message?.method) {
    return {
      jsonrpc: "2.0",
      id: message?.id ?? null,
      error: { code: -32600, message: "Invalid request" }
    };
  }

  if (message.id === undefined) {
    return null;
  }

  if (message.method === "initialize") {
    return {
      jsonrpc: "2.0",
      id: message.id,
      result: {
        protocolVersion: message.params?.protocolVersion ?? "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "mattress-finder", version: "1.0.0" },
        instructions: "Recommend physical mattresses by shopper fit. Explain comfort tradeoffs, include affiliate disclosure, and do not present recommendations as medical treatment."
      }
    };
  }

  if (message.method === "tools/list") {
    return {
      jsonrpc: "2.0",
      id: message.id,
      result: { tools: allowedTools() }
    };
  }

  if (message.method === "tools/call") {
    const { name, arguments: args = {} } = message.params ?? {};
    if (!isToolAllowed(name)) {
      return {
        jsonrpc: "2.0",
        id: message.id,
        error: { code: -32601, message: `Tool is not available in this published app: ${name}` }
      };
    }

    const appId = name === "recommend_pet_food" ? "pet-food-finder" : name === "recommend_mattress" ? "mattress-finder" : null;
    if (!appId) {
      return {
        jsonrpc: "2.0",
        id: message.id,
        error: { code: -32601, message: `Unknown tool: ${name}` }
      };
    }

    const result = recommend(appId, args);

    return {
      jsonrpc: "2.0",
      id: message.id,
      result: {
        structuredContent: result,
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      }
    };
  }

  return {
    jsonrpc: "2.0",
    id: message.id ?? null,
    error: { code: -32601, message: `Unknown method: ${message.method}` }
  };
}
