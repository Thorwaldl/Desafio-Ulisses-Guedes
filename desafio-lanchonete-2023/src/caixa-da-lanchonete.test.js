import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

// testes adicionais criados por mim iniciam apartir daqui

// testes relativos aos combos pois esse não foram avaliadaos durante qualquer outro teste
test.each([
    ['Combo1', 'debito', 'R$ 9,50', ['combo1,1']],
    ['Combo1 com queijo', 'debito', 'Item extra não pode ser pedido sem o principal', ['combo1,1','queijo,1']],
    ['Combo2', 'debito', 'R$ 7,50', ['combo2,1']],
    ['Combo2 com queijo', 'debito', 'Item extra não pode ser pedido sem o principal', ['combo2,1','queijo,1']],
    ['Combo2 com chantily', 'debito', 'Item extra não pode ser pedido sem o principal', ['combo2,1','chantily,1']],
])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
    validaTeste(formaDePagamento, resultadoEsperado, itens));

// não tinha nenhum teste que envolvesse salgados ou sucos, logo adicionei-os
test.each([
    ['salgado', 'debito', 'R$ 7,25', ['salgado,1']],
    ['suco', 'debito', 'R$ 6,20', ['suco,1']],
])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
    validaTeste(formaDePagamento, resultadoEsperado, itens));

// testes para cobrir se chantily esta sendo própriamente tratado pois na bateria de testes original a linha 64 não era coberta
    test.each([
        ['cafe e chantily junto', 'debito', 'R$ 4,50', ['cafe,1','chantily,1']],
        ['cafe e muito chantily junto', 'debito', 'R$ 18,00', ['cafe,1','chantily,10']],
        ['cafe e sem chantily junto', 'debito', 'Quantidade inválida!', ['cafe,1','chantily,0']],
        ['cafe e chantily negativo', 'debito', 'Quantidade inválida!', ['cafe,1','chantily,-10']],
        ['cafe e chantily chantilys', 'debito', 'Quantidade inválida!', ['cafe,1','chantily,chantily']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));
});
