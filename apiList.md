#LinkUpAPI

<!-- Auth Router -->
POST /signUp
POST /login
POST /logout

<!-- profile Router -->
GET /profile/view
PATCH /profile/edit
PATCH /profile/password
<!-- ConnectionRequestROUTERS -->
POST /request/send/intrested/:userId
POST /request/send/ignored/:userId
POST /request/review/accept/:requestId
POST /request/review/rejected/:requestId


<!-- user Router -->
GET /connections
GET /request/recieved
GET /feed


Status : ignore , intrested  , accepted, rejected 

