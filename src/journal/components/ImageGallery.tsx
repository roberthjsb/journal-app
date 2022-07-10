import { ImageList, ImageListItem } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const ImageGallery:FC<{images:string[]}> = ({images }:{images:string[]}) => {
  return (
    <ImageList sx={{ width: '100%', height: 400 }} cols={3} rowHeight={200}>
      {images.map((image,idx) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={`Imagen ${idx+1} de la nota`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

