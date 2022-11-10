async function useFetchApi(url) {
    try {
        setIsLoading(true)
        const resp = await fetch(url);
        return resp.json()
    } catch (e) {
        console.error(e)
    } finally {
        setIsLoading(false)
    }
}