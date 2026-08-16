# J K Fertilizers auth.md — Agent Authentication & Registration

> **Specification:** [Auth.md](https://workos.com/auth-md) | **Service:** J K Fertilizers | **Version:** 1.0.0

This document defines how autonomous AI agents, crawlers, and programmatic systems authenticate, register, and interact with J K Fertilizers' machine-readable APIs and product catalog.

---

## 1. Discovery & Metadata

- **A2A Agent Card (Agent2Agent Protocol):** `https://jkfertilizers.com/.well-known/agent-card.json`
- **MCP Server Card (SEP-1649):** `https://jkfertilizers.com/.well-known/mcp/server-card.json`
- **Agent Skills Directory:** `https://jkfertilizers.com/.well-known/agent-skills/index.json`
- **OAuth Protected Resource:** `https://jkfertilizers.com/.well-known/oauth-protected-resource`
- **OAuth Authorization Server:** `https://jkfertilizers.com/.well-known/oauth-authorization-server`
- **API Catalog (RFC 9727):** `https://jkfertilizers.com/.well-known/api-catalog`
- **Machine Knowledge (llms.txt):** `https://jkfertilizers.com/llms.txt`
- **B2B Pricing & Terms:** `https://jkfertilizers.com/pricing.md`

---

## 2. Supported Identity & Credential Types

J K Fertilizers supports open agent registration with multiple identity assertion mechanisms:

### Supported Identity Types
1. **`anonymous`**: Open discovery and catalog access without prior account creation.
2. **`identity_assertion`**: Verified agent identity via:
   - `urn:ietf:params:oauth:token-type:id-jag` (Identity-JWT for Autonomous Groups)
   - `verified_email` (Agent operator verified email address)

### Supported Credential Types
- `api_key`: Long-lived Bearer token for automated B2B procurement queries.
- `bearer_token`: Ephemeral OAuth 2.0 access token for session requests.

---

## 3. Agent Registration Flow

### Dynamic Registration (`POST /agent/auth`)
Agents can register dynamically by sending an authentication request:

```http
POST /agent/auth HTTP/1.1
Host: jkfertilizers.com
Content-Type: application/json

{
  "agent_name": "ProcurementAgent/1.0",
  "identity_type": "anonymous",
  "requested_scopes": ["read:products", "read:pricing", "inquiry:create"]
}
```

### Claim URI
- **Claim Endpoint:** `https://jkfertilizers.com/agent/claim`

### Revocation URI
- **Revocation Endpoint:** `https://jkfertilizers.com/agent/revoke`
- **Events Supported:** `https://schemas.workos.com/events/agent.revocation`

---

## 4. Scopes & Permissions

| Scope | Description |
|---|---|
| `read:products` | Read detailed specifications, chemical assays, and packaging options |
| `read:pricing` | Access B2B volume tiers, MOQ, and commercial pricing |
| `inquiry:create` | Submit B2B wholesale quotation requests and sample orders |
| `agent:read` | Inspect agent account status and active rate limits |

---

## 5. Contact & Support
- **Organization:** J K Fertilizers (Anand, Gujarat, India)
- **Technical Contact:** info@jkfertilizers.com
- **Sales & Wholesale:** sales@jkfertilizers.com
- **Website:** https://jkfertilizers.com
