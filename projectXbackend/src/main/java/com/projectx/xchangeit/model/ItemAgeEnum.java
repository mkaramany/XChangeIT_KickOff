package com.projectx.xchangeit.model;

public enum ItemAgeEnum {
	LESS_THAN_6_MONTHS("ABOVE_10_YRS"), 
	FROM_6_12_MONTHS("ABOVE_10_YRS"), 
	FROM_1_2_YEARS("ABOVE_10_YRS"), 
	FROM_2_5_YRS("ABOVE_10_YRS"), 
	FROM_5_10_YEARS("ABOVE_10_YRS"), 
	FROM_10_20_YRS("ABOVE_10_YRS"), 
	ABOVE_10_YRS("ABOVE_10_YRS");
	
	 public final String label;

    private ItemAgeEnum(String label) {
        this.label = label;
    }
    
    
    public static ItemAgeEnum valueOfLabel(String label) {
        for (ItemAgeEnum e : values()) {
            if (e.label.equals(label)) {
                return e;
            }
        }
        return null;
    }
    
}
