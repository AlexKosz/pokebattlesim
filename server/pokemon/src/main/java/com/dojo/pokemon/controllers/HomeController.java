package com.dojo.pokemon.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dojo.pokemon.models.Move;
import com.dojo.pokemon.models.Pokemon;
import com.dojo.pokemon.models.Team;
import com.dojo.pokemon.repositories.MoveRepository;
import com.dojo.pokemon.repositories.PokemonRepository;
import com.dojo.pokemon.repositories.TeamRepository;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class HomeController {

	@Autowired
	private MoveRepository moveRepository;
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private PokemonRepository pokemonRepository;
	
	@GetMapping("/moves")
	public List<Move> getAllMoves(){
		return (List<Move>) moveRepository.findAll();
	}
	
	@GetMapping("/move/{name}")
	public List<Move> getMove(@PathVariable("name") String name){
		return (List<Move>) moveRepository.findByName(name);
	}
	
	
	@GetMapping("/teams/victorious")
	public List<Team> getTeams(){
		wait(500);
		return (List<Team>) teamRepository.findByVictorious(1);
	}
	
	@GetMapping("/team/{team}")
	public List<Pokemon> getTeam(@PathVariable("team") Long team){
		return (List<Pokemon>) pokemonRepository.findByTeamId(team);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/newestTeamPkmn")
	public List<Pokemon> getNewestTeamPkmn(){
		wait(1000);
		List<Team> allTeams = (List<Team>) teamRepository.findAll();
		Long teamID = (long) allTeams.size();
		return (List<Pokemon>) pokemonRepository.findByTeamId(teamID);
	}
	
	
	
	
	
	@GetMapping("/newestTeam")
	public Optional<Team> getNewestTeam(){
		wait(1000);
		List<Team> allTeams = (List<Team>) teamRepository.findAll();
		Long teamID = (long) allTeams.size();
		return teamRepository.findById(teamID);
	}
	
	@GetMapping("/teamInfo/{id}")
	public Optional<Team> getTeamById(@PathVariable("id") Long id){
		return teamRepository.findById(id);
	}
	
	@PostMapping("/addMove")
	public Move addMove(@RequestBody Move move){
		return moveRepository.save(move);
	}
	
	
	@PostMapping("/addTeam")
	public Team addTeam(@RequestBody Team team){
		return teamRepository.save(team);
	}
	
	@PostMapping("/addPokemon")
	public Pokemon addPokemon(@RequestBody Pokemon pokemon){
		wait(1000);
		List<Team> allTeams = (List<Team>) teamRepository.findAll();
		Long teamID = (long) allTeams.size();
		pokemon.setTeamId(teamID);
		pokemonRepository.save(pokemon);
		return pokemon;
	}
	public static void wait(int ms)
	{
	    try
	    {
	        Thread.sleep(ms);
	    }
	    catch(InterruptedException ex)
	    {
	        Thread.currentThread().interrupt();
	    }
	}
}


