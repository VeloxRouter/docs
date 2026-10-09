---
layout: home

hero:
  name: VeloxRouter Docs
  text: High-performance PHP ecosystem
  tagline: Zero-bloat routing, SSE, validation, and enterprise middlewares inspired by Go Fiber and Python FastAPI.
  actions:
    - theme: brand
      text: Router Core
      link: /packages/router
    - theme: alt
      text: Middlewares
      link: /packages/middlewares
    - theme: alt
      text: SSE Streaming
      link: /packages/sse
    - theme: alt
      text: Validator
      link: /packages/validator
    - theme: alt
      text: RPC
      link: /packages/rpc
---

<div class="content-container" style="max-width: 1152px; margin: 0 auto; padding: 4rem 2rem;">

## 🚀 The Philosophy

Traditional frameworks often introduce heavy abstractions, bloated dependency trees, and hidden performance penalties. **VeloxRouter** strips away the complexity while keeping safety, speed, and developer experience (DX) intact for modern PHP 8.2+.

- **Zero-Dependency Core:** Lightweight, fast, and independent codebases.
- **Framework Agnostic:** Easily integrate individual components into existing applications or microservices.
- **Predictable & Fast:** Optimized memory allocation and lightning-fast execution times.

---

## 📦 Ecosystem Packages

VeloxRouter is a modular ecosystem built for developers who demand speed and clean architecture:

| Package | Status | Description | Installation |
| :--- | :--- | :--- | :--- |
| **[Router Core](https://github.com/VeloxRouter/router)** | 🟢 Active | High-performance HTTP routing engine with static $O(1)$ matching. | `composer require veloxrouter/router` |
| **[Middlewares](https://github.com/VeloxRouter/middlewares)** | 🟢 Active | Enterprise-grade security, rate limiting, and request logging. | `composer require veloxrouter/middlewares` |
| **[SSE Streaming](https://github.com/VeloxRouter/sse)** | 🟢 Active | Zero-dependency Server-Sent Events for real-time data streams. | `composer require veloxrouter/sse` |
| **[Validator](https://github.com/VeloxRouter/validator)** | 🟢 Active | Lightweight validation engine with multi-language support. | `composer require veloxrouter/validator` |
| **[RPC Microservices](https://github.com/VeloxRouter/rpc)** | 🟢 Active | JSON-RPC 2.0 communication and dispatching clients. | `composer require veloxrouter/rpc` |

---

## 🛠️ Built for Modern PHP

Designed specifically for **PHP 8.2+**, taking full advantage of modern language features such as constructor property promotion, readonly properties, strict types, and native scalar type safety.

</div>
