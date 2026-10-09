import { ImageGallery, type GalleryImage } from "@/registry/ui/animated-image-gallery";

const images: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
    alt: "Glass office tower seen from below against a blue sky",
    caption: "Downtown, looking up",
    width: 1200,
    height: 1800,
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format&fit=crop",
    alt: "Mountain ridges above a sea of clouds at sunrise",
    caption: "Above the clouds",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80&auto=format&fit=crop",
    alt: "Bright living room with a grey sofa and large windows",
    caption: "Morning light",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80&auto=format&fit=crop",
    alt: "Misty green hills with a lone tree",
    width: 1200,
    height: 1500,
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop",
    alt: "Sunlight falling through tall trees in a forest",
    caption: "Forest walk",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop",
    alt: "Lake surrounded by mountains under a clear sky",
    caption: "Still water",
    width: 1200,
    height: 1600,
  },
];

const ImageGalleryDemo = () => {
  return <ImageGallery images={images} columns={3} className="w-full" />;
};

export default ImageGalleryDemo;
