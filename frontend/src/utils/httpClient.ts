// utils/httpClient.ts

import { SubmitResultPayload } from '../types/SubmitResultPayload';

export const fetchResults = async (payload: SubmitResultPayload) => {
    const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/results`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
};