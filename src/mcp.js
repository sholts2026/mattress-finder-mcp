import { recommend } from "./apps.js";

const toolDefinitions = [
  {
    name: "recommend_pet_food",
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
    }
  },
  {
    name: "recommend_mattress",
    description: "Recommend mattresses by sleep position, heat, firmness, partner needs, size, trial, and budget.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        budget: { type: "number" },
        limit: { type: "number" }
      },
      required: ["query"]
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
  if (message.method === "initialize") {
    return {
      jsonrpc: "2.0",
      id: message.id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "commerce-finder", version: "0.1.0" }
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

    return {
      jsonrpc: "2.0",
      id: message.id,
      result: {
        content: [
          {
            type: "text",
            text: JSON.stringify(recommend(appId, args), null, 2)
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
