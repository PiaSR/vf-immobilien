interface ImportMetaEnv {
    // Astro's PUBLIC prefix for client-side variables
    readonly PUBLIC_SANITY_PROJECT_ID: string;
    readonly PUBLIC_SANITY_DATASET: string;
    readonly PUBLIC_SANITY_API_VERSION: string;
    readonly RESEND_API_KEY: string;
    // Add any other PUBLIC_ variables you use
}
  
  interface ImportMeta {
	readonly env: ImportMetaEnv
  }