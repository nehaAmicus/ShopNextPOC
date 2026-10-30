# folder struture

Routes: folders under src/app map to URL segments when the appropriate page.tsx exists. A folder alone doesn't necessarily create a public route.
Services: components should not each implement their own fetch logic. Later, product data access will live in a shared service.
lib/: use this for enviorment files and cross-cutting helpers and configuration, not as a miscellaneous dumping ground.
4.schemas/: create validation schemas when we have concrete input or API data to validate. We don't need to install a validation library solely to create an empty folder.

# why app doesnt contain component,services and types

The app/ directory should primarily describe your routes and route-specific UI. Keeping shared components and data-access logic outside it makes the routing structure easier to understand and helps prevent accidental confusion between application infrastructure and URL segments.
