package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.auth.LoginRequest;
import com.erp.maisPraTi.dto.auth.LoginResponse;
import com.erp.maisPraTi.fixture.LoginFixture;
import com.erp.maisPraTi.fixture.UserFixture;
import com.erp.maisPraTi.model.User;
import com.erp.maisPraTi.repository.UserRepository;
import com.erp.maisPraTi.service.exceptions.AuthenticationUserException;
import com.erp.maisPraTi.util.EntityMapper;
import org.hibernate.service.spi.InjectService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith; // Para extensão do Mockito
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;


import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectService
    private UserService service;

    @Mock
    private UserRepository repository;

    @Mock
    private RoleService roleService;

    @Mock
    private EntityMapper mapper;

    @Mock
    private AuthService authService;

    @Test
    public void mustReturnLoginResponseWhenGivenValidLoginRequest(){
        //Arrange
        User user = UserFixture.userAdmin();
        LoginRequest request = LoginFixture.loginRequest();
        LoginResponse response = LoginFixture.loginResponse();
        response.setToken("token");

        //Action
        when(repository.findByEmail(request.getEmail())).thenReturn(user);
        when(authService.login(request)).thenReturn(response);

        LoginResponse result = authService.login(request);

        //Assert
        assertEquals(response.getToken(), result.getToken());
    }

    @Test(expected = AuthenticationUserException.class)
    public void mustThrowExceptionWhenGivenAnInvalidUser(){
        //Arrange
        LoginRequest request = LoginFixture.invalidLoginRequest();
        LoginResponse response = LoginFixture.invalidLoginResponse();

        // Definir o comportamento do mock
        when(repository.findByEmail(request.getEmail())).thenReturn(null);

        // Action & Assert
        //Chama o método que deve lançar a exceção
        AuthenticationUserException exception = assertThrows(AuthenticationUserException.class, () -> {
            authService.login(request);
        });
        // Verifica se a exceção lançada é a esperada
        assertNotNull(exception);

        // Verifica se o método do repositório foi chamado
        verify(repository).findByEmail(request.getEmail());
    }

}
