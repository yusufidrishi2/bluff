package com.bluffgame.bluff.api;

import com.bluffgame.bluff.model.PlayerProfile;
import com.bluffgame.bluff.service.PlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins="*")
@RequestMapping("api/v1/person")
@Controller
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/health")
    @ResponseBody
    public String health() {
        return "Health is ok!";
    }

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }
    
    @PostMapping
    @ResponseBody
    public PlayerProfile addPlayer(@RequestBody PlayerProfile person) {
        return this.playerService.addPlayer(person);
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public PlayerProfile getPlayer(@PathVariable("id") String id) {
        return this.playerService.getPlayer(id);
    }
}
