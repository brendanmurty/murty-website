import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    // Redirect the user when a shortcut domain is requested
    const request_domain: string = ctx.request.headers.get('host')?.split(':')[0] || '';
    switch (request_domain) {
      case 'b.murty.io':
      case 'brendan.murty.io':
      case 'b.murty.au':
      case 'brendan.murty.au':
      case 'brendanmurty.com':
        ctx.response.redirect(`https://murty.au/brendan`);
        break;
      case 'f.murty.io':
      case 'freya.murty.io':
      case 'f.murty.au':
      case 'freya.murty.au':
      case 'freyamurty.com':
        ctx.response.redirect(`https://murty.au/freya`);
        break;
      case 'i.murty.io':
      case 'isla.murty.io':
      case 'i.murty.au':
      case 'isla.murty.au':
      case 'islamurty.com':
        ctx.response.redirect(`https://murty.au/isla`);
        break;
      case 'l.murty.io':
      case 'luca.murty.io':
      case 'l.murty.au':
      case 'luca.murty.au':
      case 'lucamurty.com':
        ctx.response.redirect(`https://murty.au/luca`);
        break;
    }

    // Serve the request from the static site directory
    await ctx.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    next();
  }
});

// Listen for requests on port 8000
await app.listen({ port: 8000 });
