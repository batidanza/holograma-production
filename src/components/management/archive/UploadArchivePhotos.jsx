import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { uploadArchivePhoto, fetchArchive } from "../../../services/ArchiveAPI";
import "../FormManagementStyles.css";
import CustomDropdown from "../FormComponents/CustomDropDown.jsx";
import CustomTextInput from "../FormComponents/CustomTextInput.jsx";
import LoadingSketch from "../../layout/Loading/LoadingSketch.jsx";

const UploadArchivePhotos = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      selectedFiles: [],
      selectedCollection: "",
      archiveName: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const selectedFiles = watch("selectedFiles");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await fetchArchive();
        setCollections(data || []);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  const handlePhotoUpload = async (data) => {
    setIsLoading(true);
    try {
      if (!data.selectedFiles.length || !data.selectedCollection) {
        console.error("Missing files or collection selection");
        return;
      }

      for (const file of data.selectedFiles) {
        const formData = new FormData();
        formData.append("Image", file);
        formData.append("CollectionID", data.selectedCollection);
        formData.append("ArchiveName", data.archiveName);
        
        const response = await uploadArchivePhoto(formData);
        if (!response.success) {
          console.error("Error uploading media:", response.error);
        }
      }
      alert("Media uploaded successfully");
      setValue("selectedFiles", []);
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Error uploading media");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("selectedFiles", files);
  };

  return (
    <div className="form-view-container">
      <div className="my-container-form">
        {isLoading && <LoadingSketch />}
        <h3 className="form-title">UPLOAD ARCHIVE PHOTOS</h3>
        <form onSubmit={handleSubmit(handlePhotoUpload)} className="my-form-form">
          <div className="my-form-group-form">
            <label className="my-label-form">ARCHIVE ID</label>
            <Controller
              name="selectedCollection"
              control={control}
              render={({ field }) => (
                <CustomDropdown
                  options={collections.map((col) => ({ value: col.ID, label: col.Name }))}
                  {...field}
                />
              )}
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form">ARCHIVE NAME</label>
            <Controller
              name="archiveName"
              control={control}
              render={({ field }) => <CustomTextInput {...field} placeholder="ARCHIVE NAME" />}
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form">IMAGES</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            <div className="drop-zone" onClick={() => document.querySelector('input[type="file"]').click()}>
              {selectedFiles.length ? (
                <div className="preview-images">
                  {selectedFiles.map((file, index) => (
                    <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} width="100" />
                  ))}
                </div>
              ) : (
                <p>Drop images or click to select them</p>
              )}
            </div>
          </div>
          <button type="submit" className="my-button-form">UPLOAD</button>
        </form>
      </div>
    </div>
  );
};

export default UploadArchivePhotos;
