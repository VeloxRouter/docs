# VeloxRouter Middlewares

Official enterprise-grade middleware collection for the [VeloxRouter](https://github.com/VeloxRouter/router) ecosystem (PHP 8.2+). Built for extreme performance, zero heavy dependencies, and full pipeline composability inspired by Fiber and .NET architectures.

## Installation

Install the package via Composer:

```bash
composer require veloxrouter/middlewares

```

---

## 🛠️ Complete Suite of 20 Middlewares

The VeloxRouter middleware suite is categorized into security, resilience, data management, performance optimization, and observability layers:

### 1. Authentication & Security

| Middleware | Description |
| --- | --- |
| **ApiKeyMiddleware** | Validates external API keys safely using constant-time string comparisons (`hash_equals`). |
| **BasicAuthMiddleware** | Validates HTTP Basic Authentication credentials using a custom closure validator. |
| **RpcAuthMiddleware** | Secures internal microservice-to-microservice communication via constant-time token matching. |
| **CorsMiddleware** | Handles Cross-Origin Resource Sharing (CORS) headers and OPTIONS preflight requests. |
| **SecurityHeadersMiddleware** | Applies industry-standard OWASP security headers (HSTS, X-Frame-Options, XSS protection). |

### 2. Resilience & Traffic Protection

| Middleware | Description |
| --- | --- |
| **RateLimiterMiddleware** | Protects endpoints against brute-force and abuse by limiting requests per IP/user. |
| **TimeoutMiddleware** | Enforces hard execution time limits returning HTTP 504 on long operations. |
| **IdempotencyMiddleware** | Prevents duplicate processing of state-changing requests (`POST`, `PUT`, `PATCH`). |
| **ErrorHandlerMiddleware** | Catches exceptions globally and standardizes error responses in clean JSON format. |

### 3. Data & Transactions

| Middleware | Description |
| --- | --- |
| **ValidationMiddleware** | Validates incoming payload data against defined rules before reaching controllers. |
| **JsonBodyMiddleware** | Ensures incoming request payloads strictly enforce `application/json`. |
| **TransactionMiddleware** | Wraps the HTTP request lifecycle inside atomic database transactions (`begin`, `commit`/`rollback`). |

### 4. Performance & Optimization

| Middleware | Description |
| --- | --- |
| **CacheMiddleware** | Caches full responses or fragments using fast backend drivers (e.g., APCu). |
| **GzipMiddleware** | Compresses outgoing response payloads using Gzip to optimize bandwidth consumption. |
| **EtagMiddleware** | Generates HTTP ETags for conditional `If-None-Match` validation checks. |

### 5. Observability & Utilities

| Middleware | Description |
| --- | --- |
| **RequestIdMiddleware** | Injects and tracks a unique `X-Request-ID` header into requests and responses. |
| **RequestLoggerMiddleware** | Provides clean, PSR-3 compliant request and response logging for observability. |
| **AuditLogMiddleware** | Records sensitive audit trails with context resolvers for compliance tracking. |
| **I18nMiddleware** | Extracts and injects localization and language context into headers and attributes. |
| **HealthCheckMiddleware** | Cloud-native health check endpoint provider (`/health`, `/health/live`, `/health/ready`). |

---

## 🚀 Practical Usage Examples

### 1. Global Pipeline (System-wide Setup)

Ideal for application-wide concerns like request tracing, security headers, and global error catching:

```php
use VeloxRouter\Router\Router;
use VeloxRouter\Middlewares\RequestIdMiddleware;
use VeloxRouter\Middlewares\SecurityHeadersMiddleware;
use VeloxRouter\Middlewares\RequestLoggerMiddleware;
use VeloxRouter\Middlewares\ErrorHandlerMiddleware;

$router = new Router();

$router->addGlobalMiddleware(new ErrorHandlerMiddleware());
$router->addGlobalMiddleware(new RequestIdMiddleware());
$router->addGlobalMiddleware(new SecurityHeadersMiddleware());
$router->addGlobalMiddleware(new RequestLoggerMiddleware($logger));

```

### 2. Public API Protection (Rate Limiting & API Key)

Ideal for protecting external-facing endpoints against brute-force attacks and unauthorized access:

```php
use VeloxRouter\Middlewares\RateLimiterMiddleware;
use VeloxRouter\Middlewares\ApiKeyMiddleware;

$router->get('/api/v1/stats', [StatsController::class, 'index'], [
    new RateLimiterMiddleware(maxAttempts: 60, decaySeconds: 60),
    new ApiKeyMiddleware($config->get('api_key'))
]);

```

### 3. Mutating Endpoint (Validation, JSON Enforcement & Database Transactions)

Ideal for data-writing endpoints (`POST`/`PUT`) where data integrity and automatic rollback on failure are critical:

```php
use VeloxRouter\Middlewares\JsonBodyMiddleware;
use VeloxRouter\Middlewares\ValidationMiddleware;
use VeloxRouter\Middlewares\TimeoutMiddleware;
use VeloxRouter\Middlewares\TransactionMiddleware;

$router->post('/api/v1/orders', [OrderController::class, 'store'], [
    new TimeoutMiddleware(10),
    new JsonBodyMiddleware(),
    new ValidationMiddleware([
        'product_id' => 'required|integer',
        'quantity' => 'required|integer|min:1'
    ]),
    new TransactionMiddleware($dbManager)
]);

```

---

## License

The VeloxRouter Middlewares package is open-source software licensed under the [MIT license](https://www.google.com/search?q=LICENSE).
