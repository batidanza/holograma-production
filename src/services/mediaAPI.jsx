const fetchMedia = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/media/media`);
      if (!response.ok) {
        throw new Error("Error fetching media");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching media:", error);
      throw error; 
    }
  };
  
  const getMediaByUser = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/media/byUser/${userId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Error fetching media for user with ID ${userId}:`,
        error
      );
      return [];
    }
  };
  
  const uploadMedia = async (formDataWithFile) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/media/upload`, {
        method: "POST",
        body: formDataWithFile,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Media uploaded successfully:", data);
        return { success: true, data };
      } else {
        console.error("Error uploading media");
        return { success: false, error: "Error uploading media" };
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      return { success: false, error: "Error uploading media" };
    }
  };
  
  export { fetchMedia, uploadMedia, getMediaByUser };
  