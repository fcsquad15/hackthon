rota para listar habilidades do usuário

.get 'usuarios/habilidades/id'

requisição por parametro, adicionar o id do usuário desejado

resposta
id => id da habilidade
habilidade => nome da habilidade

exemplo
[
	{
		"id": 5,
		"habilidade": "React"
	},
	{
		"id": 6,
		"habilidade": "Java"
	},
	{
		"id": 7,
		"habilidade": "JavaScript"
	}
]

Rotas para listar mentorias agendadas

get '/mentorias/marcadas'

requisição pelo body, se colocar autenticação podemos tirar essa necessidade de enviar 

usuario_id=> usuário logado, pode ser o usuário 1 mesmo

resposta
id=> id referente a listagem na tabela
dia => data vindo da tabela de agenda
hora => horário vindo da tabela pré definida

exemplo
[
	{
		"id": 1,
		"dia": "2022-04-15T03:00:00.000Z",
		"hora": "07:30:00"
	},
	{
		"id": 2,
		"dia": "2022-04-22T03:00:00.000Z",
		"hora": "12:00:00"
	}
]

Rota para obter informações detalhadas de um usuário
.get '/usuarios/:id'

requisição enviar por parametro o id do usuário desejado

resposta
id=>id do usuário
nome=>nome do usuário
email=> email do usuario
bio=> biografia do usuario
avatar => foto de perfil do usuário

exemplo

{
	"id": 3,
	"nome": "Elaine Mckenzie",
	"email": "fringilla.mi.lacinia@email.org",
	"bio": "semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis",
	"avatar": "https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
}

Rota para listar os mentores por área

.get '/mentorias/filtroArea?area='

requisição por meio de query, adicionar após o sinal de igual o id da área selecionada

resposta

id => id do usuário
nome => Nome do usuário
bio => biografia do usuário
avatar => url da imagem de perfil do usuário


exemplo
[
	{
		"id": 3,
		"nome": "Elaine Mckenzie",
		"bio": "semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis",
		"avatar": "https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
	},
	{
		"id": 7,
		"nome": "Aimee Cantrell",
		"bio": "at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit",
		"avatar": "https://images.pexels.com/photos/3220360/pexels-photo-3220360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
	}
]


Rota para buscar os dias e a horas do mentor escolhido

.get'/mentor/dias?mentor='

requisição por meio de query, adicionar após o sinal de igual o id do usuário que está mostrando

resposta
id => id da agenda, utilizar como key e vai ser utilizado para agendar a mentoria
dia => dia no formato padão
hora => vem a hora definida já, vem de uma outra tabela com horários a cada 30 min, está no formato HH:mm:ss

exemplo de resposta com o caminho 'http://localhost:8000/mentor/dias?mentor=1'
[
	{
		"id": 6,
		"dia": "2022-04-15T03:00:00.000Z",
		"hora": "07:30:00"
	},
	{
		"id": 1,
		"dia": "2022-04-15T03:00:00.000Z",
		"hora": "09:00:00"
	},
	{
		"id": 2,
		"dia": "2022-04-15T03:00:00.000Z",
		"hora": "10:00:00"
	},
	{
		"id": 3,
		"dia": "2022-04-15T03:00:00.000Z",
		"hora": "11:00:00"
	},
	{
		"id": 4,
		"dia": "2022-04-16T03:00:00.000Z",
		"hora": "11:00:00"
	},
	{
		"id": 5,
		"dia": "2022-04-17T03:00:00.000Z",
		"hora": "11:00:00"
	}
]

Rotas para marcar a mentoria

.post '/mentorias/marcar'

requisição pelo body 
usuario_id => usuário da aplicação, como não estamos usando login criei o usuário com id 1 com o nome Squad Quinze
 agenda_id => agenda_id fornecido pelo corpo, vai precisar marcar qual foi o horário marcado que vai ter esse id e mandar na requisição

 exemplo 
 {
	"usuario_id":1,
	"agenda_id":7
}

 resposta é apenas uma mensagem de confirmação

 Essa rota está criando automaticamente a notificação para ambos e alterado o status do horário para indisponível