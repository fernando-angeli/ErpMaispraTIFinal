package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.RoleDto;
import com.erp.maisPraTi.dto.RoleUpdateDto;
import com.erp.maisPraTi.model.Role;
import com.erp.maisPraTi.repository.RoleRepository;
import com.erp.maisPraTi.repository.UserRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import static com.erp.maisPraTi.util.EntityMapper.convertToDto;
import static com.erp.maisPraTi.util.EntityMapper.convertToEntity;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public RoleDto insert(RoleDto roleDto){
        Role newRole = new Role();
        newRole = convertToDto(roleDto, Role.class);
        newRole = roleRepository.save(newRole);
        return convertToDto(newRole, RoleDto.class);
    }

    @Transactional(readOnly = true)
    public Optional<RoleDto> findById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Id não localizado: " + id));
        return Optional.of(convertToDto(role, RoleDto.class));
    }

    @Transactional(readOnly = true)
    public Page<RoleDto> findAll(Pageable pageable){
        Page<Role> roles = roleRepository.findAll(pageable);
        return roles.map(r -> convertToDto(r, RoleDto.class));
    }

    @Transactional
    public RoleDto update(Long id, RoleUpdateDto roleUpdateDto){
        verifyExistsId(id);
        try {
            Role role = roleRepository.getReferenceById(id);
            convertToEntity(roleUpdateDto, role);
            role = roleRepository.save(role);
            return convertToDto(role, RoleDto.class);
        } catch (DataIntegrityViolationException e){
            throw new DatabaseException("Não foi possível fazer a alteração neste usuário.");
        } catch (Exception e) {
            throw new DatabaseException("Erro inesperado ao tentar atualizar o usuário.");
        }
    }

    @Transactional
    public void delete(Long id){
        verifyExistsId(id);
        /*
        * Verificar sem em modo DEV com BD MySql é necessário fazer a consulta ao repository
        * */
        if (userRepository.existsByRoles_Id(id))
            throw new DatabaseException("Não é possível excluir esta Role, pois está vinculado a usuários.");
        try{
            roleRepository.deleteById(id);
        } catch (DataIntegrityViolationException e){
            throw new DatabaseException("Não é possível excluir esta Role, pois está vinculado a usuários.");
        } catch (Exception e) {
            throw new DatabaseException("Erro inesperado ao tentar excluir o usuário.");
        }
    }

    private void verifyExistsId(Long id){
        if(!roleRepository.existsById(id)){
            throw new ResourceNotFoundException("Id não localizado: " + id);
        }
    }

}
