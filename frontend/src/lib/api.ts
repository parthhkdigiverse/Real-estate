const isServer = typeof window === "undefined";

const getApiBase = () => {
  const isBrowser = typeof window !== "undefined";
  
  // 1. Explicit Override (highest priority)
  const envUrl = import.meta.env.VITE_API_URL as string;
  if (envUrl) return envUrl;

  // 2. Browser Logic: Always use relative paths by default
  if (isBrowser) {
    // SECURITY: Even if a VITE_BACKEND_PORT exists, if we are in a public domain, 
    // we should NOT fallback to 127.0.0.1. Relativeness is safer for SSL/Proxies.
    return "";
  }

  // 3. SSR Logic fallback for development
  const backendPort = import.meta.env.VITE_BACKEND_PORT;
  if (backendPort) {
    return `http://127.0.0.1:${backendPort}`;
  }

  return ""; 
};

export const API_BASE_URL = getApiBase();

// Utility to get the "clean" fetch to avoid interception by dev-tool proxies
const safeFetch = async (url: string, options?: RequestInit) => {
  // If we are on a public domain, and somehow an old tool is still trying to use localhost,
  // we FORCE it back to the absolute URL.
  let targetUrl = url;
  if (typeof window !== "undefined") {
    const isPublicHost = !window.location.hostname.includes("127.0.0.1") && !window.location.hostname.includes("localhost");
    if (isPublicHost && (url.includes("127.0.0.1") || url.includes("localhost"))) {
       console.warn("[API Sanity Check] Blocking attempted localhost fetch on public domain. Redirecting to relative origin.");
       targetUrl = url.replace(/http:\/\/127\.0\.0\.1:\d+/, "").replace(/http:\/\/localhost:\d+/, "");
    }
  }
  return fetch(targetUrl, options);
};

export const getApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  if (typeof window !== "undefined") {
    const isPublicHost = !window.location.hostname.includes("127.0.0.1") && !window.location.hostname.includes("localhost");
    
    // If we are on a public domain, FORCE the current origin to bypass any local dev proxies or stale base tags.
    if (isPublicHost) {
      const origin = window.location.origin.replace(/\/$/, "");
      return `${origin}${normalizedPath}`;
    }
  }

  if (!API_BASE_URL) return normalizedPath;
  return `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`;
};

// Extra diagnostic logging
if (typeof window !== "undefined") {
  console.log("%c[API Config] Dynamic Base URL Discovery:", "color: #ff00ff; font-weight: bold; background: #330033; padding: 2px 6px; border-radius: 4px;");
  console.log("  - FINAL API URL (Settings):", getApiUrl("/api/settings"));
  
  // Test if fetch is native or monkey-patched
  const fetchStr = window.fetch.toString();
  const isPatched = !fetchStr.includes("[native code]");
  console.log("  - Fetch Implementation:", isPatched ? "MODIFIED (Likely by Dev Tools)" : "Native");
}

export async function fetchProperties() {
  const res = await safeFetch(getApiUrl("/api/properties/"));
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function fetchPropertyBySlug(slug: string) {
  const res = await safeFetch(getApiUrl(`/api/properties/${slug}`));
  if (!res.ok) throw new Error("Property not found");
  return res.json();
}

export async function createProperty(data: any, token: string) {
  const res = await safeFetch(getApiUrl("/api/properties/"), {
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
  const res = await safeFetch(getApiUrl(`/api/properties/${id}`), {
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
  const res = await safeFetch(getApiUrl(`/api/properties/${id}`), {
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

  const res = await safeFetch(getApiUrl("/api/assets/upload"), {
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
  const res = await safeFetch(getApiUrl("/api/inquiries/"), {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch inquiries");
  return res.json();
}

export async function deleteInquiry(id: string, token: string) {
  const res = await safeFetch(getApiUrl(`/api/inquiries/${id}`), {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete inquiry");
  return res.json();
}

export async function submitInquiry(data: any) {
  const res = await safeFetch(getApiUrl("/api/inquiries/"), {
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
    const res = await safeFetch(getApiUrl("/api/settings"));
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

