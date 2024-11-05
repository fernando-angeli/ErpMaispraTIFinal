package com.erp.maisPraTi.service;

import com.erp.maisPraTi.enums.TypePfOrPj;
import com.erp.maisPraTi.repository.ClientRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;

    @Test
    void deveVerificarSeOsDocumentosExistemParaAlgumClienteQuandoInformadoCpfETipoPF(){

        //Arrange
        String cpf = "000.111.222.333-44";
        String stateRegistration = "isento";
        TypePfOrPj typePfOrPj = TypePfOrPj.PF;

        // Comportamento do mock
        when(clientRepository.existsByCpfCnpj(cpf)).thenReturn(true);

        // Action
        DatabaseException exception = assertThrows(DatabaseException.class, () -> {
            clientService.verifyExistsDocuments(cpf, stateRegistration, typePfOrPj);
        });

        // Assert
        assertEquals("CPF já cadastrado no sistema.", exception.getMessage());
    }

    @Test
    void deveVerificarSeOsDocumentosExistemParaAlgumClienteQuandoInformadoCnpjExistenteETipoPJ(){
        //Arrange
        String cnpj = "12555888/0001-99";
        String stateRegistration = "909/8328356";
        TypePfOrPj typePfOrPj = TypePfOrPj.PJ;

        // Comportamento do mock
        when(clientRepository.existsByCpfCnpj(cnpj)).thenReturn(true);

        // Action
        DatabaseException exception = assertThrows(DatabaseException.class, () -> {
            clientService.verifyExistsDocuments(cnpj, stateRegistration, typePfOrPj);
        });

        // Assert
        assertEquals("CNPJ já cadastrado no sistema.", exception.getMessage());
    }

    @Test
    void deveVerificarSeOsDocumentosExistemParaAlgumClienteQuandoInformadoInscricaoEstadualExistenteETipoPJ(){

        //Arrange
        String cnpj = "55.222.555/0001-55";
        String stateRegistration = "909/8328356";
        TypePfOrPj typePfOrPj = TypePfOrPj.PJ;

        // Comportamento do mock
        when(clientRepository.existsByCpfCnpj(cnpj)).thenReturn(false);
        when(clientRepository.existsByStateRegistration(stateRegistration)).thenReturn(true);

        // Action
        DatabaseException exception = assertThrows(DatabaseException.class, () -> {
            clientService.verifyExistsDocuments(cnpj, stateRegistration, typePfOrPj);
        });

        // Assert
        assertEquals("Inscrição estadual já cadastrada no sistema.", exception.getMessage());
    }

}
