package com.dojo.pokemon.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dojo.pokemon.models.Move;

@Repository
public interface MoveRepository extends CrudRepository<Move, Long> {
	
	public List<Move> findByName(String name);
}