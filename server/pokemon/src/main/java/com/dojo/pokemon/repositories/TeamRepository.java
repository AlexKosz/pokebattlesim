package com.dojo.pokemon.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dojo.pokemon.models.Team;

@Repository
public interface TeamRepository extends CrudRepository<Team, Long> {

	List<Team> findByVictorious(int i);}