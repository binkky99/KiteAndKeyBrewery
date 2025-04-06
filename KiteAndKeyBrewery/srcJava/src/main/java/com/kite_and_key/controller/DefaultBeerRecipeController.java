package com.kite_and_key.controller;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kite_and_key.dtos.BeerRecipeDTO;
import com.kite_and_key.dtos.DefaultUnitsDTO;

@RestController
@RequestMapping("/resources")
public class DefaultBeerRecipeController {

    private final ObjectMapper objectMapper;

    public DefaultBeerRecipeController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @GetMapping("/default-recipe-properties")
    public BeerRecipeDTO getDefaultProduct() throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/static/default-recipe-properties.json");
        BeerRecipeDTO defaultProductDTO = objectMapper.readValue(inputStream, BeerRecipeDTO.class);
        return defaultProductDTO;
    }

    @GetMapping("/default-unites")
    public DefaultUnitsDTO getDefaultUnits() throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/static/default-units.json");
        DefaultUnitsDTO defaultProductDTO = objectMapper.readValue(inputStream, DefaultUnitsDTO.class);
        return defaultProductDTO; 
    }
}
