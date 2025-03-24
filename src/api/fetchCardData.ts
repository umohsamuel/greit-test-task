import { ApiResponse } from "../types";

export async function fetchCardData({
  pageSize,
  currentPage,
}: {
  pageSize: number;
  currentPage: number;
}): Promise<ApiResponse> {
  const response = await fetch(
    `https://crm.server.pro-part.es/api/v1/secondary-projects/integration/projects?accessKey=A7gjfjj0WdBynt8d&secretKey=tGH5UlZcgNtAPrfq9MnmMhWji9j5vYXn&isPagination=true&size=${pageSize}&page=${currentPage}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse;

  return data;
}
