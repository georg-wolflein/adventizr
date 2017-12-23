# adventizr
A digital cloud-based advent calendar for everyone.

## Running
```
meteor run --settings settings-production.json
```

## Web API
The web API is at `/api/v1/`. It currently supports the following operations:

| Path | Method | Description |
|--|--|--|
| `/calendars` | `GET` | Get a list of all calendars |
| `/calendars/:id` | `GET` | Get the basic information of the calendar with that `id` |
| `/calendars/:id/download` | `GET` | Download the calendar with that `id` as a ZIP archive |