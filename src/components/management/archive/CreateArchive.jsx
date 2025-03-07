import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { createArchive, fetchArchive } from "../../../services/ArchiveAPI";
import "../FormManagementStyles.css";
import LoadingSketch from "../../layout/Loading/LoadingSketch";
import CustomTextInput from "../FormComponents/CustomTextInput";

const CreateArchive = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      Name: "",
      Description: "",
      Image: null,
      preview: null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const preview = watch("preview");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await fetchArchive();
        if (data) setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "preview") {
          formDataToSubmit.append(key, value);
        }
      });

      const apiResponse = await createArchive(formDataToSubmit);
      if (apiResponse.success) {
        alert("Collection created");
        const updatedCollections = await fetchArchive();
        if (updatedCollections) setCollections(updatedCollections);
      } else {
        console.error("Error creating collection:", apiResponse.error);
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (files) => {
    const file = files[0];
    if (file) {
      setValue("Image", file);
      setValue("preview", URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setValue("Image", null);
    setValue("preview", null);
  };

  return (
    <div className="form-view-container">
      <div className="my-container-form">
        {isLoading && (
          <div className="loading">
            <LoadingSketch />
          </div>
        )}
        <h3 className="form-title">CREATE ARCHIVE</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="my-form-form">
          <div className="my-form-group-form">
            <label className="my-label-form">NAME</label>
            <Controller
              name="Name"
              control={control}
              render={({ field }) => (
                <CustomTextInput {...field} placeholder="Archive Name" required />
              )}
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form">DESCRIPTION</label>
            <Controller
              name="Description"
              control={control}
              render={({ field }) => (
                <CustomTextInput {...field} placeholder="Archive Description" />
              )}
            />
          </div>
          <div className="my-form-group-form" onDrop={handleDrop} onDragOver={handleDragOver}>
            <label className="my-label-form">IMAGE</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files)}
              style={{ display: "none" }}
            />
            <div
              className="drop-zone"
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              <div className="preview-images" style={{ position: "relative" }}>
                {preview ? (
                  <div style={{ position: "relative", display: "inline-block", margin: "5px" }}>
                    <img src={preview} alt="Preview" style={{ width: "100px", height: "auto" }} />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        background: "rgba(255, 0, 0, 0.8)",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <p>Drop images or click to select them</p>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="my-button-form">CREATE COLLECTION</button>
        </form>
      </div>
    </div>
  );
};

export default CreateArchive;
