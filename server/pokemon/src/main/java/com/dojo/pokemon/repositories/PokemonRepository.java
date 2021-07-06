package com.dojo.pokemon.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import com.dojo.pokemon.models.Pokemon;

@Repository
public interface PokemonRepository extends CrudRepository<Pokemon, Long> {

	List<Pokemon> findByTeamId(Long team);}