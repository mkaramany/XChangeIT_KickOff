package com.projectx.xchangeit.model;

public enum ItemCategoryEnum {
	
	SPORTS_EQUIPMENT("SPORTS_EQUIPMENT"), 
	ACTIVITY_EQUIPMENT("ACTIVITY_EQUIPMENT"), 
	HANDYMAN_TOOLS("HANDYMAN_TOOLS");
	
	 public final String label;

    private ItemCategoryEnum(String label) {
        this.label = label;
    }
    
    
    public static ItemCategoryEnum valueOfLabel(String label) {
        for (ItemCategoryEnum e : values()) {
            if (e.label.equals(label)) {
                return e;
            }
        }
        return null;
    }
}
