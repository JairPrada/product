# HU-PM-002: Autenticacion de usuarios

## Descripcion

**Como** microservicio de productos  
**Quiero** validar credenciales de usuarios  
**Para** autenticar el acceso al sistema bancario

## Criterios de Aceptacion

| # | Criterio | Validacion |
|---|----------|------------|
| 1 | Recibe numero de documento y contrasena | POST `/auth/login` |
| 2 | Busca usuario por numero de documento | Query MongoDB |
| 3 | Compara contrasena con hash almacenado | bcrypt.compare() |
| 4 | Genera JWT token si credenciales validas | accessToken |
| 5 | Retorna datos del usuario autenticado | fullName, userId |

## Datos Tecnicos

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "documentNumber": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "fullName": "string",
  "userId": "string",
  "isRegistered": true
}
```

## Diagrama de Secuencia

```mermaid
sequenceDiagram
    participant AG as API Gateway
    participant C as Controller
    participant R as Repository
    participant DB as MongoDB

    AG->>C: POST /auth/login
    C->>R: findByDocument(docNumber)
    R->>DB: findOne({ documentNumber })
    DB-->>R: UserDocument
    R-->>C: User
    C->>C: bcrypt.compare(password, hash)
    alt Credenciales validas
        C->>C: Generar JWT
        C-->>AG: LoginResponse + Token
    else Credenciales invalidas
        C-->>AG: 401 Unauthorized
    end
```

## Archivos Relacionados

- `src/modules/auth/services/auth.controller.ts`
- `src/modules/auth/core/use-cases/login.use-case.ts`
- `src/modules/users/repository/users.repository.mongo.ts`
