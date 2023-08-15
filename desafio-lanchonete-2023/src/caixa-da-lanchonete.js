

class CaixaDaLanchonete {


    // serve para ajustar a quantia de numeros após a virgula que se tem na saida
    toFixer(number) {
        return Number.parseFloat(number).toFixed(2);
    }

    //responssável por calcular o resultado de descontos/taxas baseada em percentual
    percent(number, percent){
        return number+((percent / 100) * number);
    }

    //método responssável por ler o array de input e retornar o valor bruto dos itens,
    // tendo já em si tratamento aos erros descobertos na fase
    reader(itens){
        //declaração em arrys do menu e de seus preços 
        const produto = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"];
        const preco = [3, 1.5, 6.2, 6.5, 2, 7.25, 9.5, 7.5];

        let valorTotal=0;
        let numeroItens=0;
        let indexItens=0;
        let index=0;
        let split=["",""];

        //variáveis de flag responssáveis por saber se é permitido o respectivo item opcional
        let cafe=0;
        let sanduiche=0;
        
        //loop responssáel por ler e tratar os itens do array
        while (indexItens<itens.length) {

            //percorre o array de input e procura na lista de produtos o item com identificador equivalente
            //obtendo seu index no processo, caso não seja encontrado, dispara o erro de item inválido
            split = itens[indexItens].split(",");
            console.log(split[0]);
            index = produto.indexOf(split[0]);
            if(index==-1){
                console.log("Item inválido!");
                return -1;
            }

            //busca no array de input a quantia desejada do item, novamente faz também o disparo de erro, se necessário
            numeroItens=split[1];
            if(numeroItens<1||isNaN(numeroItens)){
                console.log("Quantidade inválida!");
                return -2;
            }

            //switch responssável por verificar os itens sandwiche, queijo, café e chantily
            //e tratar as regras de itens opcionais 
            switch (index) {
                case 0:
                    cafe=1;
                    break;
                case 1:
                    if(cafe==0){
                        console.log("Item extra não pode ser pedido sem o principal");
                        return -3;
                    }
                    break;
                case 3:
                    sanduiche=1
                    break;
                case 4:
                    if(sanduiche==0){
                        console.log("Item extra não pode ser pedido sem o principal");
                        return -3;
                    }
                    break;
    
            }
            //calcula o valor atual do carrinho
            valorTotal=valorTotal+(preco[index]*numeroItens);
            //move para o próximo item do array
            indexItens = indexItens+1;
            }

        return valorTotal;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length==0){
            console.log("Não há itens no carrinho de compra!");
            return "Não há itens no carrinho de compra!";
        }

        let valor=0;
        valor=this.reader(itens);
        //checagem de se erro foi retornado e qual foi
        if(valor<0){
            switch (valor) {
                case -1:
                    return "Item inválido!";
                case -2:
                    return "Quantidade inválida!";
                case -3:
                    return "Item extra não pode ser pedido sem o principal";
            }
        }


        //Responssável por lidar com os métodos de pagamento e dar os desontos/txas adequados
        switch (metodoDePagamento) {
            case 'dinheiro':
                valor = this.percent(valor,-5);
                break;
            case 'debito':
                //não muda nada no valor no cenário de débito mas esse case ainda existe por ser um input válido
                break;
            case 'credito':
                valor = this.percent(valor,3);
                break;
            default:
            console.log("Forma de pagamento inválida!");
            return "Forma de pagamento inválida!";
        }

        //tratamento dos valores para a saida ser no formato padronizado
        valor=this.toFixer(valor);
        valor=valor.replace(".",",")
        return "R\$ ".concat(valor);
    }

}

export { CaixaDaLanchonete };
