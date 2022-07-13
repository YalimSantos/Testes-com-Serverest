import { faker } from '@faker-js/faker';

export default class Factory {

    static gerarProduto(){
        return {
        "nome": faker.commerce.productName(),
        "preco": faker.commerce.price(),
        "descricao": faker.commerce.productDescription(),
        "quantidade": faker.datatype.number()
        }
    }

    static gerarNovoUsuario(){
        return {
        "nome": faker.name.firstName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "administrador": "true"
        }
    }

    static gerarNome(){
        return faker.name.firstName()
    }

    static gerarEmail(){
        return faker.internet.email()
    }

    static gerarId(){
        return faker.internet.password(16)
    }
}