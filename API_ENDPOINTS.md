# API Endpoints Documentation

## Base URL
```
http://localhost:3000
```

## Health Check

### GET /hello
Simple health-check endpoint.

**Response:**
```json
{
  "message": "Hello, world!"
}
```

---

## Feeds

### GET /feeds
Get all feeds with their associated categories.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Tech News",
    "url": "https://example.com/feed",
    "img_url": "https://example.com/image.png",
    "created_at": "2024-01-15T10:30:00.000Z",
    "categories": [
      {
        "id": 1,
        "name": "Technology"
      }
    ]
  }
]
```

---

### GET /feeds/:id
Get a single feed by ID with its categories.

**Parameters:**
- `id` (path, required): Feed ID

**Response:**
```json
{
  "id": 1,
  "name": "Tech News",
  "url": "https://example.com/feed",
  "img_url": "https://example.com/image.png",
  "created_at": "2024-01-15T10:30:00.000Z",
  "categories": [
    {
      "id": 1,
      "name": "Technology"
    }
  ]
}
```

**Error Responses:**
- `404`: Feed not found
- `400`: Invalid feed ID

---

### POST /feeds
Create a new feed.

**Request Body:**
```json
{
  "name": "Tech News",
  "url": "https://example.com/feed",
  "img_url": "https://example.com/image.png"
}
```

**Required Fields:**
- `name` (string): Feed name
- `url` (string): Feed URL (must be unique)

**Optional Fields:**
- `img_url` (string): Feed image URL

**Response:**
```json
{
  "id": 1,
  "name": "Tech News",
  "url": "https://example.com/feed",
  "img_url": "https://example.com/image.png",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

**Status Code:** `201 Created`

**Error Responses:**
- `400`: Missing required fields
- `409`: Feed with this URL already exists
- `500`: Server error

---

### PUT /feeds/:id
Update a feed.

**Parameters:**
- `id` (path, required): Feed ID

**Request Body:**
```json
{
  "name": "Updated Tech News",
  "url": "https://example.com/newfeed",
  "img_url": "https://example.com/newimage.png"
}
```

**Optional Fields:**
- `name` (string): New feed name
- `url` (string): New feed URL
- `img_url` (string): New feed image URL

**Response:**
```json
{
  "id": 1,
  "name": "Updated Tech News",
  "url": "https://example.com/newfeed",
  "img_url": "https://example.com/newimage.png",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404`: Feed not found
- `409`: Feed URL already exists
- `400`: Failed to update feed

---

### DELETE /feeds/:id
Delete a feed (cascades to remove from categories).

**Parameters:**
- `id` (path, required): Feed ID

**Response:** No content

**Status Code:** `204 No Content`

**Error Responses:**
- `404`: Feed not found
- `400`: Invalid feed ID

---

## Categories

### GET /categories
Get all categories.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Technology"
  },
  {
    "id": 2,
    "name": "Science"
  }
]
```

---

### GET /categories/:id
Get a single category by ID.

**Parameters:**
- `id` (path, required): Category ID

**Response:**
```json
{
  "id": 1,
  "name": "Technology"
}
```

**Error Responses:**
- `404`: Category not found
- `400`: Invalid category ID

---

### POST /categories
Create a new category.

**Request Body:**
```json
{
  "name": "Technology"
}
```

**Required Fields:**
- `name` (string): Category name (must be unique)

**Response:**
```json
{
  "id": 1,
  "name": "Technology"
}
```

**Status Code:** `201 Created`

**Error Responses:**
- `400`: Name is required
- `409`: Category with this name already exists
- `500`: Server error

---

### PUT /categories/:id
Update a category name.

**Parameters:**
- `id` (path, required): Category ID

**Request Body:**
```json
{
  "name": "Tech"
}
```

**Required Fields:**
- `name` (string): New category name

**Response:**
```json
{
  "id": 1,
  "name": "Tech"
}
```

**Error Responses:**
- `404`: Category not found
- `400`: Name is required or invalid category ID
- `409`: Category with this name already exists

---

### DELETE /categories/:id
Delete a category (cascades to remove from feeds).

**Parameters:**
- `id` (path, required): Category ID

**Response:** No content

**Status Code:** `204 No Content`

**Error Responses:**
- `404`: Category not found
- `400`: Invalid category ID

---

## Feed-Category Relationships

### GET /categories/:id/feeds
Get all feeds in a specific category.

**Parameters:**
- `id` (path, required): Category ID

**Response:**
```json
[
  {
    "id": 1,
    "name": "Tech News",
    "url": "https://example.com/feed",
    "img_url": "https://example.com/image.png",
    "created_at": "2024-01-15T10:30:00.000Z",
    "categories": [
      {
        "id": 1,
        "name": "Technology"
      }
    ]
  }
]
```

**Error Responses:**
- `404`: Category not found
- `400`: Invalid category ID

---

### POST /feeds/:feedId/categories/:categoryId
Add a category to a feed.

**Parameters:**
- `feedId` (path, required): Feed ID
- `categoryId` (path, required): Category ID

**Response:**
```json
{
  "success": true
}
```

**Status Code:** `201 Created`

**Error Responses:**
- `404`: Feed or category not found
- `400`: Invalid feed or category ID

**Note:** If the relationship already exists, it returns success without creating a duplicate.

---

### DELETE /feeds/:feedId/categories/:categoryId
Remove a category from a feed.

**Parameters:**
- `feedId` (path, required): Feed ID
- `categoryId` (path, required): Category ID

**Response:** No content

**Status Code:** `204 No Content`

**Error Responses:**
- `404`: Feed-category association not found
- `400`: Invalid feed or category ID

---

### PUT /feeds/:feedId/categories
Replace all categories for a feed.

**Parameters:**
- `feedId` (path, required): Feed ID

**Request Body:**
```json
{
  "categoryIds": [1, 2, 3]
}
```

**Required Fields:**
- `categoryIds` (array of bigint): Array of category IDs to assign to the feed

**Response:**
```json
{
  "success": true
}
```

**Error Responses:**
- `404`: Feed or one or more categories not found
- `400`: Invalid categoryIds format or feed ID

**Note:** This operation removes all existing categories for the feed and assigns the provided ones.

---

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Successful GET or PUT request
- `201`: Successful resource creation
- `204`: Successful deletion (no content returned)
- `400`: Bad request (validation error)
- `404`: Resource not found
- `409`: Conflict (e.g., duplicate unique values)
- `500`: Server error

Error responses follow this format:
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Data Types

### Feed
```typescript
{
  id: bigint;
  name: string;
  url: string;
  img_url: string | null;
  created_at: string; // ISO 8601 timestamp
  categories?: Category[]; // Only in responses that include relationships
}
```

### Category
```typescript
{
  id: bigint;
  name: string;
}
```

### FeedWithCategories
```typescript
Feed & {
  categories: Category[];
}
```

---

## Example Workflows

### Creating a Feed with Categories

1. **Create a feed:**
   ```
   POST /feeds
   {
     "name": "Tech News",
     "url": "https://example.com/feed",
     "img_url": "https://example.com/image.png"
   }
   ```

2. **Add categories to the feed:**
   ```
   POST /feeds/1/categories/1
   POST /feeds/1/categories/2
   ```

Or use the bulk operation:
   ```
   PUT /feeds/1/categories
   {
     "categoryIds": [1, 2]
   }
   ```

### Updating Feed Categories

Replace all categories for a feed:
```
PUT /feeds/1/categories
{
  "categoryIds": [3, 4]
}
```

This removes categories 1 and 2, and adds categories 3 and 4.

### Getting Feeds by Category

```
GET /categories/1/feeds
```

Returns all feeds that belong to category 1.
```
