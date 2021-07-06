package com.dojo.pokemon.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;



import com.dojo.pokemon.models.Team;


@Entity
@Table(name="Team")
public class Team {


	public Team() {
	
	}

	public Team(Long id, int trainerSprite, String name, int victorious) {
		super();
		this.id = id;
		this.trainerSprite = trainerSprite;
		this.name = name;
		this.victorious = victorious;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getTrainerSprite() {
		return trainerSprite;
	}

	public void setTrainerSprite(int trainerSprite) {
		this.trainerSprite = trainerSprite;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getVictorious() {
		return victorious;
	}

	public void setVictorious(int victorious) {
		this.victorious = victorious;
	}

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
	private int victorious;
    private int trainerSprite;

	private String name;
	
}
