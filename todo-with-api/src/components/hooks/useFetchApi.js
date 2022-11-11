import {useEffect, useState} from "react";

function useFetchApi ({url}) {
    const [loading, setLoading]         = useState(false);
    const [data, setData]               = useState([]);
    async function fetchData() {
        try {
            setLoading(true);
            const resp = await fetch(url);

            const respData = await resp.json();

            setData(respData['data']);
            setLoading(false)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        data,
        setData,
        loading,
        setLoading
    }
}
export default useFetchApi;