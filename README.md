# Logical Forest Serverest

Esse é um projeto de criação de testes automatizados em cima da API Serverest
<br><br>

## Documentação da API

A documentação da API pode ser encontrada em: https://serverest.dev/
<br><br>

## Documentação do Plano de Testes
A documentação do plano de testes pode ser encontrado em: 
```
documents/Plano de Testes.pdf
```
<br><br>

## Documentação do Relatório de Testes
A documentação do relatório de testes pode ser encontrado em: 
```
documents/Relatório de Testes.pdf
```
<br><br>

## Instalação

- Faça o download ZIP ou clone o repositório com o link abaixo
```
https://github.com/YalimSantos/LogicalForest_Yalim_Santos_Sprint5.git
```

- Faça o download e instalação do NodeJS em: https://nodejs.org/en/download/

- No terminal da IDE, rode o seguinte comando para baixar todas as dependências
```
npm i
```

- Se for rodar a Serverest localmente, na sua primeira execução, precisará instalar a API, para isso, rode o seguinte código
```
npx serverest@latest
```
Após isso, vai aparecer uma mensagem, digite "y" para começar o download
<br><br>

## Rodar os testes localmente

Para rodar os testes localmente, primeiro precisamos acessar a API localmente usando o seguinte comando na IDE:
```
npx serverest@latest
```

Após o seu acesso, podemos realizar os testes rodando o seguinte comando na IDE:

``` 
npm run cy:open 
```
ou
```
npm run test
```

Para garantir que esse último teste funcione, acesse o arquivo 'package.json' e verifique se, dentro do 'scripts', o 'scripts' ta assim:
```JSON
"scripts": "cypress run", 
```
O '<b>run cy:open</b>' abrirá a tela do cypress para você fazer os testes. já o '<b>run test</b>' criará um arquivo HTML em ```cypress/reports/mochareports/report.html``` contendo os resultados do teste
<br><br>

## Rodar os testes na API serverest

Para rodar os testes na API, rode o seguinte comando na IDE:

``` 
npm run cy:open:prod 
```
ou
```
npm run test
```

Para garantir que esse último teste funcione, acesse o arquivo 'package.json' e verifique se, dentro do 'scripts', o 'scripts' ta assim:
```JSON
"scripts": "cypress run --env configFile=prod", 
```
O '<b>run cy:open:prod</b>' abrirá a tela do cypress para você fazer os testes. já o '<b>run test</b>' criará um arquivo HTML em ```cypress/reports/mochareports/report.html``` contendo os resultados do teste
<br><br>

## O que se espera ao rodar os testes

Caso você rode o ``` npm run test ```, no arquivo HTML deve aparecer algo tipo:

![image](https://user-images.githubusercontent.com/63170477/180006843-b0ec3cb3-b417-48af-9518-e83b2a03efaf.png)

<br>

Caso você rode o ``` npm cy:open:prod ``` e execute um dos testes, deve aparecer algo tipo:

![image](https://user-images.githubusercontent.com/63170477/180007241-0d07fb96-d42d-4c1a-bb2a-6fc3354ca368.png)

<br>

## Localização dos arquivos

- Arquivos de configuração de ambiente:
```
cypress/config
```

- Arquivos de teste:
```
cypress/integration
```

- Arquivos json para testes de contrato:
```
cypress/fixtures/schemas
```

- Arquivos com os métodos usados no teste e de validação de teste:
```
cypress/services
```

- Arquivo com método usado para validação de contrato:
```
cypress/support/commands.js
```

- Arquivo para geração de massa de dados:
```
cypress/fixtures/factory.js
```

- Arquivo com o report caso use o comando ``` npm run test ```:
```
cypress/reports/mochareports/report.html
```
<br>

## Agradecimentos especiais

- Felipe Ripplinger
- Matheus Locatelli