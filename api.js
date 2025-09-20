// This is the full content for your new api.js file

const API_BASE_URL = 'http://127.0.0.1:5000/api'; // This will be our Flask backend URL

async function apiRequest(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || `HTTP error! Status: ${response.status}`);
        }
        
        return responseData;

    } catch (error) {
        console.error('API Request Error:', error);
        if (typeof showNotification === 'function') {
            showNotification(error.message, 'error');
        }
        throw error;
    }
}