import { Client } from "./prismic-helpers";

async function fetchDocs(page = 1, routes = []) {
  const response = await Client().query("", { pageSize: 100, lang: "*", page });
  const allRoutes = routes.concat(response.results);
  if (response.results_size + routes.length < response.total_results_size) {
    return fetchDocs(page + 1, allRoutes);
  }
  return [...new Set(allRoutes)];
}

export const queryRepeatableDocuments = async (filter) => {
  const allRoutes = await fetchDocs();
  return allRoutes.filter(filter);
};
