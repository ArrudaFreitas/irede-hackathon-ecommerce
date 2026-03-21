# Irede Hackathon E-commerce

## Rodando o projeto

### Primeira vez
Na primeira vez é necessário fazer o build da imagem antes de subir o container:
```bash
docker compose up --build
```

### Demais vezes
A imagem já está construída, basta subir o container:
```bash
docker compose up
```

Em ambos os casos, para manter o terminal livre adicione `-d`:
```bash
docker compose up --build -d
docker compose up -d
```

### Parando o projeto
```bash
docker compose down
```

O projeto estará disponível em `http://localhost:5173`