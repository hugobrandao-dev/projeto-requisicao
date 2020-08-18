/*
 * Script principal do projeto
*/

requisitorBase.get('users/hugobrandao.dev')
	.then(response => {
		let aElement_desenvolvedor = document.querySelector('footer#rodape a')
		aElement_desenvolvedor.href = html_url
		aElement_desenvolvedor.innerHTML = `${name} <i class="fab fa-github"></i>`
	})