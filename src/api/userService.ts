import {UserRequest} from '../models/UserRequest'

const registerUser = async (user: UserRequest): Promise<void> => {
    const url = 'https://api.exemplo.com/users';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('User created successfully:', data);

    } catch (error) {
        console.error('Error creating user:', error);
    }
};
