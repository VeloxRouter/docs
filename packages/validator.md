# VeloxRouter Validator

A high-performance, lightweight, and zero-dependency validation engine built for PHP 8.2+. Designed to be completely framework-agnostic and easy to use across web applications, APIs, CLI commands, or microservices.

---

## Installation

```bash
composer require veloxrouter/validator

```

---

## Usage Examples

### 1. Standalone Validation Example

Here is a basic example of how to initialize the validator with data and rules, check for failures, and retrieve structured errors:

```php
<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use VeloxRouter\Validator\Validator;

$data = [
    'name'  => 'John Doe',
    'email' => 'invalid-email',
    'age'   => 16
];

$rules = [
    'name'  => 'required|min:3|max:100',
    'email' => 'required|email',
    'age'   => 'required|numeric|min:18'
];

// Optional: Pass custom messages or locale ('pt' or 'en')
$validator = new Validator($data, $rules, [], 'en');

if ($validator->fails()) {
    $errors = $validator->errors();
    
    // Returns structured validation errors per field
    print_r($errors);
}

```

### 2. Integration inside a VeloxRouter Endpoint

You can easily use the validator inside an HTTP route to validate the incoming payload and return a formatted JSON response if the data is invalid:

```php
<?php

use VeloxRouter\Router;
use VeloxRouter\Validator\Validator;

$router = new Router();

$router->post('/api/users', function ($request, $response) {
    $body = $request->body();

    $rules = [
        'name'  => 'required|min:3',
        'email' => 'required|email',
        'role'  => 'required|oneof:admin,user,moderator'
    ];

    $validator = new Validator($body, $rules, [], 'en');

    if ($validator->fails()) {
        return $response->status(422)->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors'  => $validator->errors()
        ]);
    }

    // Proceed with business logic if validation passes...
    return $response->status(201)->json([
        'success' => true,
        'message' => 'User validated and created successfully!'
    ]);
});

```

---

## Supported Rules

| Rule | Description | Example |
| --- | --- | --- |
| `required` | Ensures the field is present and not empty. | `required` |
| `email` | Validates a standard email address format. | `email` |
| `url` | Validates a proper URL format. | `url` |
| `numeric` | Ensures the value is numeric. | `numeric` |
| `alpha` | Ensures the string contains only alphabetic characters. | `alpha` |
| `alphanum` | Ensures the string contains only alphanumeric characters. | `alphanum` |
| `uuid` | Validates a standard UUID format (v1-v5). | `uuid` |
| `min:value` | Minimum length for strings or minimum value for numbers. | `min:3` or `min:18` |
| `max:value` | Maximum length for strings or maximum value for numbers. | `max:255` or `max:100` |
| `oneof:a,b,c` | Ensures the value matches one of the provided options. | `oneof:admin,user,guest` |

---

## Custom Messages & Localization

You can specify custom error messages per field/rule or change the default language via the constructor locale parameter (`'pt'` or `'en'`).

```php
$messages = [
    'email.required' => 'The email address is required.',
    'email.email'    => 'Please enter a valid email address.'
];

$validator = new Validator($data, $rules,$messages, 'en');

```

---

## License

The MIT License (MIT). Please see [License File](https://www.google.com/search?q=LICENSE) for more information.
