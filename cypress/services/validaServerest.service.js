export default class ValidaServerest {

    // Validação das ações que podemos realizar na API
    // validar a busca de usuários
    // validar o cadastro de novos usuários
    // Validar o login

    static ValidarBuscaDeUsuarios( res ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
    }

    static ValidarPostarNovoUsuario( res ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
    }

    static validarModificarUsuario( res ){
        expect( res.body.message ).to.be.eq( 'Registro alterado com sucesso' )
    }

    static validarDeletarUsuario( res ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
    }

    static ValidarDeletarUsuarioNaoExiste( res ){
        expect( res.body.message ).to.be.eq( 'Nenhum registro excluído' )
    }

    // login //

    static ValidaLogin( res ){
        expect( res.body.message ).to.be.eq( 'Login realizado com sucesso' )
    }

    static ValidaLoginSemSucesso( res ){
        expect( res.body.message ).to.be.eq( 'Email e/ou senha inválidos' )
    }

    static validaTokenInexistente( res ){
        expect( res.body.message ).to.be.eq( 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais' )
    }

    // produtos //

    static validaBuscaDeProdutos( res ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
    }

    static validaCadastroDeProduto( res ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
    }

    static validarModificarProduto( res ){
        expect( res.body.message ).to.be.eq( 'Registro alterado com sucesso' )
    }

    static validarDeletarProduto( res ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
    }

    static ValidarDeletarProdutoNaoExiste( res ){
        expect( res.body.message ).to.be.eq( 'Nenhum registro excluído' )
    }

    // carrinhos // 

    static validaBuscaDeCarrinhos( res ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
    }

    static validaCadastroDeCarrinho( res ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
    }

    static validaConclusaoDeCarrinho( res ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
    }

    static validaConclusaoDeCarrinhoSemCarrinho( res ){
        expect( res.body.message ).to.be.eq( 'Não foi encontrado carrinho para esse usuário' )
    }

    static validaCancelamentoDeCarrinho( res ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
    }

    static validaCancelamentoDeCarrinhoSemCarrinho( res ){
        expect( res.body.message ).to.be.eq( 'Não foi encontrado carrinho para esse usuário' )
    }

    static validaBuscaDeCarrinhosSemSucesso( res ){
        expect( res.body.message ).to.be.eq( 'Carrinho não encontrado' )
    }

    static validaCadastroDeCarrinhoComDoisProdutosIguais( res ){
        expect( res.body.message ).to.be.eq( 'Não é permitido possuir produto duplicado' )
    }

    static validaCadastroDeCarrinhoComCarrinhoJaCadastrado( res ){
        expect( res.body.message ).to.be.eq( 'Não é permitido ter mais de 1 carrinho' )
    }

    static validaCadastroDeCarrinhoComProdutoNaoExiste( res ){
        expect( res.body.message ).to.be.eq( 'Produto não encontrado' )
    }

    static validaCadastroDeCarrinhoComProdutoSemQuantidade( res ){
        expect( res.body.message ).to.be.eq( 'Produto não possui quantidade suficiente' )
    }

}