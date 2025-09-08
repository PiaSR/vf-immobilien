interface ImportMetaEnv {
	readonly SANITY_PROJECT_ID: string
	readonly SANITY_DATASET: string
	// Add other environment variables here as needed
  }
  
  interface ImportMeta {
	readonly env: ImportMetaEnv
  }