# Dog Food Finder Status

Last updated: 2026-09-02

## Production

- GitHub repo: https://github.com/sholts2026/dog-food-finder-mcp
- Render service: `dog-food-finder-mcp`
- Render URL: https://dog-food-finder-mcp.onrender.com
- MCP endpoint: https://dog-food-finder-mcp.onrender.com/mcp
- Latest deployed commit: `0976224`

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
- `OPENAI_APPS_CHALLENGE_TOKEN` set; OpenAI domain verification passed

## Verified

- `GET /` returns 200
- `GET /health` returns 200 and `publishedApp=pet-food-finder`
- `GET /privacy` returns 200
- `GET /terms` returns 200
- `GET /demo.mp4` returns 200 with `video/mp4`
- `POST /mcp` `tools/list` returns only `recommend_pet_food`
- `POST /mcp` `tools/call` returns PetPlate recommendations only
- Returned production `buyUrl` values use Awin tracking for advertiser `70899`

## OpenAI Submission

- Plugin ID: `asdk_app_6a97c973f5ec8191928445e554a0713f`
- Version ID: `asdk_app_v_6a97c9755934819194e468b55429f416`
- Version: `1.0.0`
- Status: `Review`
- Submitted: 2026-09-02
- OpenAI confirmation: `Dog Food Finder submitted for review`
- Demo recording: https://dog-food-finder-mcp.onrender.com/demo.mp4
- Developer identity and public author: `שני נתן הולצמן`

## Next

Wait for OpenAI's review decision. If changes are requested, address the reviewer feedback in a new draft and submit the updated version.
