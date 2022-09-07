# Streams 

***OBS: Para mais informação sobre as streams em si, seu funcionamento, veja a branch main desse repositório***

O assunto desse repository é steams e nada mais claro do que exemplificar com algo real.
O protocolo http usa streams por baixo dos panos e por isso ele é um dos melhores exemplos a se seguir quando queremos aprender sobre streams.

# /entities/http-request.ts

Aqui temos nossa classe base para realizar requisições com o protocolo http. Não iremos usar nenhuma biblioteca externa, pois o intuito é entender o que se passa por baixo de um axios/fetch entre outros.

### GET Method

O método GET é o melhor para exemplificar as streams, já que ele retorna dados(writable) para o cliente e esses dados virão em formas de chucks(pedaços do readable).

```ts
import https from 'https';

httpGet(options: OptionsI) {
        return new Promise(((resolve, reject) => {
            const request = https.request(options, (response) => {
                response.setEncoding('utf8');

                let data = '';
            
                response.on('data', (chunk) => {
                    data += chunk;
                });
        
                response.on('end', () => {
                  resolve(JSON.parse(data));
                });
        
                response.on('error', (error) => {
                    reject(error);
                });
            });
            
            request.end();
        }));
    }
```

***Essa é nosso método completo, irei explicar o que está acontecendo nele.**

- Primeiramente, recebemos um parâmetro chamado options, ele será um objeto que traz as informações necessárias, de url, path, headers, method, entre outros para que a requisição http possa ser concluída com sucesso. Achei necessário deixar ele como parâmetros, pois tudo pode variar de api para api então o usuário fica livre para nos mandar o que for necessário.


```ts
httpGet(options: OptionsI) {}
```

- Em seguida já termos o retorno da função, ele será uma promise, pois qualquer requisição http GET pode retorna 200(ok) ou algum erro, em promises chamamos isso de resolve, reject. Em que o resolve indicará que tudo deu certo e retornará algo para quem chama o método e o reject indica um erro podendo receber como parâmetro a razão desse erro, também retornando algo para o usuário(nesse caso o erro).

```ts
return new Promise(((resolve, reject) => {});
```

- Agora vamos usar a biblioteca do node.js chamada HTTPS que nos ajudará a fazer as requisições e obter um determinado resultado. Ela possui o método request, o qual permite fazer requisições recebendo os options, além disso, ela também recebe uma função, a qual nos permitirá usar o paramêtro response para manipular a resposta do servidor.

```ts
const request = https.request(options, (response) => {});
```

- Depois disso, vamos começar a trabalhar em si com as streams, mas antes precisamos declarar algumas coisas, como é o caso do encoding. Geralmente, o transform stream e o writable stream recebem como segundo parâmetro o enconding.

***enconging: representam letras do alfabeto, pontuação, etc. Todo esses conteúdos são armazenados em um computador como uma sequência de bytes, que são valores númericos. Em alguns casos um simples caractere é representado por mais de um byte. Tal como os códigos usados em espionagem a maneira como uma sequência de bytes é convertida em caracteres depende do formato como o conteúdo foi codificado. Nesse contexto tal formato é denominado codificação de caracteres.***

Nesse nosso caso, a gente já seta essa informação no response, pois ele possui um método para isso.

```ts
response.setEncoding('utf8');
```

- Podemos enfim partir para os métodos de eventos. Como sabemos, a class Stream herda da Events. Então podemos ter vários eventos alocados para dentro das nossas streams. Ou seja, quando chegar um dado para esse evento eles virão em formato de buffer(pedaços de chucks) e conseguiremos usar o writable para retorna esse dado de alguma forma.

Antes disso, aqui eu decidi que queria transformar esse data em um json, isso porque em um problema que tive que resolver, o qual eu não podia usar apis externas(problemas para treinamento das minhas qualificações no javascript), eu precisei pegar o dado que veio da requisição e transformá-lo em json. Para isso, irei criar uma variável let(pertencente apenas a esse escopo) e mais para frente irei acrescentar nela o valor que veio na requisição.

```ts
let data: string = '';
```

- Agora sim podemos escutar o evento de **data** que vem da response. Essa dado vem em forma de chuck, isso quer dizer que vem de pedaço em pedaço, então não posso simplesmente atribuir o valor do chuck a minha let data, por exemplo: data = chuck, isso porque nosso dado não iria vim completo. Então, precisamos a cada chuck que vier, concatenar nessa variável.

***OBS: Todo chuck é uma string***

```ts
response.on('data', (chunk) => {
    data += chunk;
});
```

- Nesse etapa, ainda não temos nosso json feito, para isso existe outro evento que irá nos ajudar. Esse evento é o ***end***, ele nos diz que a transmissão de dados já acabou, ou seja, todo os chucks já foram entregues. Então nossa variável data já está completa e agora só precisamos transformar essa string em um json. É importante pensar que aqui a gente está finalizando o evento, ou seja, quando todos os chucks tudo isso irá sumir, pois já está finalizado. Se você simplesmente transformar a string num json e tentar "retornar" ele, isso não funcionará(experiência própria haha), para sanar esse problema a gente usa o ***resolve***, ele irá receber nosso json e retornar para quem chamar esse método.

```ts
response.on('end', () => {
    resolve(JSON.parse(data));
});
```

- Mas nem tudo são flores, certo? Tudo está aberto a erros. Por isso, não podemos deixar de tratar um possível erro, para resolver isso usamos o evento de ***error***. Aqui a gente simplesmente dar um reject e coloca o erro como parâmetro para debugarmos.

```ts
response.on('error', (error) => {
    reject(error);
});
```

- Ainda há algo que precisamos fazer: precisamos fechar a nossa variável request para dizermos que tudo está finalizado e que a promise pode devolver o resolve ou o reject para quem requisitou o método.

```ts
request.end();
```

# Considerações finais.

Aqui aprendemos como a troca de dados usando streams acontece no http. Isso é muito importante de um dev saber, espero que tenha entendido e qualquer contribuição é bem vinda <3. Vale lembrar que esse conteúdo foi feito com TDD, todos os testes foram criados antes, procurei pelas options, pelas apis gratuitas, escrevi os mocks e assim testei.