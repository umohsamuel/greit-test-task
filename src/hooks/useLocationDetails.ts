import { useEffect, useState } from "react";

const cache = new Map();

async function fetchLocation(
  latitude: string,
  longitude: string
): Promise<string> {
  const cacheKey = `${latitude},${longitude}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    const data = await res.json();
    const respLocation = data.address
      ? `${data.address.city || data.address.town}, ${data.address.country}`
      : "Unknown";
    cache.set(cacheKey, respLocation);
    return respLocation;
  } catch (err) {
    console.error("Error fetching location details:", err);
    return "Failed to fetch location";
  }
}

export const useLocationDetails = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  const [location, setLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!latitude || !longitude) return;
    setIsLoading(true);

    fetchLocation(latitude, longitude)
      .then(setLocation)
      .finally(() => setIsLoading(false));
  }, [latitude, longitude]);

  return { location, isLoading };
};
