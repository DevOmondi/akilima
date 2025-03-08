import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseApiUrl = import.meta.env.VITE_API_URL;
const openWeatherUrl = import.meta.env.VITE_OPENWEATHER_API_URL;

const getUserLocationAndCoordinates = async () => {
  try {
    const locationResponse = await axios.get(`${baseApiUrl}/get_users`);
    const userDetails = locationResponse.data;
    console.log

    if (!Array.isArray(userDetails) || userDetails.length === 0) {
      throw new Error("Invalid user data received.");
    }

    // Extract unique { location, phone_number } pairs
    const uniqueUsers = Array.from(
      new Map(
        userDetails.map((user) => [
          `${user.location}-${user.phone_number}`,
          user,
        ])
      ).values()
    );

    if (uniqueUsers.length === 0) {
      throw new Error("No valid user locations found.");
    }

    // Fetch coordinates for all unique locations
    const coordinatesPromises = uniqueUsers.map(async (user) => {
      try {
        console.log("Fetching coordinates for:", user.location);
        const coordinatesResponse = await axios.get(
          `${openWeatherUrl}/direct?q=${user.location},KE&limit=1&appid=${apiKey}`
        );

        if (
          !coordinatesResponse.data ||
          coordinatesResponse.data.length === 0
        ) {
          throw new Error(`No coordinates found for ${user.location}`);
        }

        const { lat, lon } = coordinatesResponse.data[0];
        console.log("Coordinates Response:", lat, lon);

        return {
          location: user.location,
          phone_number: user.phone_number,
          coordinates: { lat, lon },
        };
      } catch (error) {
        console.error(
          `Error fetching coordinates for ${user.location}:`,
          error
        );
        return {
          location: user.location,
          phone_number: user.phone_number,
          coordinates: null,
        };
      }
    });

    const usersWithCoordinates = await Promise.all(coordinatesPromises);
    console.log("Final Data:", usersWithCoordinates);

    return usersWithCoordinates;
  } catch (error) {
    console.error("Error fetching user location and coordinates:", error);
    return null;
  }
};

export default getUserLocationAndCoordinates;
