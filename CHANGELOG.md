# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.0] - 2024-09-15

### Added

- Updates to the landing page.

## [v0.36.0] - 2024-09-13

### Added

- New insights page.

### Updated

- Theme back to a light theme.

### Removed

- Explicit support for teams within teams.

## [v0.35.0] - 2024-09-10

### Added

- Doinfine v1 built from the ground up.

## [v0.34.2] - 2024-08-07

### Added

- Added a table that tracks which invite a user used to join [58](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/58).

## [v0.34.1] - 2024-08-07

### Fixed

- Bug preventing a user to pay off fines [132](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/132).

## [v0.34.0] - 2024-08-07

### Fixed

- Removed the work done for [114](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/114) since it was introducing a bug [130](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/130).

## [v0.33.0] - 2024-08-06

### Fixed

- Email bug where emails did not send consistently [131](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/131).

## [v0.32.1] - 2024-08-2

### Added

- Email to logging for `sendEmail` method [131](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/131).

## [v0.32.0] - 2024-08-01

### Added

- Implemented a negative word filter that warns the user if their post contains offensive language [117](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/117).
- Added styling so that mission statement correctly breaks on white space [124](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/124).
- Added a hover effect and tooltip for members buttons [125](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/125).

## [v0.31.0] - 2024-07-22

### Added

- A button to the team settings for a user to leave a team [122](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/122).

## [v0.30.0] - 2024-07-19

### Added

- A new page for admins to manage post permissions [122](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/122).
- A new page where admins can delete teams [122](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/122).

## [v0.29.0] - 2024-07-18

### Added

- New permissions system using `CASL` to help control what users can do within the app [122](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/122).

## [v0.28.0] - 2024-07-04

### Added

- Logic to route a user to their last visited space [114](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/114).
- Logic to revert to default behaviour if last visited is not defined [114](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/114).

## [v0.27.0] - 2024-07-03

### Added

- New team charter page [122](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/122).

## [v0.26.1] - 2024-07-03

### Fixed

- Non-sticky header [119](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/119).

## [v0.25.0] - 2024-06-28

### Added

- Logic to prevent a user from signing in after deactivating their account [111](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/111).
- An endpoint to be called by the pipeline to delete deactivated users [111](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/111).

## [v0.24.0] - 2024-06-27

### Added

- A way for users to view and remove any identities from their account [111](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/111).

## [v0.23.0] - 2024-06-26

### Added

- Enable a user to change their email [111](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/111).

### Removed

- Unused tables from the `prisma` schema.

## [v0.22.0] - 2024-06-25

### Added

- New account settings page [111](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/111).

## [v0.21.0] - 2024-06-21

### Added

- New members card [115](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/115).

## [v0.20.0] - 2024-06-21

### Added

- New post form [116](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/116).

## [v0.19.0] - 2024-05-27

### Added

- Implement new emails [99](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/99).

## [v0.18.0] - 2024-05-23

### Added

- Mission and values components for team pages.

## [v0.17.2] - 2024-05-22

### Fixed

- Mobile responsiveness of the application.

## [v0.17.1] - 2024-05-20

### Fixed

- Navigating between teams and feed bug [112](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/112/).

## [v0.17.0] - 2024-05-09

### Changed

- Clean up API [109](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/109).
- Move remaining pages to app directory [108](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/108).

## [v0.16.0] - 2024-04-30

### Added

- New team list on the left of the screen [92](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/92).

## [v0.15.1] - 2024-04-19

### Fixed

- Values tab in `ScopeProfileTemplate`.

## [v0.15.0] - 2024-04-19

### Added

