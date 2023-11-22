const API_URL = 'http://localhost:3000' || process.env.API_URL;

export async function fetchLogin(email, password) {
  try {
    const response = await fetch(API_URL + '/auth/login', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({ username: email, password }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    throw error;
  }
}

export async function fetchLogout() {
  try {
    const response = await fetch(API_URL + '/auth/logout', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    throw error;
  }
}

export async function fetchSession() {
  try {
    const response = await fetch(API_URL + '/auth/session', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    throw error;
  }
}

export async function fetchCreateOperations(userId, type, firstNum, secondNum) {
  try {
    const response = await fetch(API_URL + '/operations', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        userId,
        type,
        firstNum,
        secondNum,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    throw error;
  }
}

export async function fetchRecords() {
  try {
    const response = await fetch(API_URL + '/records', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    throw error;
  }
}
