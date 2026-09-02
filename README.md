# Mattress Finder

Mattress Finder is an MCP-based ChatGPT shopping app that compares physical mattresses by sleep position, firmness, cooling, partner needs, size, trial length, warranty, and budget.

Recommendations rank shopper fit first, explain tradeoffs, disclose affiliate relationships, and avoid medical treatment claims.

## Run locally

```bash
npm start
```

Production environment:

```text
PUBLISHED_APP=mattress-finder
PUBLIC_BASE_URL=https://mattress-finder-mcp.onrender.com
AFFILIATE_CONFIG_JSON=<approved affiliate JSON>
```

The production MCP server exposes only `recommend_mattress`. Affiliate links must remain disabled until the relevant merchant program is approved.

## Endpoints

- `GET /health`
- `GET /privacy`
- `GET /terms`
- `GET /support`
- `GET /demo`
- `POST /mcp`
- `POST /apps/mattress-finder/recommend`
