import { createClient } from '@sanity/client';

const projectId = "6uu4aiks";
const dataset = "production";
const apiVersion = "v2024-05-01";
const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use a fixed date for the API version
  useCdn: true
  // `false` if you want to ensure the freshest data, `true` for faster public loading
});
async function getFaqs() {
  const query = `
    *[_type == "faqItem"] | order(order asc, category asc) {
      _id,
      question,
      answer,
      category,
      order
    }
  `;
  const faqs = await sanityClient.fetch(query);
  return faqs;
}
async function getDocuments() {
  const query = `
    *[_type == "documentItem"] | order(order asc) {
      _id,
      title,
      category,
      // CRUCIAL: Fetch the file asset reference
      "fileUrl": file.asset->url
    }
  `;
  const documents = await sanityClient.fetch(query);
  return documents;
}

export { getDocuments as a, getFaqs as g, sanityClient as s };
