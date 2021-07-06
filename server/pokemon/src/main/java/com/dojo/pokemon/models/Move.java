package com.dojo.pokemon.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;


@Entity
@Table(name="Move")
public class Move {
	
    @Id
    private Long id;
    

    private String name;
    
    private int accuracy;
    

    private String damage_class;
    
    private int power;
    

    private int pp;
    

    private int priority;
    
    private String type;
    
   
    @Column(updatable=false)
    private Date createdAt;
    private Date updatedAt;
    
	
	
    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }

    public Move() {
    	
    }
	public Move(Long id,  String name, int accuracy,
			String damage_class, int power,
			int pp,
			int priority,
			String type, Date createdAt, Date updatedAt) {
		super();
		this.id = id;
		this.name = name;
		this.accuracy = accuracy;
		this.damage_class = damage_class;
		this.power = power;
		this.pp = pp;
		this.priority = priority;
		this.type = type;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
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
	public int getAccuracy() {
		return accuracy;
	}
	public void setAccuracy(int accuracy) {
		this.accuracy = accuracy;
	}
	public String getDamage_class() {
		return damage_class;
	}
	public void setDamage_class(String damage_class) {
		this.damage_class = damage_class;
	}
	public int getPower() {
		return power;
	}
	public void setPower(int power) {
		this.power = power;
	}
	public int getPp() {
		return pp;
	}
	public void setPp(int pp) {
		this.pp = pp;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}


	


    

    
}
