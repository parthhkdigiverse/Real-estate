const isServer = typeof window === "undefined";
export const API_BASE_URL = isServer ? (process.env.VITE_PROXY_TARGET || "http://localhost:8000") : "";

export const getApiUrl = (path: string) => `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

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

export async function fetchAssets() {
  const res = await fetch(getApiUrl("/api/assets/"));
  if (!res.ok) throw new Error("Failed to fetch assets");
  return res.json();
}

