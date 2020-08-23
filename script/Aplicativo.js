class Aplicativo {
	constructor() {
		this.formElement_busca = document.querySelector('form#busca-repositorio')

		this.sectionElement_requisicoes = document.querySelector('section.requisicoes')
		this.iniciadorEventos()
	}

	// Inicia todos os eventos necessários já no carregamento da página
	iniciadorEventos() {

		// Evento submit do formulário de busca por usuário/repositório.
		this.formElement_busca.onsubmit = event => this.verificarRequisicao(event)
	}

	// Impede a execução regular do submit e verifica que o input do nome está vazio.
	verificarRequisicao(event) {
		event.preventDefault()

		let radioElement_requisicao = document.getElementsByName('rd-requisicao')

		for (let r = 0; r < radioElement_requisicao.length; r++) {
			if (radioElement_requisicao[r].checked) {
				this.buscarRepositorio(radioElement_requisicao[r].value)
			}
		}
	}

	// Faz a busca pelo usuário ou repositório informado no input.
	buscarRepositorio(tipo) {
		let inputElement_nome = document.getElementsByName('nome')[0]
		let nome = inputElement_nome.value

		if (nome.length === 0) {
			alert('ERRO: Nenhum nome informado.')
		} else {
			requisitorBase.get(`${tipo}/${nome}`)
				.then(response => {
					inputElement_nome.value = ''
					/*
					Verifica o tipo de requisição que está 
					selecionado (checked) e armazena as 
					informações necessários dependendo do tipo da 
					mesma.
					*/
					if (tipo === 'users') {
						var { name, avatar_url, html_url, bio, type } = response.data
						this.renderizarRequisicao(name, avatar_url, html_url, type, bio)

					} else if (tipo === 'repos') {
						var { name, html_url, description, owner: { avatar_url, type } } = response.data
						this.renderizarRequisicao(name, avatar_url, html_url, type, description)
					}
				})

				// Caso não ache nenhum repositório ou usuário, executa o código abaixo.
				.catch(error => {
					alert('OPS: Não encontramos nenhum usuário ou repositório com esse nome/caminho.')
					console.log(error)
				})
		}
	}
	/*
	Realiza a construção de um elemento HTML, já com as propriedades 
	necessários para a estilização com CSS.
	*/
	renderizarRequisicao(nome, foto, acessar, tipo, descricao) {
		let $pElement_tipo = document.createElement('p')
		$pElement_tipo.innerHTML = tipo

		let $h4Element_nome = document.createElement('h4')
		$h4Element_nome.setAttribute('class', 'tipo')
		$h4Element_nome.innerHTML = nome

		let $imgElement_imagem = document.createElement('img')
		$imgElement_imagem.setAttribute('src', foto)
		$imgElement_imagem.setAttribute('alt', 'Foto do perfil')
		$imgElement_imagem.setAttribute('class', 'imagem')

		let $pElement_descricao = document.createElement('p')
		$pElement_descricao.innerHTML = descricao

		let $aElement_link = document.createElement('a')
		$aElement_link.setAttribute('href', acessar)
		$aElement_link.setAttribute('class', 'link-acesso')
		$aElement_link.setAttribute('target', '_blank')
		$aElement_link.innerHTML = 'Quero conhecer <i class="fas fa-arrow-circle-right"></i>'

		let $articleElement_requisicao = document.createElement('article')
		$articleElement_requisicao.setAttribute('class', 'requisicao')
		$articleElement_requisicao.appendChild($pElement_tipo)
		$articleElement_requisicao.appendChild($h4Element_nome)
		$articleElement_requisicao.appendChild($imgElement_imagem)
		$articleElement_requisicao.appendChild($pElement_descricao)
		$articleElement_requisicao.appendChild($aElement_link)

		this.sectionElement_requisicoes.appendChild($articleElement_requisicao)
	}
}