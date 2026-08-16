/**
 * Cloudflare Pages _worker.js
 * Implements:
 * 1. Markdown for Agents Content Negotiation (Accept: text/markdown)
 * 2. API Catalog Discovery (RFC 9727 / RFC 9264 application/linkset+json)
 * 3. OAuth Metadata & Auth.md Agent Discovery (RFC 8414 / RFC 9207 / Auth.md)
 * 4. Agent Skills Discovery RFC v0.2.0 (/.well-known/agent-skills/index.json)
 * 5. Link response headers for Agent Discovery (RFC 8288)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const acceptHeader = request.headers.get('Accept') || '';

    // 1. A2A Agent Card Discovery (Agent2Agent Protocol)
    if (
      url.pathname === '/.well-known/agent-card.json' ||
      url.pathname === '/.well-known/agent-card' ||
      url.pathname === '/.well-known/agent.json' ||
      url.pathname === '/.well-known/agent'
    ) {
      try {
        const a2aRes = await env.ASSETS.fetch(new URL('/.well-known/agent-card.json', url.origin));
        if (a2aRes.ok) {
          const body = await a2aRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch {
        // fallback
      }
    }

    // 2. MCP Server Card Discovery (SEP-1649 / SEP-2127)
    if (
      url.pathname === '/.well-known/mcp/server-card.json' ||
      url.pathname === '/.well-known/mcp/server-card' ||
      url.pathname === '/.well-known/mcp.json' ||
      url.pathname === '/.well-known/mcp'
    ) {
      try {
        const mcpRes = await env.ASSETS.fetch(new URL('/.well-known/mcp/server-card.json', url.origin));
        if (mcpRes.ok) {
          const body = await mcpRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch {
        // fallback
      }
    }

    // 2. Agent Skills Discovery Index (RFC v0.2.0)
    if (url.pathname === '/.well-known/agent-skills/index.json' || url.pathname === '/.well-known/agent-skills') {
      try {
        const skillsRes = await env.ASSETS.fetch(new URL('/.well-known/agent-skills/index.json', url.origin));
        if (skillsRes.ok) {
          const body = await skillsRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch {
        // fallback
      }
    }

    // 2. API Catalog endpoint (RFC 9727)
    if (url.pathname === '/.well-known/api-catalog') {
      try {
        const catRes = await env.ASSETS.fetch(new URL('/.well-known/api-catalog', url.origin));
        if (catRes.ok) {
          const body = await catRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'application/linkset+json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch {
        // fallback
      }
    }

    // 3. OAuth Protected Resource Metadata (PRM)
    if (url.pathname === '/.well-known/oauth-protected-resource') {
      try {
        const prmRes = await env.ASSETS.fetch(new URL('/.well-known/oauth-protected-resource', url.origin));
        if (prmRes.ok) {
          const body = await prmRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch {
        // fallback
      }
    }

    // 4. OAuth Authorization Server Metadata (Auth.md)
    if (url.pathname === '/.well-known/oauth-authorization-server') {
      try {
        const asRes = await env.ASSETS.fetch(new URL('/.well-known/oauth-authorization-server', url.origin));
        if (asRes.ok) {
          const body = await asRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch {
        // fallback
      }
    }

    // 5. Health check endpoint
    if (url.pathname === '/api/health') {
      try {
        const healthRes = await env.ASSETS.fetch(new URL('/api/health', url.origin));
        if (healthRes.ok) {
          const body = await healthRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'no-cache',
            },
          });
        }
      } catch {
        // fallback
      }
    }

    // 6. Markdown Content Negotiation (Accept: text/markdown)
    if (acceptHeader.includes('text/markdown')) {
      const cleanPath = url.pathname.replace(/\/$/, '') || '/index';

      const candidatePaths = [
        cleanPath === '/index' ? '/index.md' : `${cleanPath}.md`,
        `${cleanPath}/index.md`,
        '/llms.txt',
        '/auth.md',
      ];

      for (const candidate of candidatePaths) {
        try {
          const mdUrl = new URL(candidate, url.origin);
          const response = await env.ASSETS.fetch(mdUrl);
          if (response.ok) {
            const text = await response.text();
            const tokenCount = Math.ceil(text.length / 4);

            return new Response(text, {
              status: 200,
              headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'x-markdown-tokens': String(tokenCount),
                'Vary': 'Accept',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600',
              },
            });
          }
        } catch {
          // fallback to next candidate
        }
      }
    }

    // 7. Default Asset / HTML Response with Link Headers
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      newHeaders.set(
        'Link',
        '</llms.txt>; rel="describedby"; type="text/markdown", </pricing.md>; rel="describedby"; type="text/markdown", </auth.md>; rel="describedby"; type="text/markdown", </sitemap.xml>; rel="service-desc"; type="application/xml", </.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json", </.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json", </.well-known/agent-card.json>; rel="service-desc"; type="application/json"'
      );
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
