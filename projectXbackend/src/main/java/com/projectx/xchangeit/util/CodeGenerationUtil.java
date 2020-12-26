package com.projectx.xchangeit.util;

import java.util.Random;

public class CodeGenerationUtil {

	public static String generateSixDigitCode() {
		Random random = new Random();
		String code = "";
		for (int i = 0; i <= 5; i++) {
			Integer num = random.nextInt(9);
			code = code + num;

		}
		return code;
	}
	

}
