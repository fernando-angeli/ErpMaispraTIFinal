package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.login.LoginRequest;
import com.erp.maisPraTi.dto.login.LoginResponse;
import com.erp.maisPraTi.security.JwtTokenProvider;
import com.erp.maisPraTi.service.exceptions.AuthenticationUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest request){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            LoginResponse response = new LoginResponse();
            String token = jwtTokenProvider.generateToken(authentication);
            response.setToken(token);
            return response;
        } catch (AuthenticationUserException error) {
            throw new AuthenticationUserException("Credenciais inválidas.");
        }
    }

}
