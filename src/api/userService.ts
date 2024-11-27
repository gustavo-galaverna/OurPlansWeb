import {UserRequest} from '../models/UserRequest'
import {LoginRequest} from '../models/LoginRequest'
import { LoginResponse } from '../models/LoginResponse';
import { ResponseBase } from '../models/ResponseBase';
import { ResendConfirmationCodeRequest } from '../models/ResendConfirmationCodeRequest';
import { ConfirmUserRequest } from '../models/ConfirmUserRequest';

const baseUrl = "http://localhost:8082/api/users/";

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

const loginUser = async (user: LoginRequest): Promise<ResponseBase<LoginResponse|null>> => {
    const url = baseUrl + 'Login';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        if(data.value != null || data.value != undefined)
        {
            let responseValue = new LoginResponse();
            responseValue.name = data.value.name;
            responseValue.username = data.value.username;
            responseValue.needsConfirmation = data.value.needsConfirmation;

            return new ResponseBase(true, undefined, responseValue);
        }

        
        return new ResponseBase(false, data.responseInfo?.message, null);

    } catch (error) {
        return new ResponseBase(false, (error as Error).message, null);
    }
};

const resendCode = async (confirmationCode: ResendConfirmationCodeRequest): Promise<ResponseBase<boolean|null>> => {
    const url = baseUrl + 'Resend-Confirmation';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(confirmationCode)
        });

        const data = await response.json();
        if((data.responseInfo != null || data.responseInfo != undefined))
        {
            return new ResponseBase(false, data.responseInfo?.message, null);
        }

        let responseValue = data.value as boolean;

        return new ResponseBase(true, undefined, responseValue);

    } catch (error) {
        return new ResponseBase(false, (error as Error).message, null);
    }
};

const confirmUser = async (confirmationRequest : ConfirmUserRequest) : Promise<ResponseBase<string>> => 
{
    const url = baseUrl + 'Confirm-Email';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(confirmationRequest)
        });

        const data = await response.json();
        if((data.responseInfo != null || data.responseInfo != undefined))
        {
            return new ResponseBase(false, data.responseInfo?.message, "");
        }

        let responseValue = data.value as string;

        return new ResponseBase(true, undefined, responseValue);

    } catch (error) {
        return new ResponseBase(false, (error as Error).message, "");
    }    
};

const isAuthenticated =  async () : Promise<boolean> =>
{
    const url = baseUrl + 'Check';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.status === 200)
        {
            return true
        }

        return false;

    } catch (error) {
        return false;
    }    
}

export { registerUser, loginUser, resendCode, confirmUser, isAuthenticated };