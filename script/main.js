/*
 * Script principal do projeto
*/

requisitorBase.get('users/hugobrandao-dev')
	.then(response => {
		let aElement_desenvolvedor = document.querySelector('footer#rodape a')
		aElement_desenvolvedor.href = response.data.html_url
		aElement_desenvolvedor.innerHTML = `${response.data.name} <i class="fab fa-github"></i>`
	})
	.catch(error => {
		console.warn('ERRO: URL do desenvolvedor não encontrado.')
	})

new Aplicativo()