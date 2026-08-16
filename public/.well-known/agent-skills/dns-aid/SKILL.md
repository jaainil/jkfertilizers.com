---
name: dns-aid
description: Specifications and zone record definitions for DNS for AI Discovery (DNS-AID) under the _agents namespace with SVCB/HTTPS records and DNSSEC validation.
version: 1.0.0
---

# DNS for AI Discovery (DNS-AID) — J K Fertilizers

This document outlines the DNS-AID configuration and Service Binding (SVCB / HTTPS) entrypoints for autonomous agent discovery per `draft-mozleywilliams-dnsop-dnsaid` and RFC 9460.

## 1. Domain Namespace & Entrypoint Records

All agent endpoints are published under the `_agents.jkfertilizers.com` namespace:

### A2A Protocol Entrypoint
```dns
_a2a._agents.jkfertilizers.com. 3600 IN SVCB 1 jkfertilizers.com. alpn="a2a" port=443 mandatory=alpn,port
_a2a._agents.jkfertilizers.com. 3600 IN HTTPS 1 jkfertilizers.com. alpn="a2a" port=443 mandatory=alpn,port
```

### Model Context Protocol (MCP) Entrypoint
```dns
_mcp._agents.jkfertilizers.com. 3600 IN SVCB 1 jkfertilizers.com. alpn="mcp" port=443 mandatory=alpn,port
_mcp._agents.jkfertilizers.com. 3600 IN HTTPS 1 jkfertilizers.com. alpn="mcp" port=443 mandatory=alpn,port
```

### General Agent Index Entrypoint
```dns
_index._agents.jkfertilizers.com. 3600 IN SVCB 1 jkfertilizers.com. alpn="h2,h3" port=443 mandatory=alpn,port
_index._agents.jkfertilizers.com. 3600 IN HTTPS 1 jkfertilizers.com. alpn="h2,h3" port=443 mandatory=alpn,port
```

### B2B Procurement Agent Entrypoint
```dns
_b2b._agents.jkfertilizers.com. 3600 IN SVCB 1 jkfertilizers.com. alpn="a2a,mcp" port=443 mandatory=alpn,port
_b2b._agents.jkfertilizers.com. 3600 IN HTTPS 1 jkfertilizers.com. alpn="a2a,mcp" port=443 mandatory=alpn,port
```

## 2. DNSSEC Validation
The `jkfertilizers.com` authoritative zone is signed with DNSSEC (Algorithm 13: ECDSAP256SHA256) to ensure tamper-proof resolution via DNS-over-HTTPS (DoH) resolvers such as Cloudflare (`1.1.1.1`) and Google (`8.8.8.8`).

## 3. Related Discovery Manifests
- **A2A Agent Card:** `https://jkfertilizers.com/.well-known/agent-card.json`
- **MCP Server Card:** `https://jkfertilizers.com/.well-known/mcp/server-card.json`
- **Agent Skills Index:** `https://jkfertilizers.com/.well-known/agent-skills/index.json`
- **Machine Knowledge:** `https://jkfertilizers.com/llms.txt`
