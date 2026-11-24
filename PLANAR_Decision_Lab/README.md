# PLANAR — Decision Lab

Apresentação editorial interativa com sete telas. Estudo comparativo **DC-e em CPF × MEI/NF-e** para avaliação do piloto comercial da Planar em 2026.

## Conteúdo

- `index.html` — estrutura semântica, sete telas e diálogos de fontes/contexto legal;
- `assets/css/style.css` — design responsivo e redução de movimentos;
- `assets/js/app.js` — navegação, controles, modal, comparador e simulador;
- `assets/img/` — diretório reservado a fotografias oficiais futuras (não foram inventadas imagens ou estampas).

## Execução local

Abra `index.html` diretamente no Chrome, Edge ou Firefox moderno. A apresentação não precisa de servidor, conexão de internet ou instalação de dependências. Os links externos de referências requerem internet.

Para servir localmente, opcionalmente rode `python -m http.server 8000` na raiz do projeto e abra `http://localhost:8000/`.

## Navegação

- Setas **←/→** e **PageUp/PageDown**: anterior/próxima;
- **Home / End**: início/final;
- Botões inferiores: avançar, voltar e tela cheia;
- Celular: deslize horizontal entre telas (fora de controles);
- **Escape**: fechar diálogos ou sair de tela cheia;
- Botão **FONTES**: referências e critérios de interpretação;
- Tela 3: painel de contexto DC-e; tela 5: comparador por critério; tela 6: simulador reativo;
- `?slide=1` até `?slide=7`: abertura direta em uma tela, útil para homologação.

## Publicação futura (somente após aprovação)

Copie a pasta para qualquer host estático. No GitHub Pages, publique os arquivos na raiz de uma branch própria ou em pasta `docs/` conforme a configuração do repositório. Não há back-end ou rotas dependentes de servidor. **Nenhuma publicação foi feita.**

## Regras fiscais e escopo

O estudo **não libera vendas** nem fornece parecer tributário individual. A DC-e não substitui nota fiscal exigível; MEI exige elegibilidade, atividade permitida, cadastro e rotina fiscal. A operação da Planar deve passar por validação antes de aceitar pedidos comerciais pagos.

Os DAS de R$ 82,05 e R$ 87,05 são **valores de 2026**; devem ser revistos para 2027 e períodos posteriores. Os CNAEs 4781-4/00 e 1340-5/01 são candidatos de estudo, não enquadramento aprovado. A Resposta à Consulta 34210/2026 é referência de interpretação, não autorização individual da Planar.

## Simulador

- Faturamento bruto: `q × 59.99`;
- Contribuição total: `q × m`;
- Saldo após DAS: `q × m − d`;
- Unidades para cobrir somente o DAS: `Math.ceil(d / m)`.

`q` = quantidade mensal (0–30); `m` = margem unitária **hipotética** (R$ 5–40); `d` = DAS escolhido (R$ 82,05 ou R$ 87,05). Saldo após DAS **não** é lucro líquido.

## Acessibilidade

HTML em português, títulos semânticos, botões nomeados, foco visível, teclado, gerenciamento de foco e Escape em diálogo, contraste textual e `prefers-reduced-motion`. Em telas estreitas a página permite rolagem vertical, sem forçar fonte ilegível.

## Fontes primárias

As nove fontes do projeto estão linkadas no diálogo **FONTES**, acessível em todas as telas. Pesquisa realizada em 24 de novembro de 2026. Destaque: Sefaz-SP (DC-e, Portaria SRE 28/2025 alterada, NFF, RC 34210/2026), CONFAZ, Simples Nacional e Gov.br.

## Homologação sugerida

1. Abrir `index.html` sem internet e percorrer as sete telas com teclado e botões.
2. Testar toque e layout em 390×844, 768×1024, 1366×768 e 1920×1080.
3. Verificar os quatro critérios da comparação, abertura/fechamento de diálogos e fullscreen.
4. No simulador, testar `q=0,m=5,d=82.05` → saldo `-82,05`, equilíbrio `17`; `q=10,m=20,d=82.05` → saldo `117,95`, equilíbrio `5`; `q=30,m=40,d=87.05` → saldo `1.112,95`, equilíbrio `3`.
5. Antes de publicação ou uso em 2027, conferir fontes, regras e valores.

**Status:** prévia de homologação; sem autorização de publicação.
