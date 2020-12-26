package com.projectx.xchangeit.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Role {

	@Id
	private int id;

	@Column(name = "role_name")
	private String roleName;

	@Column(name = "role_code")
	private String roleCode;

	public Role() {
	}

	public int getRoleId() {
		return this.id;
	}

	public void setRoleId(int id) {
		this.id = id;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	
}
