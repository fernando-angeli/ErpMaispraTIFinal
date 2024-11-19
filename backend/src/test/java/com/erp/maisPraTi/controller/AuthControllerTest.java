package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.auth.*;
import com.erp.maisPraTi.security.JwtRequestFilter;
import com.erp.maisPraTi.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @MockBean
    private JwtRequestFilter jwtRequestFilter;
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;


    private LoginRequest loginRequest;
    private ForgotPasswordRequest forgotPasswordRequest;
    private ValidationUserRequest validationUserRequest;
    private ResetPasswordRequest resetPasswordRequest;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authService)
                .addFilters((request, response, chain) -> chain.doFilter(request, response)) // Ignora filtros
                .build();
        // Criando LoginRequest
        loginRequest = new LoginRequest();
        loginRequest.setEmail("testuser@example.com");
        loginRequest.setPassword("password123");

        // Criando ForgotPasswordRequest
        forgotPasswordRequest = new ForgotPasswordRequest();
        forgotPasswordRequest.setEmail("testuser@example.com");

        // Criando ValidationUserRequest com os argumentos exigidos pelo construtor
        validationUserRequest = new ValidationUserRequest("testuser@example.com", "12345678901");


        // Criando ResetPasswordRequest
        resetPasswordRequest = new ResetPasswordRequest();
        resetPasswordRequest.setNewPassword("newPassword123");
    }


    @Test
    void loginTest() throws Exception {
        LoginResponse response = new LoginResponse("mockedToken123");
        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string(response.getToken()));

        verify(authService, times(1)).login(any(LoginRequest.class));
    }

    @Test
    void forgotPasswordTest() throws Exception {
        doNothing().when(authService).requestPasswordReset(anyString());

        mockMvc.perform(post("/auth/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(forgotPasswordRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("Link de recuperação enviado para o e-mail."));

        verify(authService, times(1)).requestPasswordReset(anyString());
    }

    @Test
    void validationUserTest() throws Exception {
        when(authService.validateUser(anyString(), any(ValidationUserRequest.class))).thenReturn(true);

        mockMvc.perform(post("/auth/validation-user")
                        .param("token", "mockedToken123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validationUserRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        verify(authService, times(1)).validateUser(anyString(), any(ValidationUserRequest.class));
    }

    @Test
    void resetPasswordTest() throws Exception {
        doNothing().when(authService).resetPassword(anyString(), any(ResetPasswordRequest.class));

        mockMvc.perform(post("/auth/reset-password")
                        .param("token", "mockedToken123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(resetPasswordRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("Senha redefinida com sucesso."));

        verify(authService, times(1)).resetPassword(anyString(), any(ResetPasswordRequest.class));
    }
}

