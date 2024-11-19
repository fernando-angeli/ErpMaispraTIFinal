package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.partyDto.clients.ClientDto;
import com.erp.maisPraTi.dto.partyDto.clients.ClientUpdateDto;
import com.erp.maisPraTi.security.JwtRequestFilter;
import com.erp.maisPraTi.security.JwtTokenProvider;
import com.erp.maisPraTi.service.ClientService;
import jakarta.persistence.Id;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(ClientController.class)
public class ClientControllerTest {

    @MockBean
    private ClientService clientService; // Substitui o bean real pelo mock

    @MockBean
    private JwtTokenProvider jwtTokenProvider;  // Mockando o JwtTokenProvider

    @MockBean
    private JwtRequestFilter jwtRequestFilter;  // Mockando o JwtRequestFilter

    @Autowired
    private MockMvc mockMvc; // Injetando o MockMvc

    @InjectMocks
    private ClientController clientController;  // Injetando o Controller

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(clientController).addFilters(jwtRequestFilter).build(); // Adicionando filtro JWT no setup
    }

    @Test
    void testFindByIdSuccess() throws Exception {
        // Simulação de um cliente encontrado
        ClientDto clientDto = new ClientDto();
        clientDto.setId(1L);
        clientDto.setBirthDate(LocalDate.of(1990, 5, 1));

        when(clientService.findById(1L)).thenReturn(Optional.of(clientDto));

        // Execução e verificação
        mockMvc.perform(get("/clients/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Verifica o status HTTP 200
                .andExpect(jsonPath("$.id").value(1L)) // Verifica o ID no JSON
                .andExpect(jsonPath("$.birthDate").value("1990-05-01")); // Verifica a data de nascimento

        verify(clientService, times(1)).findById(1L);
    }

    @Test
    void testFindByIdNotFound() throws Exception {
        // Simulação de cliente não encontrado
        when(clientService.findById(1L)).thenReturn(Optional.empty());

        // Execução e verificação
        mockMvc.perform(get("/clients/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound()); // Verifica o status HTTP 404

        verify(clientService, times(1)).findById(1L);
    }



}