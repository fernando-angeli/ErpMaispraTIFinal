package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.auth.LoginRequest;
import com.erp.maisPraTi.dto.auth.LoginResponse;
import com.erp.maisPraTi.model.User;
import com.erp.maisPraTi.repository.UserRepository;
import com.erp.maisPraTi.security.JwtTokenProvider;
import com.erp.maisPraTi.service.exceptions.AuthenticationUserException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;

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

    public void requestPasswordReset(String email){
        User user = userRepository.findByEmail(email);
        if(user == null)
            throw  new ResourceNotFoundException("Usuário não encontrado.");
        String token = jwtTokenProvider.generateTokenWithUserId(user.getId());
        emailService.sendPasswordResetEmail(user.getEmail(), token);
    }

    public void resetPassword(String token, String newPassword){
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
