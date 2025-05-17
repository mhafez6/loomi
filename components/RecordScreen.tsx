"use client";
import { ICONS } from "@/constants";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { authClient } from "@/lib/auth-cleint";

const RecordScreen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session } = authClient.useSession();

  const handleAuthCheck = () => {
    if (!session?.user) {
      router.push('/sign-in');
      return;
    }
    setIsOpen(true);
  };

  const goToUpload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);

    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      })
    );

    router.push(`/upload`);
    closeModal();
  };

  const {
    isRecording,
    recordedBlob,
    recordingDuration,
    recordedVideoUrl,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording();

  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    await startRecording();
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();

    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  };

  return (
    <div className="record">
      <button className="primary-btn" onClick={handleAuthCheck}>
        <Image src={ICONS.record} alt="record" width={16} height={16} />
        <span>Record a video</span>
      </button>

      {isOpen && session?.user && (
        <section className="dialog">
          <div className="overlay-record" onClick={closeModal} />
          <div className="dialog-content">
            <figure>
              <h3>Screen Recording</h3>
              <button>
                <Image
                  src={ICONS.close}
                  alt="close"
                  width={20}
                  height={20}
                  onClick={closeModal}
                />
              </button>
            </figure>

            <section>
              {isRecording ? (
                <article>
                  <div />
                  <span>Recording in progress</span>
                </article>
              ) : recordedVideoUrl ? (
                <video src={recordedVideoUrl} ref={videoRef} controls />
              ) : (
                <p>Click record to start capturing your screen</p>
              )}
            </section>

            <div className="record-box">
              {!isRecording && !recordedVideoUrl && (
                <button onClick={handleStart} className="record-start">
                  <Image
                    src={ICONS.record}
                    alt="record"
                    width={16}
                    height={16}
                  />
                </button>
              )}
              {isRecording && (
                <button onClick={stopRecording} className="record-stop">
                  <Image
                    src={ICONS.record}
                    alt="stop record"
                    width={16}
                    height={16}
                  />
                  Stop Recording
                </button>
              )}
              {recordedVideoUrl && (
                <>
                  <button onClick={recordAgain} className="record-again">
                    Record Again
                  </button>
                  <button onClick={goToUpload} className="record-upload">
                    <Image
                      src={ICONS.upload}
                      alt="upload"
                      width={16}
                      height={16}
                    />
                    Continue to upload
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RecordScreen;
