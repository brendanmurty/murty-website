import { parse as envParse } from "@std/dotenv";
import { logError } from "$be/log.ts";
import { PostHog } from "posthog";

export class Env {
  private env: Record<string, string> = {};
  private envFileDefault: string = "./.env";

  constructor(envFile: string = this.envFileDefault) {
    // Attempt to load the env file, or fallback to using the system env vars
    try {
      this.env = envParse(Deno.readTextFileSync(envFile));
    } catch (_error: unknown) {
      this.env = Deno.env.toObject();
    }
  }

  public get(varName: string, defaultValue?: string): string {
    return this.env[varName] || defaultValue || "";
  }

  public has(varName: string): boolean {
    return this.get(varName) !== undefined;
  }

  public getNumber(varName: string, defaultValue?: number): number {
    if (defaultValue) {
      return Number(this.get(varName)) || defaultValue;
    }

    return Number(this.get(varName)) || 0;
  }

  public getSiteEnv(): string {
    return this.get("SITE_ENV", "other");
  }

  public isLocal(): boolean {
    return this.get("SITE_ENV", "other") == "local";
  }

  public getUrl(): string {
    if (this.isLocal()) {
      const port = this.getPort();
      return `http://localhost:${port}`;
    }

    return this.get("SITE_URL", "https://bcm.works");
  }

  public getPort(): number {
    const sysPort = this.getNumber("PORT", 0);

    if (sysPort > 0) {
      return sysPort;
    }

    return this.getNumber("SITE_PORT", 8000);
  }

  public getBuildDir(): string {
    return this.get("SITE_BUILD_DIR", "build");
  }

  public getPublicDir(): string {
    return this.get("SITE_PUBLIC_DIR", "public");
  }

  // Substrings that mark a path as an automated scanner probe (secret files,
  // CMS admin panels). These 404s are not broken links, so we do not capture them.
  private static readonly scannerPathParts: string[] = [
    ".env",
    ".git",
    ".aws",
    ".ssh",
    ".php",
    "wp-admin",
    "wp-login",
    "wp-content",
    "phpmyadmin"
  ];

  private isScannerPath(pathname: string): boolean {
    const path = pathname.toLowerCase();
    return Env.scannerPathParts.some((part) => path.includes(part));
  }

  public async postHogAnonBackendEvent(
    statusCode: number,
    eventRequest: Request,
    eventData: Record<string, string | number | undefined> = {}
  ): Promise<void> {
    const postHogId: string = this.get("SITE_POSTHOG_ID", "");
    const postHogApiHost: string = this.get("SITE_POSTHOG_API_HOST", "");
    const eventActor: string = `${this.getSiteEnv()}-backend-anon-event`;
    const eventPath: string = new URL(eventRequest.url).pathname;
    const eventContent: string = `${statusCode} ${eventPath}`;

    if (this.isScannerPath(eventPath)) {
      logError(`postHogAnonBackendEvent skipped scanner path [${eventActor}] ${eventContent}`);
      return;
    }

    if (postHogId) {
      const postHogClient = new PostHog(
        postHogId,
        {
          host: postHogApiHost
        }
      );

      // Capture a normal event, not an exception, so the path stays off the
      // fingerprint and no per-URL error tracking issue is created.
      postHogClient.capture({
        distinctId: eventActor,
        event: "backend_response",
        properties: {
          status_code: statusCode,
          path: eventPath,
          ...eventData
        }
      });

      // Flush and close the per-request client so its timer does not linger.
      await postHogClient.shutdown();

      logError(`postHogAnonBackendEvent sent [${eventActor}] ${eventContent}`);
    } else {
      logError(`postHogAnonBackendEvent skipped [${eventActor}] ${eventContent}`);
    }
  }
}
