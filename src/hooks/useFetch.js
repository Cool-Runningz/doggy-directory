import { useEffect, useState } from "react";

const useFetch = (initialUrl, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl || "")

  useEffect(() => {
    if(!url) return

    setLoading(true)
    fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }
          return response.json()
        })
        .then((json) => {
          setData(json)
          setLoading(false)
          setError(null)
        })
        .catch(error => {
         //This catches the error if either of the promises fail
          setLoading(false)
          setError(error.message)
        })

  }, [url, options]);

  return [{ data, loading, error }, setUrl];
};

export default useFetch;
