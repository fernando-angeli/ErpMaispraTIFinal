package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.RoleDto;
import com.erp.maisPraTi.dto.RoleUpdateDto;
import com.erp.maisPraTi.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping(value = "/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<RoleDto> insert (@Valid @RequestBody RoleDto roleDto){
        RoleDto newRoleDto = roleService.insert(roleDto);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newRoleDto.getId())
                .toUri();
        return ResponseEntity.created(uri).body(newRoleDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<RoleDto>> findById(@PathVariable Long id){
        Optional<RoleDto> roleDto = roleService.findById(id);
        return ResponseEntity.ok().body(roleDto);
    }

    @GetMapping
    public ResponseEntity<Page<RoleDto>> findAll(Pageable pageable){
        Page<RoleDto> roles = roleService.findAll(pageable);
        return ResponseEntity.ok().body(roles);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDto> update(@PathVariable Long id, @RequestBody RoleUpdateDto roleUpdateDto){
        RoleDto roleUpdatedDto = roleService.update(id, roleUpdateDto);
        return ResponseEntity.ok().body(roleUpdatedDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        roleService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
