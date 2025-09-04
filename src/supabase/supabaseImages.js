import supabase from "./supabaseClient";

export class ImagesService {
  async createImageURL(image, userId) {
    if (image) {
      const fileExt = image.name?.split(".").pop();
      const fileName = `${userId}.${fileExt}`;
      const filePath = `${Date.now()}-${fileName}`;

      const { data: storageData, error: storageError } = await supabase.storage
        .from("images")
        .upload(filePath, image, {
          contentType: image.type,
        });

      if (storageError) throw storageError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      return publicUrl;
    }
  }
}

const imagesService = new ImagesService();
export default imagesService;
