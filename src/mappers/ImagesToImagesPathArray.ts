import Images from "@/types/Images";

export default function ImagesToImagesPathArray(images: Array<Images>): Array<string>{
  const array: Array<string> = []
  if(images){
    images.forEach(image => {
      array.push(image.path)
  })
  }
  return array
}