"use client";

import { IKUpload } from "imagekitio-next";
import { useRef } from "react";

import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import ImgUploaderBlock from "../ui/ImgUploaderBlock";

type Props = {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTrackProgress: React.Dispatch<React.SetStateAction<number>>;
  trackProgress: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImgUploader = ({
  setUrl,
  setTrackProgress,
  trackProgress,
  setLoading,
}: Props) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/img-upload-auth", {
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error}`);
    }
  };

  return (
    <>
      <IKUpload
        ref={ikUploadRef}
        onUploadProgress={(progress) => {
          console.log(progress);
          setLoading(false);
          const percentage = Math.round(
            (progress.loaded / progress.total) * 100
          );
          setTrackProgress(percentage);
        }}
        validateFile={(file) => {
          if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed");
            return false;
          }
          if (file.size > 1024 * 1024 * 10) {
            toast.error("File size should be less then 100MB");

            return false;
          }
          return true;
        }}
        onSuccess={(res) => {
          setUrl(res.url);
          setLoading(false);
          console.log(res.url);
        }}
        onError={(err) => {
          console.log(err.message);
        }}
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
        authenticator={authenticator}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => ikUploadRef.current?.click()}
        className="flex items-center justify-center w-full"
      >
        <ImgUploaderBlock />
      </button>

      {trackProgress ? <Progress value={trackProgress} /> : null}
    </>
  );
};

export default ImgUploader;
