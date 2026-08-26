/**
 * Uploads an image to ImgBB and returns the URL.
 * This should ideally be called from a Server Action or API Route 
 * to keep your API key secure.
 */
export async function uploadImageToImgBB(imageFile: File | Blob | string): Promise<string | null> {
  const apiKey = process.env.IMGBB_API_KEY;
  
  if (!apiKey) {
    console.error("IMGBB_API_KEY is not defined in environment variables.");
    return null;
  }

  const formData = new FormData();
  
  // ImgBB accepts a file, base64 string, or URL
  if (typeof imageFile === "string") {
    formData.append("image", imageFile);
  } else {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url; // The direct URL to the uploaded image
    } else {
      console.error("ImgBB upload error:", data.error.message);
      return null;
    }
  } catch (error) {
    console.error("Network error during ImgBB upload:", error);
    return null;
  }
}
