package com.autumnsoftwares.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.autumnsoftwares.backend.dto.SolicitacaoDTO;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${autumn.mail.to}")
    private String toEmail;



    public void enviarEmailsDeSolicitacao(SolicitacaoDTO dto) throws MessagingException {
        enviarEmailParaEmpresa(dto);
        enviarEmailDeConfirmacaoParaCliente(dto);
    }

    private void enviarEmailParaEmpresa(SolicitacaoDTO dto) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        dto.getEmail();
        helper.setTo(toEmail);
        helper.setReplyTo(dto.getEmail());
        helper.setSubject("Nova Solicitação de Projeto: " + dto.getCompany());

        String htmlContent = buildHtmlParaEmpresa(dto);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    private void enviarEmailDeConfirmacaoParaCliente(SolicitacaoDTO dto) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(dto.getEmail());
        helper.setSubject("Recebemos sua solicitação de projeto!");

        String htmlContent = String.format(
            "<h1>Olá, %s!</h1>" +
            "<p>Confirmamos o recebimento da sua solicitação de projeto. Agradecemos por compartilhar sua ideia conosco!</p>" +
            "<p>Nossa equipe analisará as informações que você enviou e entraremos em contato o mais breve possível para discutir os próximos passos.</p>" +
            "<p>Atenciosamente,<br>Equipe Autumn Softwares</p>",
            dto.getFullName()
        );
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    private String getSelectedServices(SolicitacaoDTO.ServicesDTO services) {
        List<String> selected = new ArrayList<>();
        if (services == null) {
            return "Nenhum serviço selecionado";
        }
        if (services.isWebsite()) selected.add("Desenvolvimento de Website / Landing Page");
        if (services.isWebapp()) selected.add("Desenvolvimento de Aplicação Web (SaaS, Dashboard)");
        if (services.isMobile()) selected.add("Desenvolvimento de Aplicativo Mobile (iOS/Android)");
        if (services.isAutomation()) selected.add("Automação de Processos / Integrações");
        if (services.isConsulting()) selected.add("Consultoria para definição de escopo");
        
        return String.join(", ", selected);
    }

    private String buildHtmlParaEmpresa(SolicitacaoDTO dto) {
        return "<h1>Nova Solicitação de Projeto</h1>" +
               "<p><strong>Nome:</strong> " + dto.getFullName() + "</p>" +
               "<p><strong>Empresa:</strong> " + dto.getCompany() + "</p>" +
               "<p><strong>E-mail:</strong> " + dto.getEmail() + "</p>" +
               "<p><strong>Telefone:</strong> " + dto.getPhone() + "</p>" +
               "<hr>" +
               "<h2>Detalhes do Projeto</h2>" +
               "<p><strong>Desafio/Ideia:</strong><br>" + dto.getChallenge().replace("\n", "<br>") + "</p>" +
               "<p><strong>Tipo de Solução:</strong> " + dto.getSolutionType() + "</p>" +
               "<p><strong>Necessita Integração:</strong> " + (dto.getIntegrationNeeded() != null ? dto.getIntegrationNeeded() : "Não informado") + "</p>" +
               "<p><strong>Faixa de Investimento:</strong> " + dto.getInvestmentRange() + "</p>" +
               "<p><strong>Urgência:</strong> " + dto.getUrgency() + "</p>" +
               "<p><strong>Serviços de Interesse:</strong> " + getSelectedServices(dto.getService()) + "</p>";
    }
}
