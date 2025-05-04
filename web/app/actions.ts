"use server"

export async function uploadCSV(formData: FormData) {
  try {
    const file = formData.get("csv") as File

    if (!file) {
      throw new Error("No file provided")
    }

    // Create a new fetch request
    const response = await fetch("http://localhost:8081/read-csv", {
      method: "POST",
      // Don't set Content-Type to let the browser set it with the boundary parameter
      body: formData, // Use the original formData with the correct field name
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`API error ${response.status}: ${errorText}`)
    }

    // Parse the response
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error uploading CSV:", error)
    throw error
  }
}
