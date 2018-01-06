# adventizr
A digital cloud-based advent calendar for everyone.

## Running
```
ROOT_URL=http://{host}:{port}/ meteor run --settings settings-production.json
```

## Web API
The web API is at `/api/v1`. It currently supports the following operations:

| Method | Endpoint | Description |
|--|--|--|
| `GET` | `/status` | Returns the current status of the API. The query parameter `?format=plain` will use plain text instead of JSON. |
| `GET` | `/calendars` | Get a list of all calendars. |
| `GET` | `/calendars/:id` | Get the basic information of the calendar with that `id`. |
| `GET` | `/calendars/:id/download` | Download the calendar with that `id` as a ZIP archive. |