## Cadastro de suíno - status: Feito

Crie um componente com um formulário rea vo com os
seguintes campos e seus validadores:
o Brinco do animal: Aceita somente número e é requerido;
o Brinco do pai: Aceita somente número e é requerido;
o Brinco da mãe: Aceita somente número e é requerido;
o Data de Nascimento: dia / mês / ano e é requerido;
o Data da saída: dia / mês / ano e é requerido;
o Status: Pode ser “A vo”, “Vendido” ou “Morto”;
o Sexo: Pode ser “M” ou “F”.


## Listagem de suínos- status: Pendente

Crie um componente para listar todos os súinos da
fazenda. A listagem deve conter todos os campos do animal mais a idade,
que deve ser calculada através de um pipe no formato X meses. No ﬁnal de
cada dado, adicione a opção de editar e deletar o animal. Implemente estas
funcionalidades chamando seus componentes especíﬁcos. A listagem deve
ter os seguintes ﬁltros:
o Listar por brinco do pai;
o Listar por brinco da mãe;
o Listar pela data de nascimento;
o Listar pela data de saída;
o Listar por sexo;
o Listar por Status;

## Controle de peso - status: Pendente

Crie um componente para monitorar o peso do animal. A
ideia é mostrar um gráﬁco com as datas que o animal foi pesado com seu
peso. Considere o gráﬁco abaixo, no eixo ver cal ilustra o peso e o eixo
horizontal as datas que o animal foi pesado.Residência em Tecnologia da Informação e Comunicação

## Cadastro de peso - status: Feito

Crie um componente com um formulário rea vo para
cadastrar o histórico do peso do animal. U lize os seguintes campos e seus
validadores:
o O usuário deve escolher um número de brinco do animal já
cadastrado na aplicação;
o Data da pesagem: dia / mês / ano e é requerido;
o Peso em Kg: Aceita somente número e é requerido;

## Ediçao de peso - status: Pendente

Crie um componente para poder editar o histórico dos pesos
de um animal;

## Serviço para a comunicação com o back end - status: Feito 

Injete este serviço quando
precisar nos componentes da aplicação para fazer que os dados sejam
persis dos no banco de dados. Injete neste serviço o h pclient para realizar
os pedidos get, post e delete para os endpoints do back end.

## Rotas especíﬁcas para cada funcionalidade da aplicação - status: Feito;

## Implemente um guard CanAcvate e o a ve em todas as rotas para
garan r que a rota seja carregada apenas se o usuário es ver logado
no sistema. - status: pendente


## Mensagens nos formulários da aplicação: - status: Feito

sinalize ao usuário se ele está
preenchendo os campos corretamente em tempo de execução u lizando
dire vas do angular e libere o formulário para a submissão apenas se os
campos estejam preenchidos de acordo com os validadores conﬁgurados.

## Autenticação do usuário- status: Feito

Crie um componente com um formulário com os
seguintes campos e seus validadores:
o Login: mínimo de 6 caracteres no formato de email e é requerido;
o Senha: mínimo de 4 caracteres e é requerido.
o Caso seja um novo usuário na aplicação exiba uma opção para uma
nova inscrição.

## Serviço exclusivo para a autenticação: - status: Feito

Injete neste serviço o httpClient para
realizar os pedidos de login ou nova inscrição no back end.