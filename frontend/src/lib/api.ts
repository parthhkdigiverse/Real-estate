const isServer = typeof window === "undefined";

const isServer = typeof window === "undefined";

const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL as string;
  
  if (isServer) {
    return envUrl || "http://localhost:8000";
  }

  // Browser Logic
  const hostname = window.location.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  // AGGRESSIVE OVERRIDE: If we are on a live domain, always default to relative paths
  // unless we have an explicit non-localhost cross-domain API URL.
  if (!isLocalHost) {
    if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
      return ""; // Force relative path on live site
    }
  }

  // Default fallbacks
  if (envUrl) return envUrl;
  if (isLocalHost) return `http://${hostname}:8000`;
  
  return "";
};

export const API_BASE_URL = getApiBase();

// Diagnostic logging for live debugging
if (!isServer) {
  console.log("%c[API Config] Resolved Base URL:", "color: #ff00ff; font-weight: bold;", API_BASE_URL || "(relative)");
}



export const getApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!API_BASE_URL) return normalizedPath;
  return `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`;
};

export async function fetchProperties() {
  const res = await fetch(getApiUrl("/api/properties/"));
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function fetchPropertyBySlug(slug: string) {
  const res = await fetch(getApiUrl(`/api/properties/${slug}`));
  if (!res.ok) throw new Error("Property not found");
  return res.json();
}

export async function createProperty(data: any, token: string) {
  const res = await fetch(getApiUrl("/api/properties/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create property");
  return res.json();
}

export async function updateProperty(id: string, data: any, token: string) {
  const res = await fetch(getApiUrl(`/api/properties/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
}

export async function deleteProperty(id: string, token: string) {
  const res = await fetch(getApiUrl(`/api/properties/${id}`), {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  if (!res.ok) throw new Error("Failed to delete property");
  return res.json();
}

export async function uploadAsset(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(getApiUrl("/api/assets/upload"), {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to upload asset");
  }

  return res.json();
}

export async function fetchInquiries(token: string) {
  const res = await fetch(getApiUrl("/api/inquiries/"), {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch inquiries");
  return res.json();
}

export async function deleteInquiry(id: string, token: string) {
  const res = await fetch(getApiUrl(`/api/inquiries/${id}`), {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete inquiry");
  return res.json();
}

export async function submitInquiry(data: any) {
  const res = await fetch(getApiUrl("/api/inquiries/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchSettings() {
  try {
    const res = await fetch(getApiUrl("/api/settings"));
    if (!res.ok) {
      console.warn(`Settings fetch failed with status ${res.status}. Using fallback defaults.`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Critical error fetching site settings:", error);
    return null; // Return null instead of throwing to prevent SSR crash
  }
}

