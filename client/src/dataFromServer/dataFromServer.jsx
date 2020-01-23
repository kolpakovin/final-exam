import fetcher from './fetcher';

export const getHistory = async () => {
    try {
        const response = await fetcher.get(`/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const postGame = async (game) => {
    console.log("game", game)
    try {
        const response = await fetcher.post(`/`, game);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

