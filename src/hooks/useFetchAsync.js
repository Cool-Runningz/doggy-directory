import { useEffect, useState } from "react";

const useFetchAsync = (initialUrl, options) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(initialUrl || "")

    useEffect(() => {
        if(!url) return

        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const json = await response.json()
                setData(json)
                setLoading(false)
                setError(null)

            } catch (error) {
                //This catches the error if either of the promises fails or the manual error is thrown
                setLoading(false)
                setError(error.message)
            }
        }

        fetchData()
}, [url, options]);

    return [{ data, loading, error }, setUrl];
}

export default useFetchAsync;
