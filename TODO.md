## Implement complete auth flow for banning a user

When a user is banned, emit `UserBanned` event and tell each micrservice aboute it.
Each service would have a short-lived in memory cache of banned users, before giving access.
We need to do this cuz if a user is banned their JWT is still going to be valid for the duration of JWT and the microservice wont know about it.
