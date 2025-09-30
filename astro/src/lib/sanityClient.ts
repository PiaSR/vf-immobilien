import { createClient } from "@sanity/client";
import type { OfficeDetails } from '/sanity-v4/schemaTypes/officeDetails'; // Adjust path as needed


// Ensure your environment variables are set up correctly
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity project ID or dataset in environment variables.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // Use a fixed date for the API version
  useCdn: true, // `false` if you want to ensure the freshest data, `true` for faster public loading
});

/**
 * Fetches all FAQ items from Sanity.
 * Orders them by the 'order' field, then by category.
 */
export async function getFaqs() {
  // GROQ Query: Select all documents of type 'faqItem'
  const query = `
    *[_type == "faqItem"] | order(order asc, category asc) {
      _id,
      question,
      answer,
      category,
      order
    }
  `;
  
  // Fetch the data
  const faqs = await sanityClient.fetch(query);
  
  return faqs;
}

export async function getDocuments() {
  // GROQ Query: Select all documents of type 'documentItem'
  const query = `
    *[_type == "documentItem"] | order(order asc) {
      _id,
      title,
      category,
      // CRUCIAL: Fetch the file asset reference
      "fileUrl": file.asset->url
    }
  `;
  
  // Fetch the data
  const documents = await sanityClient.fetch(query);
  
  return documents;
}


export type { OfficeDetails };