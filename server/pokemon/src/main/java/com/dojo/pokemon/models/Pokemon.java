package com.dojo.pokemon.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="Pokemon")
public class Pokemon {
	
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    private String type1;

    private String type2;
    

    private int hp;
    private Long speciesId;

    private int attack;
    

    private int defense;
    

    private int spAttack;
    

    private int spDefense;

    private int speed;
    

    private String move1;
    

    private String move2;
    

    private String move3;
    

    private String move4;
    

	private Long teamId;    
   
    public Pokemon(Long id, @NotEmpty(message = "Pokemon name must be present") String name,
			String type1, String type2,
int hp,int attack,
int defense,
int spAttack,
int spDefense,
 int speed,
 String move1,
 String move2,
 String move3,
 String move4, Team team, Date createdAt,
			Date updatedAt, Long teamId, Long speciesId) {
		super();
		this.id = id;
		this.name = name;
		this.type1 = type1;
		this.type2 = type2;
		this.hp = hp;
		this.attack = attack;
		this.defense = defense;
		this.spAttack = spAttack;
		this.spDefense = spDefense;
		this.speed = speed;
		this.move1 = move1;
		this.move2 = move2;
		this.move3 = move3;
		this.move4 = move4;
		this.teamId = teamId;
		this.setSpeciesId(speciesId);
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
	public String getType1() {
		return type1;
	}
	public void setType1(String type1) {
		this.type1 = type1;
	}
	public String getType2() {
		return type2;
	}
	public void setType2(String type2) {
		this.type2 = type2;
	}
	public int getHp() {
		return hp;
	}
	public void setHp(int hp) {
		this.hp = hp;
	}
	public int getAttack() {
		return attack;
	}
	public void setAttack(int attack) {
		this.attack = attack;
	}
	public int getDefense() {
		return defense;
	}
	public void setDefense(int defense) {
		this.defense = defense;
	}
	public int getSpAttack() {
		return spAttack;
	}
	public void setSpAttack(int spAttack) {
		this.spAttack = spAttack;
	}
	public int getSpDefense() {
		return spDefense;
	}
	public void setSpDefense(int spDefense) {
		this.spDefense = spDefense;
	}
	public int getSpeed() {
		return speed;
	}
	public void setSpeed(int speed) {
		this.speed = speed;
	}
	public String getMove1() {
		return move1;
	}
	public void setMove1(String move1) {
		this.move1 = move1;
	}
	public String getMove2() {
		return move2;
	}
	public void setMove2(String move2) {
		this.move2 = move2;
	}
	public String getMove3() {
		return move3;
	}
	public void setMove3(String move3) {
		this.move3 = move3;
	}
	public String getMove4() {
		return move4;
	}
	public void setMove4(String move4) {
		this.move4 = move4;
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

    public Pokemon() {
    	
    }
	public Long getTeamId() {
		return teamId;
	}
	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}
	public Long getSpeciesId() {
		return speciesId;
	}
	public void setSpeciesId(Long speciesId) {
		this.speciesId = speciesId;
	}
}