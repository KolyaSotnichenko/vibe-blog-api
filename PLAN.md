Plan:
- Remove existing application code
- Create fresh NestJS bootstrap files
- Ensure repository bootstrap files exist
## Backend: Create Post Endpoint

- Add SQLite database utility using better-sqlite3
- Create posts module with controller and service
- Implement POST /posts endpoint
- Validate input via existing DTOs
- Update OpenAPI spec
- Add e2e test for post creation
Implement PUT /posts/:id endpoint
- Update PostsController with PUT handler
- Add update method to PostsService using SQLite
- Validate UpdatePostDto
- Update openapi.json
- Add e2e tests for update post
Implement GET /posts endpoint:
- Add findAll method to PostsService returning Post[].
- Add GET handler in PostsController.
- Update openapi.json to include GET /posts.
- Extend e2e tests for happy path and empty list.
