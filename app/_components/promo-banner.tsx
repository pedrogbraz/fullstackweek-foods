import Image from "next/image";

interface PromoBannerProps {
  src: string;
  alt: string;
  height: number;
}

const PromoBanner = (props: PromoBannerProps) => {
  return ( 
      <Image
          src={props.src}
          alt={props.alt}
          width={0} 
          height={props.height}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
   );
}
 
export default PromoBanner;