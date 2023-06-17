import type { TrafficCamera } from "../types";

type TrafficImageProps = {
  camera: TrafficCamera;
};

const TrafficImage = ({ camera }: TrafficImageProps) => {
  const { image, image_metadata: metadata } = camera;
  const { width, height, md5 } = metadata;

  return (
    <img
      src={image}
      alt={`Image ${md5}`}
      width={width}
      height={height}
      className="mx-auto rounded-xl shadow-xl hover:shadow-2xl"
    />
  );
};

export default TrafficImage;
