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

export const getApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // SANITY CHECK: If we are in the browser, and the base URL is local, but we are on a public domain,
  // we MUST force relative paths to prevent ERR_CONNECTION_REFUSED.
  if (typeof window !== "undefined") {
    const isLocalBase = API_BASE_URL?.includes("127.0.0.1") || API_BASE_URL?.includes("localhost");
    const isPublicHost = !window.location.hostname.includes("127.0.0.1") && !window.location.hostname.includes("localhost");
    
    if (isLocalBase && isPublicHost) {
      console.warn("[API Sanity Check] Overriding stale localhost API Base with relative path for public domain.");
      return normalizedPath;
    }
  }

  if (!API_BASE_URL) return normalizedPath;
  return `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`;
};

// Extra diagnostic logging
if (typeof window !== "undefined") {
  console.log("%c[API Config] Dynamic Base URL Discovery:", "color: #ff00ff; font-weight: bold; background: #330033; padding: 2px 6px; border-radius: 4px;");
  console.log("  - Resolved BASE:", API_BASE_URL || "(relative)");
  console.log("  - Window Origin:", window.location.origin);
  console.log("  - Document Base:", document.baseURI);
  console.log("  - Env VITE_API_URL:", import.meta.env.VITE_API_URL || "not set");
  console.log("  - Env VITE_BACKEND_PORT:", import.meta.env.VITE_BACKEND_PORT || "not set");
}

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

