# Dog Food Finder Status

Last updated: 2026-09-02

## Production

- GitHub repo: https://github.com/sholts2026/dog-food-finder-mcp
- Render service: `dog-food-finder-mcp`
- Render URL: https://dog-food-finder-mcp.onrender.com
- MCP endpoint: https://dog-food-finder-mcp.onrender.com/mcp
- Latest deployed commit expected: `a3643c9`

## Affiliate

- Approved merchant: PetPlate
- Network: Awin
- Awin publisher ID: `3068771`
- PetPlate advertiser ID: `70899`
- Observed approved terms: `$25 per Sale`, 30-day cookie
- Product feed: not available in observed Awin terms; catalog is curated from PetPlate public product pages.

## Render Environment

- `PUBLISHED_APP=pet-food-finder`
- `PUBLIC_BASE_URL=https://dog-food-finder-mcp.onrender.com`
- `AFFILIATE_CONFIG_JSON` set with PetPlate/Awin tracking
- `OPENAI_APPS_CHALLENGE_TOKEN` blank until OpenAI provides a domain verification token

## Verified

- `GET /` returns 200
- `GET /health` returns 200 and `publishedApp=pet-food-finder`
- `GET /privacy` returns 200
- `GET /terms` returns 200
- `POST /mcp` `tools/list` returns only `recommend_pet_food`
- `POST /mcp` `tools/call` returns PetPlate recommendations only
- Returned production `buyUrl` values use Awin tracking for advertiser `70899`

## Next

Submit in OpenAI Platform using:

- App name: Dog Food Finder
- MCP server URL: https://dog-food-finder-mcp.onrender.com/mcp
- Privacy URL: https://dog-food-finder-mcp.onrender.com/privacy
- Terms URL: https://dog-food-finder-mcp.onrender.com/terms
- Support contact: sholtsman29@gmail.com
- Icon: `submission/icon.svg`

If OpenAI asks for domain verification, copy the token into Render as `OPENAI_APPS_CHALLENGE_TOKEN`, deploy again, and verify:

```text
https://dog-food-finder-mcp.onrender.com/.well-known/openai-apps-challenge
```
