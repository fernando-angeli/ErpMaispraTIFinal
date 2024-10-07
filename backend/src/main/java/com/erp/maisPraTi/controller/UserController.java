package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.UserDto;
import com.erp.maisPraTi.dto.UserUpdateDto;
import com.erp.maisPraTi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> insert(@RequestBody UserDto userDto){
        UserDto newUserDto = userService.insert(userDto);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newUserDto.getId())
                .toUri();
        return ResponseEntity.created(uri).body(newUserDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<UserDto>> findById(@PathVariable Long id){
        return ResponseEntity.ok().body(userService.findById(id));
    }

    @GetMapping
    public ResponseEntity<Page<UserDto>> findAll(Pageable pageable){
        Page<UserDto> users = userService.findAll(pageable);
        return ResponseEntity.ok().body(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id, @RequestBody UserUpdateDto userUpdateDto){
        UserDto userUpdatedDto = userService.update(id, userUpdateDto);
        return ResponseEntity.ok().body(userUpdatedDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
