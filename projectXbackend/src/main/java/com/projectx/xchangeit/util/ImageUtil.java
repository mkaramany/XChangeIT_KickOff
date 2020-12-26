package com.projectx.xchangeit.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;

import javax.imageio.ImageIO;

public class ImageUtil {

	public static BufferedImage createImageFromBytes(byte[] imageData) {
		ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
		try {
			return ImageIO.read(bais);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static byte[] createBytesFromImage(BufferedImage image, String fileType) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			ImageIO.write(image, fileType, baos);
		} catch (IOException e) {
			e.printStackTrace();
		}
		byte[] bytes = baos.toByteArray();
		return bytes;
	}

	public static byte[] createThumbnail(byte[] imageData, String fileType) {
		final int imageSize = 300;
		BufferedImage img2 = null;

		BufferedImage sourceImage = createImageFromBytes(imageData);
		float width = sourceImage.getWidth();
		float height = sourceImage.getHeight();

		if (width > height) {
			float scaledWidth = (width / height) * (float) imageSize;
			float scaledHeight = imageSize;

			BufferedImage img = new BufferedImage((int) scaledWidth, (int) scaledHeight, sourceImage.getType());
			Image scaledImage = sourceImage.getScaledInstance((int) scaledWidth, (int) scaledHeight,
					Image.SCALE_SMOOTH);
			img.createGraphics().drawImage(scaledImage, 0, 0, null);

			int offset = (int) ((scaledWidth - scaledHeight) / 2f);
			img2 = img.getSubimage(offset, 0, imageSize, imageSize);
		} else if (width < height) {
			float scaledWidth = imageSize;
			float scaledHeight = (height / width) * (float) imageSize;

			BufferedImage img = new BufferedImage((int) scaledWidth, (int) scaledHeight, sourceImage.getType());
			Image scaledImage = sourceImage.getScaledInstance((int) scaledWidth, (int) scaledHeight,
					Image.SCALE_SMOOTH);
			img.createGraphics().drawImage(scaledImage, 0, 0, null);

			int offset = (int) ((scaledHeight - scaledWidth) / 2f);
			img2 = img.getSubimage(0, offset, imageSize, imageSize);
		} else {
			img2 = new BufferedImage(imageSize, imageSize, sourceImage.getType());
			Image scaledImage = sourceImage.getScaledInstance(imageSize, imageSize, Image.SCALE_SMOOTH);
			img2.createGraphics().drawImage(scaledImage, 0, 0, null);
		}
		return createBytesFromImage(img2, fileType);
	}
	
	public static String getFileType(byte[] imageByteArray) { 

	    InputStream is = new ByteArrayInputStream(imageByteArray);

	    //Find out image type
	    String mimeType = null;
	    String fileExtension = null;
	    try {
	        mimeType = URLConnection.guessContentTypeFromStream(is);
	        String delimiter="[/]";
	        String[] tokens = mimeType.split(delimiter);
	        fileExtension = tokens[1];
	    } catch (IOException ioException){

	    }
	    
	    return fileExtension;
	}

}
