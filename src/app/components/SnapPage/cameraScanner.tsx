import React, {useState, useRef, useEffect} from "react";

interface ICapturedPicture {
    onImageCaptured: (file: File) => void;
}

const CameraScanner: React.FC<ICapturedPicture> = ({onImageCaptured}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [stream, setStream] = useState<MediaStream | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let activeMediaStream: MediaStream | null = null;
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 640 }, 
                        height: { ideal: 480 },
                        facingMode: "environment"
                    }
                });

                if(videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    setStream(mediaStream);
                    activeMediaStream = mediaStream
                    setError(null)
                    console.log("Camera started successfully."); 
                }
            } catch (err: unknown) {
                console.error("Error accessing camera:", err);
                setError("Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.");
                setStream(null);
                activeMediaStream = null;
            }
        }

        startCamera();

        return () => {
            if(activeMediaStream){
                activeMediaStream.getTracks().forEach(track => track.stop());
                console.log("Camera stream stopped.");
            }

            else {
                console.log("Cleanup ran, but no active stream to stop (stream was null or not yet set)."); // Untuk debugging lebih lanjut
            }
        };
    }, [])

    const handleVideoCanPlay = () => {
        if(videoRef.current && videoRef.current.srcObject){
            videoRef.current.play().catch(playError => {
                if(playError.name == "AbortError"){
                    console.warn("Video playback aborted on retry, possibly rapid unmount/remount.")
                } else {
                    console.error("Error playing video on canplaythrough:", playError);
                    setError("Gagal memutar video kamera. Coba lagi.");
                }
            })
        }
    }

    const handleCapture = () => {
        if(videoRef.current && canvasRef.current){
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth / 2;
            canvas.height = video.videoHeight / 2;

            const context = canvas.getContext("2d");

            if(context){
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    if(blob){
                        const capturedImage = new File([blob], 'captured-skin.png', {type: 'image/png'});
                        onImageCaptured(capturedImage);
                    }
                }, 'image/png');
            }
        }
    };

    if(error){
        return <div className="p-4 text-red-600 bg-red-100 rounded-md text-center">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center p-6 border-2 border-gray-300 rounded-lg bg-gray-50 relative">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Ambil Foto Langsung</h3>
            <video 
                ref={videoRef} 
                className="rounded-md shadow-md border border-gray-200" 
                autoPlay 
                muted 
                playsInline
                onLoadedMetadata={handleVideoCanPlay}
            ></video>
            
            <div className="border-6 border-[#83256e] flex rounded-full justify-center items-center mt-4 absolute bottom-10">
                <button
                onClick={handleCapture}
                disabled={!stream}
                className={`p-[18px] md:p-6 rounded-full border-4 border-white shadow-md active:bg-[#ad2f91] transition duration-300 ease-in-out ${
                stream ? 'bg-[#83256e] hover:bg-[#ad2f91]' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                ></button>
            </div>
            
            <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
    )
}

export default CameraScanner;