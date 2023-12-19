
# Phone Book - Back

- Projeto criado para armazenar números, nomes e a idade de um contato, simulando uma agenda telefônica.


## Instalação

Instale as dependências do projeto phone-book com yarn.

```bash
  yarn
```

Suba o banco com o seguinte comando:

```bash
  yarn prisma db push
```

## Documentação da API

#### Retorna o contato

```http
  GET /api/contacts?search={nome|telefone}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `search` | `string` | **Obrigatório**. Aqui pode ser inserido o nome ou o número do telefone do contato para pesquisar sobre ele. |

#### Cria um contato

```http
  POST /api/contacts/
```

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `contact.name`      | `string` | **Obrigatório**. O nome do contato. |
| `contact.age`      | `number` | **Obrigatório**. A idade do contato. |
| `phone.number`      | `string` | **Obrigatório**. O número do telefone do contato. |

#### Edita um contato

```http
  PATCH /api/contacts/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. O identificador do contato. |

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `contact.name`      | `string` | **Opcional**. O nome do contato. |
| `contact.age`      | `number` | **Opcional**. A idade do contato. |
| `phone.number`      | `string` | **Opcional**. O número do telefone do contato. |

## Autores

- [GitHub](https://www.github.com/nicolascastro01)
- [LinkedIn](https://www.linkedin.com/in/nicolasyscastro)

