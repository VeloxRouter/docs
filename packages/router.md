# Router Core

> A lightning-fast, lightweight HTTP routing engine built for modern PHP 8.2+.

`veloxrouter/router` is the core routing engine of the VeloxRouter ecosystem. Inspired by high-performance frameworks, it is designed for maximum speed, clean architecture, and zero unnecessary bloat.

## Installation

Install the package via Composer:

```bash
composer require veloxrouter/router

```

---

## Server Configuration

To ensure that all incoming HTTP requests are properly handled, point your web server document root to the `public/` directory and use a front controller setup (`public/index.php`) along with URL rewriting (such as Apache `.htaccess` or Nginx configuration).

---

## Complete Usage Guide

Here is a comprehensive example demonstrating how to handle different HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), path parameters, strict regex validations, and query string parameters:

```php
<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use VeloxRouter\Router;

$router = new Router();

// 1. Simple GET route
$router->get('/users', function ($request, $response) {
    $users = [
        ['id' => 1, 'name' => 'Ana Silva'],
        ['id' => 2, 'name' => 'Carlos Santos']
    ];

    return $response->json($users);
});

// 2. Multiple Path Parameters (e.g., /products/{category}/{id})
$router->get('/products/{category}/{id}', function ($request, $response, array $params) {
    $category = $params['category'] ?? null;
    $id = $params['id'] ?? null;

    return $response->json([
        'source' => 'path_parameters',
        'category' => $category,
        'product_id' => $id,
        'message' => "Product {$id} found in category {$category}"
    ]);
});

// 3. Query String Parameters (e.g., /search?q=velox&sort=desc)
$router->get('/search', function ($request, $response) {
    $keyword = $request->query('q', 'default_query');
    $sort = $request->query('sort', 'asc');
    $allQueryParameters = $request->query();

    return $response->json([
        'source' => 'query_string',
        'keyword' => $keyword,
        'sort' => $sort,
        'all_params' => $allQueryParameters
    ]);
});

// 4. Combined Path Parameters & Query Strings with Regex Validation
$router->get('/users/{id:[0-9]+}', function ($request, $response, array $params) {
    $userId = $params['id'] ?? null;
    $includeProfile = $request->query('include', false);

    return $response->json([
        'success' => true,
        'user_id' => $userId,
        'include_profile' => $includeProfile,
        'message' => "Details for user {$userId}"
    ]);
})->name('users.show');

// 5. POST route (Creation)
$router->post('/users', function ($request, $response) {
    $data = $request->body();

    return $response->status(201)->json([
        'message' => 'User created successfully!',
        'data' => $data
    ]);
});

// 6. PUT route (Full update)
$router->put('/users/{id:[0-9]+}', function ($request, $response, array $params) {
    $userId = $params['id'] ?? null;
    $data = $request->body();

    return $response->json([
        'success' => true,
        'action' => 'PUT',
        'user_id' => $userId,
        'message' => "User {$userId} fully updated successfully!",
        'data' => $data
    ]);
});

// 7. PATCH route (Partial update)
$router->patch('/users/{id:[0-9]+}', function ($request, $response, array $params) {
    $userId = $params['id'] ?? null;
    $data = $request->body();

    return $response->json([
        'success' => true,
        'action' => 'PATCH',
        'user_id' => $userId,
        'message' => "User {$userId} partially updated successfully!",
        'data' => $data
    ]);
});

// 8. DELETE route (Removal)
$router->delete('/users/{id:[0-9]+}', function ($request, $response, array $params) {
    $userId = $params['id'] ?? null;

    return $response->status(200)->json([
        'success' => true,
        'action' => 'DELETE',
        'user_id' => $userId,
        'message' => "User {$userId} deleted successfully!"
    ]);
});

// Dispatch the application
$router->run();

```

---

## Benchmark Performance

VeloxRouter uses a dual-storage strategy (an $O(1)$ hash dictionary for static routes and an optimized engine for dynamic routes), ensuring maximum throughput with zero extra memory allocation at peak loads.

| Test Scenario | Iterations | Average per Exec | Throughput (Ops/sec) | Memory (Peak) |
| --- | --- | --- | --- | --- |
| **Static Route Match** | 50,000 | 1.43 µs | **~698,529 ops/s** | 0.00 KB |
| **Typed Parameter Match (`/users/42`)** | 20,000 | 14.65 µs | **~68,251 ops/s** | 0.00 KB |
| **Complex Dynamic Route Match** | 20,000 | 13.95 µs | **~71,707 ops/s** | 0.00 KB |
| **Named Route URL Generation** | 50,000 | 2.82 µs | **~354,977 ops/s** | 0.00 KB |
| **Not Found Match (404)** | 20,000 | 13.16 µs | **~75,984 ops/s** | 0.00 KB |
