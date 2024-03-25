import sanityClient from "@sanity/client";
export default sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: true,
});
