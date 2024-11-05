package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.auth.LoginRequest;
import com.erp.maisPraTi.dto.auth.LoginResponse;
import com.erp.maisPraTi.dto.auth.ResetPasswordRequest;
import com.erp.maisPraTi.dto.auth.ValidationUserRequest;
import com.erp.maisPraTi.fixture.LoginFixture;
import com.erp.maisPraTi.fixture.UserFixture;
import com.erp.maisPraTi.model.User;
import com.erp.maisPraTi.repository.UserRepository;
import com.erp.maisPraTi.security.JwtTokenProvider;
import com.erp.maisPraTi.service.exceptions.AuthenticationUserException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void mustReturnLoginResponseWhenGivenValidLoginRequest(){
        //Arrange
        LoginRequest request = LoginFixture.loginRequest();

        Authentication authentication = mock(Authentication.class);
        String expectedToken = "fake_jwt_token";

        // Definir o comportamento do mock
        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())))
                .thenReturn(authentication);
        when(jwtTokenProvider.generateToken(authentication)).thenReturn(expectedToken);

        //Action
        LoginResponse response = authService.login(request);

        //Assert
        assertNotNull(response);
        assertEquals(expectedToken, response.getToken());
    }

    @Test
    void mustThrowExceptionWhenGivenAnInvalidUser(){
        //Arrange
        LoginRequest request = LoginFixture.loginRequest();

        // Definir o comportamento do mock
        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())))
                .thenThrow(new AuthenticationUserException("Credenciais inválidas."));

        // Action
        AuthenticationUserException exception = assertThrows(AuthenticationUserException.class, () -> {
            authService.login(request);
        });

        // Assert
        assertEquals("Credenciais inválidas.", exception.getMessage());
    }

    @Test
    void mustSendAPasswordRecoveryEmailIfTheUserExists(){
        // Arrange
        User user = UserFixture.userAdmin();
        String email = user.getEmail();
        String token = "fake_token";

        // Definir o comportamento do mock
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(jwtTokenProvider.generateTokenWithUserEmail(email)).thenReturn(token);

        // Action
        authService.requestPasswordReset(email);

        // Assert
        verify(emailService).sendPasswordResetEmail(email, token);
    }

    @Test
    void mustThrowExceptionWhenGivenAnInvalidUserInPasswordRecovery(){
        // Arrange
        String email = "invalid@email.com";

        // Definir o comportamento do mock
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Action
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            authService.requestPasswordReset(email);
        });

        // Assert
        assertEquals("Usuário não encontrado.", exception.getMessage());
    }

    @Test
    void mustReturnTrueWhenCpfIsCorrectForUserSearchedByEmail(){
        // Arrange
        User user = UserFixture.userAdmin();
        String email = user.getEmail();
        String cpf = user.getCpf();
        ValidationUserRequest request = new ValidationUserRequest(email, cpf);
        String token = "fake_token";

        // Comportamento do Mock
        when(jwtTokenProvider.getUserEmailFromToken(token)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Action
        authService.validateUser(token, request);

        // Assert
        assertTrue(authService.validateUser(token, request));
    }

    @Test
    void mustThrowExceptionWhenTryingToValidateUserAndItIsNotFound(){
        // Arrange
        User user = UserFixture.userAdmin();
        String email = "invalid-email@email.com";
        String cpf = user.getCpf();
        ValidationUserRequest request = new ValidationUserRequest(email, cpf);
        String token = "fake_token";

        // Comportamento do Mock
        when(jwtTokenProvider.getUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        // Action
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            authService.validateUser(token, request);
        });

        // Assert
        assertEquals("Usuário não encontrado.", exception.getMessage());
    }

    @Test
    void mustsThrowExceptionWhenTryingToValidateUserAndCpfIsNotCorrect(){
        // Arrange
        User user = UserFixture.userAdmin();
        String email = user.getEmail();
        String cpf = "invalid-cpf";
        ValidationUserRequest request = new ValidationUserRequest(email, cpf);
        String token = "fake_token";

        // Comportamento do Mock
        when(jwtTokenProvider.getUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Action
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            authService.validateUser(token, request);
        });

        // Assert
        assertEquals("CPF inválido.", exception.getMessage());
    }

    @Test
    void mustChangePasswordWhenUserIsFound(){
        // Arrange
        User user = UserFixture.userAdmin();
        String email = user.getEmail();
        String newPassword = "novasenha";
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setNewPassword(newPassword);
        String token = "fake_token";

        // Comportamento do Mock
        when(jwtTokenProvider.getUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Action
        authService.resetPassword(token, request);

        // Assert
        verify(passwordEncoder).encode(newPassword);
        verify(userRepository).save(user);
    }

    // refatorar
    @Test
    void mustThrowExceptionWhenTryingToChangePasswordAndUserDoesNotExist(){
        // Arrange
        User user = UserFixture.userAdmin();
        String email = "invalid-email@email.com";
        String newPassword = "novasenha";
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setNewPassword(newPassword);
        String token = "fake_token";

        // Comportamento do Mock
        when(jwtTokenProvider.getUserEmailFromToken(token)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Action
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            authService.resetPassword(token, request);
        });

        // Assert
        assertEquals("Usuário não encontrado.", exception.getMessage());
    }

}
