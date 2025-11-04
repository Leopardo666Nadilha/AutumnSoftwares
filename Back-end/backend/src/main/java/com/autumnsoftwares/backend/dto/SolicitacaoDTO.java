package com.autumnsoftwares.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SolicitacaoDTO {

    @NotBlank(message = "O nome completo e obrigatorio.")
    private String fullName;

    private String company;

    @NotBlank(message = "O email e obrigatorio.")
    @Email(message = "O formato do e-mail e invalido.")
    private String email;

    private String phone;

    @NotBlank(message = "O campo desafio e obrigatorio.")
    private String challenge;

    private String solutionType;
    private String integrationNeeded;
    private String investmentRange;
    private String urgency;

    private ServicesDTO service = new ServicesDTO();

    @Data
    public static class ServicesDTO {
        private boolean website;
        private boolean webapp;
        private boolean mobile;
        private boolean automation;
        private boolean consulting;        
    }
}
