export default class ValidaServerest {

    // Validação das ações que podemos realizar na API
    // validar a busca de usuários
    // validar o cadastro de novos usuários
    // Validar o login

    static ValidarBuscaDeUsuarios( res, status ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
        expect( res.status ).to.be.eq( status )
    }

    static ValidarBuscaDeUsuariosComId( res, status ){
        expect( res.status ).to.be.eq( status )
    }

    static ValidarPostarNovoUsuario( res, status ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static validarModificarUsuario( res, status ){
        expect( res.body.message ).to.be.eq( 'Registro alterado com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static validarDeletarUsuario( res, status ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static ValidarDeletarUsuarioNaoExiste( res, status ){
        expect( res.body.message ).to.be.eq( 'Nenhum registro excluído' )
        expect( res.status ).to.be.eq( status )
    }

    // login //

    static ValidaLogin( res, status ){
        expect( res.body.message ).to.be.eq( 'Login realizado com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static ValidaLoginSemSucesso( res, status ){
        expect( res.body.message ).to.be.eq( 'Email e/ou senha inválidos' )
        expect( res.status ).to.be.eq( status )
    }

    static validaTokenInexistente( res, status ){
        expect( res.body.message ).to.be.eq( 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais' )
        expect( res.status ).to.be.eq( status )
    }

    // produtos //

    static validaBuscaDeProdutos( res, status ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
        expect( res.status ).to.be.eq( status )
    }

    static validaBuscaDeProdutosComId( res, status ){
        expect( res.status ).to.be.eq( status )
    }

    static validaCadastroDeProduto( res, status ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static validarModificarProduto( res, status ){
        expect( res.body.message ).to.be.eq( 'Registro alterado com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static validarDeletarProduto( res, status ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static ValidarDeletarProdutoNaoExiste( res, status ){
        expect( res.body.message ).to.be.eq( 'Nenhum registro excluído' )
        expect( res.status ).to.be.eq( status )
    }

    // carrinhos // 

    static validaBuscaDeCarrinhos( res, status ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
        expect( res.status ).to.be.eq( status )
    }

    static validaBuscaDeCarrinhosComId( res, status ){
        expect( res.status ).to.be.eq( status )
    }

    static validaCadastroDeCarrinho( res, status ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static validaConclusaoDeCarrinho( res, status ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static validaConclusaoDeCarrinhoSemCarrinho( res, status ){
        expect( res.body.message ).to.be.eq( 'Não foi encontrado carrinho para esse usuário' )
        expect( res.status ).to.be.eq( status )
    }

    static validaCancelamentoDeCarrinho( res, status ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
        expect( res.status ).to.be.eq( status )
    }

    static validaCancelamentoDeCarrinhoSemCarrinho( res, status ){
        expect( res.body.message ).to.be.eq( 'Não foi encontrado carrinho para esse usuário' )
        expect( res.status ).to.be.eq( status )
    }

    static validaBuscaDeCarrinhosSemSucesso( res, status ){
        expect( res.body.message ).to.be.eq( 'Carrinho não encontrado' )
        expect( res.status ).to.be.eq( status )
    }

    static validaCadastroDeCarrinhoComDoisProdutosIguais( res, status ){
        expect( res.body.message ).to.be.eq( 'Não é permitido possuir produto duplicado' )
        expect( res.status ).to.be.eq( status )
    }

    static validaCadastroDeCarrinhoComCarrinhoJaCadastrado( res, status ){
        expect( res.body.message ).to.be.eq( 'Não é permitido ter mais de 1 carrinho' )
        expect( res.status ).to.be.eq( status )
    }

    static validaCadastroDeCarrinhoComProdutoNaoExiste( res, status ){
        expect( res.body.message ).to.be.eq( 'Produto não encontrado' )
        expect( res.status ).to.be.eq( status )
    }

    static validaCadastroDeCarrinhoComProdutoSemQuantidade( res, status ){
        expect( res.body.message ).to.be.eq( 'Produto não possui quantidade suficiente' )
        expect( res.status ).to.be.eq( status )
    }

}