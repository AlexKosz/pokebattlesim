package com.dojo.pokemon.services;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.dojo.pokemon.models.Move;
import com.dojo.pokemon.models.Pokemon;
import com.dojo.pokemon.models.Team;
import com.dojo.pokemon.repositories.MoveRepository;
import com.dojo.pokemon.repositories.PokemonRepository;
import com.dojo.pokemon.repositories.TeamRepository;


@Service
public class MainService {
	private PokemonRepository pokemonRepo;
	private TeamRepository teamRepo;
	private MoveRepository moveRepo;
	
	public MainService(PokemonRepository pokemonRepo, TeamRepository teamRepo, MoveRepository moveRepo) {
		this.pokemonRepo = pokemonRepo;
		this.moveRepo = moveRepo;
		this.teamRepo = teamRepo;
	}
	
	public ArrayList<Pokemon> getAllPokemon() {
		return (ArrayList<Pokemon>) pokemonRepo.findAll();
	}
	
	public ArrayList<Team> getAllTeams() {
		return (ArrayList<Team>) teamRepo.findAll();
	}
	
	public ArrayList<Move> getAllMoves() {
		return (ArrayList<Move>) moveRepo.findAll();
	}
	
	public Pokemon createPokemon(Pokemon newPokemon) {
		return pokemonRepo.save(newPokemon);
	}
	
	public Move addMove(Move newMove) {
		return moveRepo.save(newMove);
	}
	
	public Team createTeam(Team newTeam) {
		return teamRepo.save(newTeam);
	}
}