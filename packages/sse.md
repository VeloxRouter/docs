# VeloxRouter SSE

A lightweight, high-performance, **zero-dependency** Server-Sent Events (SSE) library for PHP. Designed to integrate seamlessly with modern routing engines like [VeloxRouter](https://github.com/VeloxRouter/router).

## Installation

Install via Composer:

```bash
composer require veloxrouter/sse

```

## Requirements

* **PHP:** 8.1 or higher (fully compatible with PHP 8.2+ features like `readonly` classes).

---

## Usage Example

### 1. Backend Route (`PHP`)

Aqui tens um exemplo prático de como utilizar o `SseStream` e o DTO imutável `SseEvent` dentro duma rota:

```php
<?php

declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

use VeloxRouter\Router;
use VeloxRouter\Sse\SseStream;
use VeloxRouter\Sse\SseEvent;

$router = new Router();

// Define a route for Server-Sent Events
$router->get('/stream', function ($request, $response) {
    // 1. Initialize the SSE headers, buffers and time limit
    SseStream::start();

    $counter = 0;

    // 2. Real-time loop
    while (!SseStream::isAborted()) {
        $counter++;

        // Send data using the immutable SseEvent DTO
        $sent = SseStream::send(new SseEvent(
            data: [
                'message' => 'Real-time update from VeloxRouter SSE!',
                'count' => $counter,
                'time' => date('H:i:s')
            ],
            name: 'notification',
            id: (string) $counter,
            retry: 3000 // Instruct the browser to reconnect after 3s if disconnected
        ));

        // If writing/flushing failed (client aborted), break the loop
        if (!$sent) {
            break;
        }

        // Wait 3 seconds before next push
        sleep(3);
    }
});

// Run the router
$router->run();

```

### 2. Frontend Consumer (`HTML / JavaScript`)

Para consumir este stream de eventos no navegador, podes utilizar a API nativa `EventSource`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>VeloxRouter SSE Client</title>
</head>
<body>
    <h1>Real-time Events Feed</h1>
    <div id="status">Connecting...</div>
    <ul id="events"></ul>

    <script>
        const statusEl = document.getElementById('status');
        const eventsList = document.getElementById('events');

        // Connect to the VeloxRouter SSE endpoint
        const eventSource = new EventSource('/stream');

        eventSource.onopen = () => {
            statusEl.textContent = 'Connected (Listening for updates...)';
            statusEl.style.color = 'green';
        };

        // Listen for custom event name 'notification' sent from PHP
        eventSource.addEventListener('notification', (event) => {
            const data = JSON.parse(event.data);
            
            const li = document.createElement('li');
            li.textContent = `[${data.time}] #${data.count}: ${data.message}`;
            eventsList.appendChild(li);
        });

        eventSource.onerror = (error) => {
            statusEl.textContent = 'Connection lost. Reconnecting...';
            statusEl.style.color = 'orange';
        };
    </script>
</body>
</html>

```

---

## Features

* **Zero Dependencies:** Core implementation relying solely on native PHP features.
* **Immutable DTO (`SseEvent`):** Strict data validation and memory safety using modern PHP features.
* **Protocol Safe:** Built-in line break validation to prevent SSE header injection or formatting corruption.
* **Output Buffer Cleaning:** Cleans nested output buffers automatically to guarantee real-time delivery.
* **Connection Monitoring:** Native tracking via `connection_aborted()` to instantly drop dead background loops.

---

## License

The MIT License (MIT). Please see [License File](https://www.google.com/search?q=LICENSE) for more information.
