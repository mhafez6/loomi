"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visiblity: "public",
  });

  const video = {};
  const thumbnail = {};

  const [error, setError] = useState(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}

      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
        <FormField
          id="title"
          label="Title"
          value={formData.title}
          placeholder="Enter a title"
          onChange={handleInputChange}
        />
        <FormField
          id="Description"
          label="Description"
          value={formData.description}
          placeholder="Describe your video"
          as="textarea"
          onChange={handleInputChange}
        />


        <FileInput 
          id="video" 
          label="Video" 
          accept="video/*" 
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type='video'

        />
        <FileInput 
          id="thumbnail" 
          label="Thumbnail" 
          accept="image/*" 
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type='image'

        />

        


        <FormField
          id="Visibility"
          label="Visibility"
          value={formData.visiblity}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default Page;
