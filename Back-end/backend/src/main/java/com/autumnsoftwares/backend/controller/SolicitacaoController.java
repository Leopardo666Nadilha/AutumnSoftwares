package com.autumnsoftwares.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autumnsoftwares.backend.dto.SolicitacaoDTO;
import com.autumnsoftwares.backend.service.EmailService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/solicitacao")
@CrossOrigin(origins = "http://localhost:3000")
public class SolicitacaoController {

    @Autowired
    private EmailService emailService;
    
    @PostMapping
    public ResponseEntity<Map<String, String>> receberSolicitacao(@Valid @RequestBody SolicitacaoDTO solicitacaoDTO) {
        try {
            emailService.enviarEmailsDeSolicitacao(solicitacaoDTO);
            return ResponseEntity.ok(Map.of("message", "Solicitação enviada com sucesso!"));
        } catch (Exception e) {
            // Logar o erro em um sistema de logs real seria o ideal
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Ocorreu um erro ao enviar sua solicitação. Tente novamente mais tarde."));
        }
    }
}
