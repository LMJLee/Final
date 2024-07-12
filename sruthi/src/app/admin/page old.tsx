"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function AdminPage() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const fileRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
        });
      }
    );
  };

  const handleDownload = () => {
    if (downloadURL) {
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = file?.name || "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Upload file to storage</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Upload
      </button>
      {uploadProgress > 0 && (
        <progress value={uploadProgress} max="100" className="mt-2" />
      )}
      {downloadURL && (
        <div className="mt-4">
          <p>File uploaded successfully!</p>
          <a
            href={downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Download URL
          </a>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
