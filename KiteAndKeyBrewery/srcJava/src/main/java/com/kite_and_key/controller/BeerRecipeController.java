package com.kite_and_key.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kite_and_key.dtos.BeerRecipeDTO;
import com.kite_and_key.models.BeerRecipe;
import com.kite_and_key.repository.BeerRecipeRepository;

@RestController
@RequestMapping("/recipes")
class BeerRecipeController {
    private final BeerRecipeRepository repository;

    public BeerRecipeController(BeerRecipeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<BeerRecipe> getAllRecipes() {
        return repository.findAll();
    }

    @PostMapping
    public BeerRecipe addRecipe(@RequestBody BeerRecipe recipe) {
        return repository.save(recipe);
    }

    @GetMapping("/{id}")
    public BeerRecipe getRecipe(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @PutMapping("/{id}")
    public BeerRecipe updateRecipe(@PathVariable Long id, @RequestBody BeerRecipeDTO newRecipe) {
        return repository.findById(id)
                .map(recipe -> {
                    recipe.setName(newRecipe.name());
                    recipe.setBoilingTemp(newRecipe.boilingTemp());
                    recipe.setFirstRest(newRecipe.firstRest());
                    recipe.setGrainTemp(newRecipe.grainTemp());
                    recipe.setGrainTemp(newRecipe.grainTemp());
                    return repository.save(recipe);
                })
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        repository.deleteById(id);
    }
}