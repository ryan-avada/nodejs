import {useEffect, useState} from "react";

function useFetchApi ({url}) {
    const [loading, setLoading]         = useState(false);
    const [data, setData]               = useState([]);
    const [fetched, setFetched]         = useState(false);

    const handleChangeInput = (key, value) => setData(prev => ({
        ...prev,
        [key]: value
    }))

    /**
     *
     * @returns {Promise<void>}
     */
    async function fetchData(url) {
        try {
            setLoading(true);
            const resp = await fetch(url);
            const {data: respData} = await resp.json();
            if (respData) {
                setData(respData);
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!fetched) {
            fetchData(url).then(() => {
                setFetched(true)
            })
        }
    }, [fetched])

    return {
        data,
        loading,
        setLoading,
        fetched,
        handleChangeInput,
        fetchData
    }
}
export default useFetchApi;