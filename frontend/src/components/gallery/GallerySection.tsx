// import { getGalleryImages } from "@/features/gallery/api";
import GalleryPage from "@/components/gallery/GalleryPage";
import { getActiveGalleryHeroContent, getGalleryPhotos } from "@/features/marketing/gallery/api";



export default async function GalleryRoute() {

    const [galleryHeroContent, galleryImages] = await Promise.all([
      getActiveGalleryHeroContent(),
      getGalleryPhotos(),
    ]);
    

  return <GalleryPage images={galleryImages} heroContent={galleryHeroContent}/>;
}