- `Post` table with `PostReaction` and `PostValue` to accommodate new feed view [62](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/62).
- Removed built-in blog and redirect user to [Medium](https://blog.doinfine.app).
- Rendered feed view when viewing `/spaces/:id` [106](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/106).
- Added nugdes for `FINE` and `WIN` posts [106](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/106).

### Removed

- Files and code which were deprecated by new feed view [106](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/106).

## [v0.14.1] 2024-04-04

### Changed

- Replaced the `hero-cards.webp` with an image that did not include real names.

## [v0.14.0] - 2024-03-28

### Added

- New login and sign up screens [100](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/100).

### Fixed

- Sign out bug which crashed the application [103](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/103).

### Removed

- Removed notifications from frontend [99](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/99).
- Removed Slack from the project [101](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/101).
- Removed Events page [102](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/102).

## [v0.13.2] - 2024-04-13

### Fixed

- Log `Create Payment` event when a user pays a fine [96](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/96).
- Handle `204` responses properly by not parsing the `response.json()`.
- Fixed landing page rendering incorrectly when user was using light mode [95](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/95).

### Removed

- Removed support for light mode [95](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/95).

## [v0.13.0] - 2024-02-15

### Added

- `CreateScopeForm` to enable users to create a space [79](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/79).
- Functionality to deactive user account [80](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/80).
- Implemented Brewshack Events to track user behavior.

### Changed

- Upgraded `@tanstack/react-query` dependency to `v5.17.0`.
- Removed `axios` dependency in favour of using the `fetch` API.
- `TeamsTemplate` to use the new `CreateScopeForm` instead of the `CreateTeam` component [79](https://dev.azure.com/Doinfine/Doinfine/_workitems/edit/79).
- Added `FeatureFlags` helper object with feature flag names and implemented a feature flag to enable password login.
- Split queries into separate files and refactored queries to use a `getQueryOptions` function.

## [v0.12.0] - 2023-12-21

### Added

- New support menu [21](https://github.com/DoinfineHQ/roadmap/issues/21).
- Wins feature.

### Changed

- Removed reduntent items from left navigation [21](https://github.com/DoinfineHQ/roadmap/issues/21).

## [v0.11.0] - 2023-11-09

### Added

- Ability to update a member's role.
- Ability to remove a member from a team or space.
- New members component.

## [v0.10.3] - 2023-11-01

### Fixed

- Bug preventing users to update their description.
- Fixed a spelling mistake on the landing page.

## [v0.10.2] - 2023-10-31

### Added

- Landing Page.

## [v0.10.1] - 2023-10-12

### Added

- PWA Support.

### Fixed

- Fine reaction caching.

## [v0.10.0] - 2023-10-09

### Added

- Enable a user to link values to a fine [189](https://github.com/gitsocks/doinfine/issues/189).
- Assign values in a team or space [188](https://github.com/gitsocks/doinfine/issues/188).
- Added reactions to fine and payment [222](https://github.com/gitsocks/doinfine/issues/222).

### Changed

- Refactored the backend to include new `Scope` table [212](https://github.com/gitsocks/doinfine/issues/212).
- Updated the fine cards to match the designs [222](https://github.com/gitsocks/doinfine/issues/222).

### Fixed

- Bug which prevented the user from a leaving the team [228](https://github.com/gitsocks/doinfine/issues/228).
- The page had to be refreshed to view newly created fines [214](https://github.com/gitsocks/doinfine/issues/214).
- The entire page would scroll instead of the fines list [213](https://github.com/gitsocks/doinfine/issues/213).

## [v0.9.1] - 2023-09-22

### Fixed

- Bug which caused the fine modal to report error and not send notifications.
- Bug with email notifications using the incorrect template.

## [v0.9.0] - 2023-09-19

### Added

- Improved notifications for the app [203](https://github.com/gitsocks/doinfine/issues/203).
- Added the ability for a user to leave a team [173](https://github.com/gitsocks/doinfine/issues/173).

### Changed

- Refactored app to work with `scope` instead of teams and spaces [212](https://github.com/gitsocks/doinfine/issues/212).

### Fixed

- A refresh was needed to show newly created fines [214](https://github.com/gitsocks/doinfine/issues/214).
- The entire page would scroll when a user scrolled [213](https://github.com/gitsocks/doinfine/issues/213).

## [v0.8.0] - 2023-08-13

### Added

- Update account details such as profile image and name [184](https://github.com/gitsocks/doinfine/issues/184).
- Sign in with Google account [185](https://github.com/gitsocks/doinfine/issues/185).

### Fixed

- PKCE flow not supported when signing up with email and password [199](https://github.com/gitsocks/doinfine/issues/199).

## [v0.7.0] - 2023-08-02

### Added

- Updated top navigation to match new designs [164](https://github.com/gitsocks/doinfine/issues/164).
- Updated overall theme and structure to match new designs [172](https://github.com/gitsocks/doinfine/issues/172).
- Updated side navigation to match new designs [166](https://github.com/gitsocks/doinfine/issues/166).
- Updated teams navigation to match new designs [169](https://github.com/gitsocks/doinfine/issues/169).

### Fixed

- Fixed Microsoft SSO bug not storing the auth state correctly [152](https://github.com/gitsocks/doinfine/issues/152).

## [v0.6.0] - 2023-07-18

### Added

- Slack Integration 🎉.

## [v0.5.0] - 2023-07-05

### Added

- Notifications for when a new team fine is created.

### Changed

- Filter out stale fines such as `paid`, `rejected` and `cancelled` fines.
- Update header design to include notifications bell and minor improvements.

## [v0.4.0] - 2023-06-12

### Fixed

- Added back the missing scrollbar in the user side menu.
- Fixed various embarrassing console errors.

## [v0.3.0] - 2023-06-12

### Added

- Pages for view fines in a team or space.
- Proper invitation system that uses `uuid` instead of the `id`.

## [v0.2.0] - 2023-06-06

### Added

- Support for Microsoft Authentication [116](https://github.com/gitsocks/doinfine/issues/116).

### Fixed

- Cancelling a fine bug due to context not being initialised [83](https://github.com/gitsocks/doinfine/issues/83).

## [v0.1.0] - 2023-06-01

### Added

- Ability to fine someone in the space.
- Ability to fine someone in a team.
- The ability to pay back any fine in a space.
- The ability to pay back any fine in a team.
- The ability to pay back a specific fine.
- The ability to approve or reject a fine or payment.
- The ability to cancel a fine.
- The ability to join a new space or team via an invite link.
- The ability to create a team and invite new members to the team.
- The ability to switch between spaces and/or teams.
- The ability to view all members in a space and/or team.
