# Submission Package - Dog Food Finder

This package is for submitting Dog Food Finder to the OpenAI Plugin/App Directory using the current MCP-based plugin flow.

## Checklist

- [x] Focused app name and purpose: Dog Food Finder.
- [x] One clear tool exposed in production: `recommend_pet_food`.
- [x] No checkout, payment, account creation, or lead submission inside the app.
- [x] Affiliate disclosure included in recommendation output and public pages.
- [x] Privacy policy and terms drafted.
- [x] Public marketing/reviewer site live at `https://dog-food-finder.pages.dev`.
- [x] Deploy MCP backend to stable HTTPS URL: `https://dog-food-finder-mcp.onrender.com`.
- [x] Verify `https://dog-food-finder-mcp.onrender.com/health`.
- [x] Verify `https://dog-food-finder-mcp.onrender.com/mcp`.
- [x] Set `AFFILIATE_CONFIG_JSON` in the host environment with approved PetPlate/Awin tracking configuration.
- [x] Restrict published recommendations to merchants with active affiliate tracking.
- [ ] Fill any OpenAI domain challenge token in `OPENAI_APPS_CHALLENGE_TOKEN`.
- [ ] Submit in OpenAI developer dashboard.

## Production Environment

Set this in Render after creating the service:

```json
{
  "petplate": {
    "enabled": true,
    "affiliateUrlTemplate": "https://www.awin1.com/cread.php?awinmid=<AWIN_ADVERTISER_ID>&awinaffid=<AWIN_PUBLISHER_ID>&clickref={clickId}&campaign={appId}&ued={encodedDestinationUrl}",
    "partnerId": "<AWIN_PUBLISHER_ID>",
    "advertiserId": "<AWIN_ADVERTISER_ID>",
    "network": "Awin"
  }
}
```

## Reviewer Test Prompts

1. `Find dog food for my adult golden retriever with chicken allergy under $100/month.`
2. `Compare fresh dog food for a picky senior dog.`
3. `Find sensitive-stomach dog food for a large breed dog.`
4. `What should I consider before switching my dog to fresh food?`

Expected behavior:

- The app returns ranked products with fit scores and tradeoffs.
- The public deployment returns PetPlate recommendations only while PetPlate is the only approved affiliate programme.
- The app avoids products that conflict with explicit allergy constraints when possible and asks users to verify final ingredients with the merchant.
- The app includes affiliate disclosure near outbound links.
- The app does not make veterinary diagnosis or treatment claims.

## Current Verified Production Result

For `Find dog food for my adult golden retriever with chicken allergy under $100/month.`, the live MCP deployment returns three PetPlate recommendations. All returned `buyUrl` values use Awin advertiser ID `70899`.
