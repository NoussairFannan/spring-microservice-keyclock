# Architecture Microservices avec Spring Boot et Keycloak

## Vue d'ensemble

Ce projet présente une architecture microservices complète construite avec Spring Boot et sécurisée par Keycloak. Il démontre les patterns modernes de développement d'applications distribuées, incluant la découverte de services, l'API Gateway, et la gestion centralisée de l'authentification et des autorisations.

## Architecture du Système

### Diagramme d'Architecture Globale

```
                            ┌─────────────────────┐
                            │   Frontend React    │
                            │   (Port: 3000)      │
                            └──────────┬──────────┘
                                       │
                                       │ HTTPS
                                       ▼
                            ┌─────────────────────┐
                            │    Keycloak         │
                            │  (Auth Server)      │
                            │  (Port: 8080)       │
                            └──────────┬──────────┘
                                       │ OAuth2/OIDC
                                       ▼
┌────────────────────────────────────────────────────────────┐
│                     API Gateway                            │
│                  (Spring Cloud Gateway)                    │
│                     (Port: 8888)                           │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Routing                                           │  │
│  │  • Load Balancing                                    │  │
│  │  • Security Filters                                  │  │
│  │  • Rate Limiting                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└────────┬─────────────────┬────────────────────┬────────────┘
         │                 │                    │
         │                 │                    │
         ▼                 ▼                    ▼
┌──────────────┐  ┌──────────────┐    ┌──────────────┐
│   Produit    │  │  Commande    │    │   Autres     │
│   Service    │  │   Service    │    │  Services    │
│ (Port: 8081) │  │ (Port: 8082) │    │              │
└──────┬───────┘  └──────┬───────┘    └──────────────┘
       │                 │
       │                 │
       └────────┬────────┘
                │
                ▼
       ┌──────────────────┐
       │ Discovery Service│
       │    (Eureka)      │
       │  (Port: 8761)    │
       └──────────────────┘
```

### Architecture Détaillée des Microservices

```
┌─────────────────────────────────────────────────────────────┐
│                    COUCHE PRÉSENTATION                      │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Frontend React                          │   │
│  │  • React 18+                                         │   │
│  │  • React Router                                      │   │
│  │  • Keycloak JS Adapter                               │   │
│  │  • Axios pour HTTP                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    COUCHE SÉCURITÉ                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Keycloak (IAM)                          │   │
│  │  • Authentification                                  │   │
│  │  • Autorisation (RBAC)                               │   │
│  │  • Single Sign-On (SSO)                              │   │
│  │  • Gestion des tokens JWT                            │   │
│  │  • User Federation                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  COUCHE API GATEWAY                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Spring Cloud Gateway                         │   │
│  │  • Routage dynamique                                 │   │
│  │  • Filtres de sécurité                               │   │
│  │  • Circuit Breaker                                   │   │
│  │  • Rate Limiting                                     │   │
│  │  • Load Balancing                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌───────────────────────────────────────────────────────────────┐
│               COUCHE SERVICE DISCOVERY                        │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐     │
│  │         Eureka Discovery Service                     │     │
│  │  • Enregistrement des services                       │     │
│  │  • Health checks                                     │     │
│  │  • Load balancing côté client                        │     │
│  │  • Service metadata                                  │     │
│  └──────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   COUCHE MÉTIER                             │
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐       │
│  │  Produit Service    │      │  Commande Service   │       │
│  │                     │      │                     │       │
│  │  • API REST         │      │  • API REST         │       │
│  │  • Business Logic   │◄────►│  • Business Logic   │       │
│  │  • Security Config  │      │  • Security Config  │       │
│  │  • Data Access      │      │  • Data Access      │       │
│  └─────────┬───────────┘      └─────────┬───────────┘       │
│            │                            │                   │
└────────────┼────────────────────────────┼───────────────────┘
             ▼                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    COUCHE DONNÉES                           │
│                                                             │
│  ┌──────────────┐                    ┌──────────────┐       │
│  │  Base de     │                    │  Base de     │       │
│  │  données     │                    │  données     │       │
│  │  Produits    │                    │  Commandes   │       │
│  └──────────────┘                    └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Architecture de Sécurité

### Flux d'Authentification OAuth2/OIDC

```
1. Demande d'accès
   Frontend → Gateway → Redirection vers Keycloak

