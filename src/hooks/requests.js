const useGet = () => {
    return async (url, options) => {
        try {
            let controller = new AbortController();
            setTimeout(() => controller.abort(), 10000);

            const resp = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            const json = await resp.json();

            return json;
        } catch(err) {
            console.log(err);
            return [];
        }
    };
};

export { useGet };