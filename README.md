# Dog Food Finder

Dog Food Finder is an MCP-based ChatGPT shopping app that helps dog owners compare dog food by life stage, breed size, allergies, sensitive stomach needs, picky eating, fresh-food preference, and monthly budget.

The app ranks products by shopper fit first, includes affiliate disclosure on outbound shopping links, and avoids veterinary diagnosis or treatment claims.

## Run locally

```bash
npm start
```

Default local URL:

```text
http://localhost:8790
```

## Production mode

Render should set:

```text
PUBLISHED_APP=pet-food-finder
PUBLIC_BASE_URL=https://dog-food-finder-mcp.onrender.com
AFFILIATE_CONFIG_JSON=<approved affiliate JSON>
```

In production, the MCP server exposes only:

```text
recommend_pet_food
```

## Endpoints

- `GET /`
- `GET /health`
- `GET /privacy`
- `GET /terms`
- `GET /support`
- `GET /partners`
- `POST /mcp`
- `POST /apps/pet-food-finder/recommend`

## Submit

OpenAI submission metadata lives in:

```text
submission/metadata.json
```

Deploy first, verify `/health` and `/mcp`, then submit the stable MCP URL in the OpenAI developer dashboard.
