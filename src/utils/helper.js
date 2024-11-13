export const fetchMusicData = async (endpoint, query = "") => {
    const url = `https://jsonplaceholder.typicode.com/${endpoint}${query}`;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();  // Parse the response body as JSON
        return data;  // Return the parsed JSON data
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;  // Re-throw the error for further handling
    }
};

export const getData = async () => {
    try {
        const data = await fetchMusicData("photos", "");
        console.log("data===>>>>>>>>>>>>>>>>>>>", data);  // Log the data
    } catch (error) {
        console.error("Failed to fetch data", error);
    }
};