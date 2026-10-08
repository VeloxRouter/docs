# VeloxRouter RPC

Official JSON-RPC 2.0 microservices communication and dispatching package for the [VeloxRouter](https://github.com/VeloxRouter/router) ecosystem. Built for high performance, zero unnecessary dependencies, and enterprise-grade distributed tracing.

## Installation

Install the package via Composer:

```bash
composer require veloxrouter/rpc

```

---

## Features

* **JSON-RPC 2.0 Specification**: Full compliance with the protocol for requests, responses, and errors.
* **Distributed Tracing**: Automatic generation and propagation of correlation IDs (`X-Correlation-ID`) across services.
* **Robust Error Handling**: Typed exceptions and standardized error codes.
* **Zero Dependencies**: Lightweight, standalone, and optimized for high-throughput microservices.

---

## Usage Examples

### 1. Initializing and Calling a Remote Service

Here is how you initialize the `JsonRpcClient` pointing to your microservice endpoint and invoke a remote method with parameters:

```php
<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use VeloxRouter\Rpc\JsonRpcClient;

// Initialize the RPC client pointing to the remote microservice
$client = new JsonRpcClient(
    endpoint: '[https://billing-service.internal/rpc](https://billing-service.internal/rpc)',
    defaultHeaders: [
        'Authorization: Bearer secret-service-token'
    ],
    timeout: 10
);

try {
    // Invoke a remote procedure call (e.g., generating an invoice)
    $result =$client->call(
        method: 'invoice.generate',
        params: [
            'user_id' => 42,
            'amount' => 150.00,
            'currency' => 'USD'
        ]
    );

    echo "Invoice generated successfully! ID: " . $result['invoice_id'];

} catch (\VeloxRouter\Rpc\JsonRpcError $e) {
    // Handle specific JSON-RPC protocol errors returned by the remote service
    echo "RPC Error [{$e->getCode()}]: {$e->getMessage()}";

} catch (\RuntimeException $e) {
    // Handle network, timeout, or cURL transport errors
    echo "Transport/System Error: " . $e->getMessage();
}

```

### 2. Customizing Correlation IDs for Distributed Tracing

If you want to track requests across multiple microservices using your own tracing headers, you can pass a custom correlation ID directly into the call:

```php
use VeloxRouter\Rpc\JsonRpcClient;

$client = new JsonRpcClient('[https://inventory-service.internal/rpc](https://inventory-service.internal/rpc)');

$customCorrelationId = 'trace-abc-123-xyz';

$stockStatus =$client->call(
    method: 'stock.check',
    params: ['sku' => 'PROD-9988'],
    id: 101,
    correlationId: $customCorrelationId
);

```

---

## License

The VeloxRouter RPC package is open-source software licensed under the [MIT license](https://www.google.com/search?q=LICENSE).
