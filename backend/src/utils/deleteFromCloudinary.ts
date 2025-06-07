import cloudinary from '../config/cloudinaryConifg';

const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
  }
};

export default deleteFromCloudinary;
