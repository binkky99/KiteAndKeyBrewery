package com.kite_and_key.dtos;

public record BeerRecipeDTO(Long id, String name, Float boilingTemp, Float firstRest, Float grainTemp, Float grainWeight, Float waterRatio) {}
