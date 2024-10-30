package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.auth.ForgotPasswordRequest;
import com.erp.maisPraTi.dto.auth.LoginRequest;
import com.erp.maisPraTi.dto.auth.LoginResponse;
import com.erp.maisPraTi.dto.auth.ResetPasswordRequest;
import com.erp.maisPraTi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request){
        service.requestPasswordReset(request.getEmail());
        return ResponseEntity.ok("Link de recuperação enviado para o e-mail.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody ResetPasswordRequest request){
        service.resetPassword(token, request.getNewPassword());
        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }

}
