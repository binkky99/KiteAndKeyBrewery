package com.kite_and_key.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kite_and_key.models.BeerRecipe;

public interface BeerRecipeRepository extends JpaRepository<BeerRecipe, Long> {}
