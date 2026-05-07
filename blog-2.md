# How `Pick` and `Omit` Utility Types Keep Your TypeScript Code DRY

## Introduction

As TypeScript applications grow, developers often need multiple variations of the
same interface. A `User` object used in a database, for example, may contain
sensitive information, while a public API response or login form requires only a
subset of those fields.

A common but inefficient solution is to create separate interfaces manually by
copying properties from the original interface. Over time, this leads to duplicated
code, inconsistencies, and difficult maintenance.

TypeScript's utility types — `Pick` and `Omit` — solve this problem by allowing
developers to create specialized slices of a master interface while keeping the
codebase clean, maintainable, and fully type-safe.

## The Problem with Repeated Interfaces

Consider the following master interface:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
```

Now imagine the application requires:

- A public profile without sensitive information
- A login form containing only credentials
- A lightweight user card for displaying minimal user data

Without utility types, developers may create several separate interfaces manually.
This duplicates code and creates maintenance issues whenever the original `User`
interface changes.

This directly violates the **DRY principle** (Don't Repeat Yourself).

## `Pick` — Selecting Only the Required Properties

The `Pick<T, K>` utility type creates a new type by selecting specific keys `K`
from an existing type `T`.

```typescript
type LoginForm = Pick<User, "email" | "password">;

type UserCard = Pick<User, "id" | "name">;
```

**Result:**

```typescript
// LoginForm
{
  email: string;
  password: string;
}

// UserCard
{
  id: number;
  name: string;
}
```

Using `Pick` ensures that derived types always stay synchronized with the original
interface. If a property name or type changes in `User`, TypeScript automatically
updates the dependent types and reports errors where necessary.

This greatly reduces manual maintenance and prevents inconsistencies.

## `Omit` — Removing Unnecessary Properties

While `Pick` selects specific properties, `Omit<T, K>` creates a new type by
removing selected keys from an existing type.

```typescript
type PublicProfile = Omit<User, "password" | "createdAt">;
```

**Result:**

```typescript
{
  id: number;
  name: string;
  email: string;
}
```

`Omit` is especially useful when most properties are needed but a few sensitive
or irrelevant fields should be excluded.

## Practical Example: API Data Management

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  costPrice: number;
  stock: number;
}

type PublicProduct = Omit<Product, "costPrice">;

type ProductSummary = Pick<Product, "id" | "title" | "price">;

function getPublicProduct(product: Product): PublicProduct {
  const { costPrice, ...rest } = product;
  return rest;
}

function getProductSummary(product: Product): ProductSummary {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
  };
}
```

In this example:

- `PublicProduct` prevents sensitive internal pricing data from being exposed.
- `ProductSummary` returns only the minimal data required for lightweight UI components.

Most importantly, both derived types remain connected to the original `Product`
interface, ensuring consistency throughout the application.

## Why `Pick` and `Omit` Matter

Using these utility types provides several important benefits:

- Reduces code duplication
- Keeps interfaces consistent
- Improves maintainability
- Enhances scalability in large projects
- Preserves TypeScript's strong type safety

Instead of rewriting nearly identical interfaces, developers can generate precise
data structures directly from a single source of truth.

## Conclusion

`Pick` and `Omit` are powerful TypeScript utility types that help developers write
cleaner and more maintainable code. By deriving specialized types from a master
interface, they eliminate unnecessary repetition and keep applications aligned
with the **DRY principle**.