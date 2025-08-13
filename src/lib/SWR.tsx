import useSWR from "swr";

// Fetcher To Get Data From Api
export function useDataSWR({ api }: { api: string | null }) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(api, fetcher);

  return { data, error, isLoading };
}
