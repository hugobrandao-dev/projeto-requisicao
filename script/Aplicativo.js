class Aplicativo {
	constructor() {
		this.formElement_busca = document.querySelector('form#busca-repositorio')

		this.sectionElement_requisicoes = document.querySelector('section.requisicoes')
		this.iniciadorEventos()
	}

	iniciadorEventos() {
		this.formElement_busca.onsubmit = event => this.verificarRequisicao(event)
	}

	verificarRequisicao(event) {
		event.preventDefault()

		let radioElement_requisicao = document.getElementsByName('rd-requisicao')

		for (let r = 0; r < radioElement_requisicao.length; r++) {
			if (radioElement_requisicao[r].checked) {
				this.buscarRepositorio(radioElement_requisicao[r].value)
			}
		}
	}

	buscarRepositorio(tipo) {
		let inputElement_nome = document.getElementsByName('nome')[0]
		let nome = inputElement_nome.value

		if (nome.length === 0) {
			alert('ERRO: Nenhum nome informado.')
		} else {
			requisitorBase.get(`${tipo}/${nome}`)
				.then(response => {
					if (tipo === 'users') {
						var {name, avatar_url, html_url, bio, type} = response.data
						this.renderizarRequisicao(name, avatar_url, html_url, type, bio)

					} else if (tipo === 'repos') {
						var {name, html_url, description, owner: {avatar_url, type}} = response.data
						this.renderizarRequisicao(name, avatar_url, html_url, type, description)
					}
				})
				.catch(error => {
					console.log(error)
				})
		}
	}
// name, avatar_url, html_url, type, bio
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
					$aElement_link.innerHTML = 'Quero conhecer <i class="fas fa-arrow-circle-right"></i>'

					let articleElement_requisicao = document.createElement('article')
					articleElement_requisicao.appendChild($pElement_tipo)
					articleElement_requisicao.appendChild($h4Element_nome)
					articleElement_requisicao.appendChild($imgElement_imagem)
					articleElement_requisicao.appendChild($pElement_descricao)
					articleElement_requisicao.appendChild($aElement_link)

					this.sectionElement_requisicoes.appendChild(articleElement_requisicao)
	}
}