import { useState, useEffect } from 'react';

// Usage: const { data, loading, error, refetch } = useApiData(() => searchCountries('niger'), ['niger']);
// fetchFunction: an async function that returns the data
// dependencies: when any of these values change, the data is fetched again
export default function useApiData(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Changing this number re-runs the effect, which is how "Try again" works
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // If the user leaves the screen before the request finishes,
    // we ignore the result so we never update a screen that is gone.
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction();
        if (!cancelled) setData(result);
      } catch (err) {
        // Show a friendly message instead of the raw technical error
        if (!cancelled) setError('Something went wrong. Check your internet connection and try again.');
      } finally {
        // Runs after success or failure, so the spinner always stops
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, retryCount]);

  // Call this from a "Try again" button to fetch again
  const refetch = () => setRetryCount((count) => count + 1);

  return { data, loading, error, refetch };
}