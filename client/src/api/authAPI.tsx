import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // If the request was not successful, throw an error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // If an error occurred, return a rejected promise
    console.log("Error in login: ", error);
    return Promise.reject("Error in login");
  }
};

export { login };