2. Authentification
   Utilisateur → Keycloak (Login) → Token JWT

3. Accès aux ressources
   Frontend + Token → Gateway (Validation) → Microservice

4. Validation du token
   Gateway → Keycloak (Introspection) → Autorisation

5. Réponse
   Microservice → Gateway → Frontend
```

### Configuration de Sécurité par Service

#### Gateway (Spring Cloud Gateway)
- Validation des tokens JWT
- Routage basé sur les rôles
- Rate limiting par utilisateur
- CORS configuration

#### Microservices (Produit & Commande)
- Resource Server OAuth2
- Méthode-level security (@PreAuthorize)
- Role-based access control
- Endpoints protégés

## Composants du Système

### 1. **Discovery Service (Eureka)**
**Port** : 8761

**Responsabilités** :
- Enregistrement automatique des microservices
- Heartbeat monitoring
- Load balancing côté client
- Service metadata management

**Configuration clé** :
```yaml
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
  server:
    enable-self-preservation: false
```

### 2. **Gateway Service (Spring Cloud Gateway)**
**Port** : 8888

**Responsabilités** :
- Point d'entrée unique (Single Entry Point)
- Routage intelligent vers les microservices
- Security layer (JWT validation)
- Cross-cutting concerns (logging, monitoring)
- Circuit breaker pattern

**Routes principales** :
```
/api/produits/** → Produit Service
/api/commandes/** → Commande Service
```

**Filtres appliqués** :
- Authentication Filter
- Authorization Filter
- Rate Limiting Filter
- Logging Filter

### 3. **Produit Service**
**Port** : 8081

**Responsabilités** :
- Gestion du catalogue de produits
- CRUD operations sur les produits
- Business logic métier
- API REST exposée

**Endpoints principaux** :
```
GET    /api/produits          # Liste tous les produits
GET    /api/produits/{id}     # Détails d'un produit
POST   /api/produits          # Créer un produit (ADMIN)
PUT    /api/produits/{id}     # Modifier un produit (ADMIN)
DELETE /api/produits/{id}     # Supprimer un produit (ADMIN)
```

**Sécurité** :
- Lecture : PUBLIC
- Écriture : ADMIN only

### 4. **Commande Service**
**Port** : 8082

**Responsabilités** :
- Gestion des commandes clients
- Validation des commandes
- Communication avec Produit Service
- Historique des commandes

**Endpoints principaux** :
```
GET    /api/commandes              # Liste des commandes
GET    /api/commandes/{id}         # Détails d'une commande
POST   /api/commandes              # Créer une commande (USER)
GET    /api/commandes/user/{id}    # Commandes par utilisateur
PUT    /api/commandes/{id}/status  # Modifier statut (ADMIN)
```

**Sécurité** :
- Commandes personnelles : USER authentifié
- Toutes les commandes : ADMIN only

### 5. **Keycloak**
**Port** : 8080

**Configuration** :
- Realm : `microservices-realm`
- Clients configurés :
  - `gateway-client` (confidential)
  - `frontend-client` (public)
  - `produit-service` (bearer-only)
  - `commande-service` (bearer-only)

**Rôles définis** :
- `USER` : Utilisateur standard
- `ADMIN` : Administrateur
- `MANAGER` : Gestionnaire

**Flux de tokens** :
```
Access Token (JWT) :
{
  "sub": "user-id",
  "realm_access": {
    "roles": ["USER", "ADMIN"]
  },
  "resource_access": {
    "produit-service": {
      "roles": ["read", "write"]
    }
  },
  "exp": 1234567890
}
```

### 6. **Frontend React**
**Port** : 3000

**Fonctionnalités** :
- Interface utilisateur responsive
- Authentification via Keycloak
- Gestion des produits (affichage/création)
- Gestion des commandes
- Routing côté client

**Structure des pages** :
```
/                    # Accueil
/login              # Authentification (redirect Keycloak)
/produits           # Liste des produits
/produits/new       # Créer un produit (ADMIN)
/commandes          # Mes commandes
/commandes/new      # Nouvelle commande
/admin              # Dashboard admin
```

## Pipeline de Communication

### Scénario : Création d'une Commande

```
1. User Interface
   Frontend React → Clic "Nouvelle Commande"

2. Authentication Check
   Frontend → Keycloak → Vérification Token valide

3. API Call
   Frontend → Gateway (/api/commandes)
   Headers: Authorization: Bearer {token}

4. Gateway Processing
   • Validation du token JWT
   • Route resolution (Discovery Service)
   • Forward vers Commande Service

5. Commande Service
   • Validation des données
   • Appel Produit Service (vérifier stock)
   • Sauvegarde en base de données

6. Inter-service Communication
   Commande Service → Gateway → Produit Service
   (vérification disponibilité produits)

7. Response
   Commande Service → Gateway → Frontend
   Status: 201 Created
   Body: {commande créée}
```

## Architecture Docker

### Services Docker Compose

```yaml
Services déployés :
├── keycloak
│   ├── Image: quay.io/keycloak/keycloak
│   ├── Port: 8080
│   └── Base de données: PostgreSQL
│
├── postgres (Keycloak DB)
│   ├── Image: postgres
│   └── Port: 5432
│
├── discovery-service
│   ├── Build: ./discovery-service
│   └── Port: 8761
│
├── gateway-service
│   ├── Build: ./gateway-service
│   ├── Port: 8888
│   └── Depends: discovery-service, keycloak
│
├── produit-service
│   ├── Build: ./produit-service
│   ├── Port: 8081
│   └── Depends: discovery-service, keycloak
│
├── commande-service
│   ├── Build: ./commande-service
│   ├── Port: 8082
│   └── Depends: discovery-service, keycloak, produit-service
│
└── frontend-react
    ├── Build: ./frontend-react
    ├── Port: 3000
    └── Depends: gateway-service
```

### Network Configuration

```
Network: microservices-network (bridge)
- Permet la communication inter-conteneurs
- Résolution DNS automatique par nom de service
- Isolation du réseau externe
```

## Déploiement

### Prérequis

- Docker Engine 20.10+
- Docker Compose 2.0+
- Maven 3.8+ (pour build local)
- Node.js 16+ (pour frontend)
- 4 GB RAM minimum

### Démarrage Complet

```bash
# Cloner le repository
git clone https://github.com/NoussairFannan/spring-microservice-keyclock.git
cd spring-microservice-keyclock

# Build et démarrage de tous les services
docker-compose up -d --build

# Vérifier les services
docker-compose ps

# Suivre les logs
docker-compose logs -f
```

### Ordre de Démarrage (Géré par depends_on)

1. PostgreSQL (DB Keycloak)
2. Keycloak
3. Discovery Service (Eureka)
4. Gateway Service
5. Microservices (Produit, Commande)
6. Frontend React

### Configuration Keycloak (Premier Démarrage)

```bash
# Accéder à Keycloak Admin Console
http://localhost:8080/admin

# Importer la configuration
# Utiliser le fichier: keycloak-config/realm-export.json

# Ou configurer manuellement :
1. Créer realm "microservices-realm"
2. Créer clients (gateway, frontend, services)
3. Configurer les rôles
4. Créer des utilisateurs de test
```

## Monitoring et Supervision

### Endpoints de Monitoring

| Service | Actuator | Dashboard |
|---------|----------|-----------|
| Discovery | http://localhost:8761/actuator | http://localhost:8761 |
| Gateway | http://localhost:8888/actuator | - |
| Produit | http://localhost:8081/actuator | - |
| Commande | http://localhost:8082/actuator | - |

### Health Checks

```bash
# Vérifier la santé de chaque service
curl http://localhost:8761/actuator/health  # Discovery
curl http://localhost:8888/actuator/health  # Gateway
curl http://localhost:8081/actuator/health  # Produit
curl http://localhost:8082/actuator/health  # Commande
```

### Logs Centralisés

```bash
# Logs d'un service spécifique
docker-compose logs -f gateway-service

# Logs de tous les services
docker-compose logs -f

# Logs avec timestamp
docker-compose logs -f --timestamps
```

##  Structure du Projet

```
spring-microservice-keyclock/
├── discovery-service/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── org/sdia/discoveryservice/
│   │       │       └── DiscoveryServiceApplication.java
│   │       └── resources/
│   │           └── application.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── gateway-service/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── org/sdia/gateway/
│   │       │       ├── GatewayApplication.java
│   │       │       ├── config/
│   │       │       │   └── SecurityConfig.java
│   │       │       └── filter/
│   │       └── resources/
│   │           └── application.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── produit-service/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── org/sdia/produit/
│   │       │       ├── ProduitServiceApplication.java
│   │       │       ├── controller/
│   │       │       ├── service/
│   │       │       ├── repository/
│   │       │       ├── model/
│   │       │       └── config/
│   │       └── resources/
│   │           └── application.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── commande-service/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── org/sdia/commande/
│   │       │       ├── CommandeServiceApplication.java
│   │       │       ├── controller/
│   │       │       ├── service/
│   │       │       ├── repository/
│   │       │       ├── model/
│   │       │       ├── client/
│   │       │       └── config/
│   │       └── resources/
│   │           └── application.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend-react/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── config/
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── keycloak-config/
│   └── realm-export.json
│
├── docker-compose.yml
├── pom.xml (parent)
└── .gitignore
```

## Configuration

### Application Properties

#### Discovery Service (application.yml)
```yaml
server:
  port: 8761

spring:
  application:
    name: discovery-service

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
```

#### Gateway Service (application.yml)
```yaml
server:
  port: 8888

spring:
  application:
    name: gateway-service
  cloud:
    gateway:
      routes:
        - id: produit-service
          uri: lb://PRODUIT-SERVICE
          predicates:
            - Path=/api/produits/**
        - id: commande-service
          uri: lb://COMMANDE-SERVICE
          predicates:
            - Path=/api/commandes/**
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://keycloak:8080/realms/microservices-realm
```

## Patterns et Concepts Démontrés

### Patterns Architecturaux

1. **API Gateway Pattern**
   - Point d'entrée unique
   - Routage et composition
   - Cross-cutting concerns

2. **Service Discovery Pattern**
   - Enregistrement automatique
   - Load balancing
   - Health checking

3. **Circuit Breaker Pattern**
   - Resilience4j integration
   - Fallback mechanisms
   - Fault tolerance

4. **Security Pattern**
   - OAuth2/OIDC
   - JWT tokens
   - Role-based access control

### Concepts Microservices

- **Loose Coupling** : Services indépendants
- **High Cohesion** : Responsabilité unique par service
- **Autonomy** : Déploiement indépendant
- **Resilience** : Tolérance aux pannes
- **Scalability** : Scaling horizontal possible

## Sécurité

### Niveaux de Sécurité

1. **Network Level** : Docker network isolation
2. **Gateway Level** : JWT validation, rate limiting
3. **Service Level** : Resource server configuration
4. **Method Level** : @PreAuthorize annotations
5. **Data Level** : User-owned resources

### Configuration CORS

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          '[/**]':
            allowed-origins: "http://localhost:3000"
            allowed-methods:
              - GET
              - POST
              - PUT
              - DELETE
            allowed-headers: "*"
```

## Technologies Utilisées

### Backend

| Technologie | Version | Usage |
|-------------|---------|-------|
| Spring Boot | 3.x | Framework principal |
| Spring Cloud Gateway | 4.x | API Gateway |
| Spring Cloud Netflix Eureka | 4.x | Service Discovery |
| Spring Security OAuth2 | 6.x | Sécurité |
| Keycloak | 23.x | IAM |
| PostgreSQL | 15 | Base de données |
| Docker | 24.x | Conteneurisation |

### Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 18.x | UI Framework |
| React Router | 6.x | Routing |
| Axios | 1.x | HTTP Client |
| Keycloak JS | 23.x | Auth Integration |

## Notes de Présentation

### Points Clés pour la Présentation

1. **Architecture Microservices Complète**
   - Découplage des services
   - Communication via API Gateway
   - Service discovery automatique

2. **Sécurité Robuste**
   - IAM centralisé avec Keycloak
   - OAuth2/OIDC standard
   - JWT tokens
   - RBAC (Role-Based Access Control)

3. **Scalabilité et Résilience**
   - Scaling horizontal
   - Circuit breaker
   - Load balancing automatique

4. **DevOps et Conteneurisation**
   - Docker Compose orchestration
   - Infrastructure as Code
   - Portabilité complète

5. **Patterns Modernes**
   - API Gateway pattern
   - Service Discovery
   - Centralized Configuration (potentiel)
   - Distributed Tracing (potentiel avec Zipkin)
