This API authenticates using a shared secret (via the `shared_secret` header).

Its clients are not end users, they are other servers, such as Interstellar, or this same server. The clients of this API should ensure the user has enough access, as deemed appropriate.

## Methods:

### `GET ./whoami`

Who is the server authenticated as? (bot or appservice user)

### `GET ./subject/[subject]`

Get details about subject

### `GET ./chat/[subject]`

Get details about class group chat

### `GET ./chat/[subject]/member/[mxid]`

Get membership status of (potential) member

Returns a dict with the key `membership` whose value can be one of `not_joined`,
`invited`, `joined` or `banned`.

### `PUT ./chat/[subject]/member/[mxid]`

Invite Matrix user to chat