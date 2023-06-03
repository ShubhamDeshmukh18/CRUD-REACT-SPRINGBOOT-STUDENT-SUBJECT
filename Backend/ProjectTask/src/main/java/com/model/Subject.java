package com.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Subject {

	 @Id
	    @GeneratedValue
	    private Long id;
	    private String name;
	    private String code;
	    private String type;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
	    
}
