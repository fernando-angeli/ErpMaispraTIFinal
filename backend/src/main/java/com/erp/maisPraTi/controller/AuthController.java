package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.login.LoginRequest;
import com.erp.maisPraTi.dto.login.LoginResponse;
import com.erp.maisPraTi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody LoginRequest request){
        LoginResponse response = service.login(request);
        return ResponseEntity.ok().body(response.getToken());
    }

}
