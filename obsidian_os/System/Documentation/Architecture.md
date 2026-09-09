# Architecture

This is a Markdown-first PARA + Zettelkasten vault. Folders provide a light home; wikilinks and backlinks carry most relationships; Properties exist only when a view, sort, automation, or review needs them.

## Folder architecture

- `Inbox/` — unified unprocessed capture.
- `Projects/` — finite working documents.
- `Tasks/` — TaskNotes task pages.
- `Areas/` — durable responsibility hubs.
- `Resources/` — reference hubs and MOCs when useful.
- `Notes/` — Literature and Permanent notes.
- `Archive/` — inactive/completed material.
- `Periodic/` — daily, weekly, and monthly cadence.
- `System/` — templates, Bases, and operating documentation.
- `Attachments/` — files embedded from notes.

## Canonical properties

`type` identifies a note role. `status` is used only where lifecycle filtering matters. Projects use `area`, `start`, and `target`; TaskNotes task pages use `priority`, `due`, `scheduled`, `project`, and optionally `contexts`. `project` is the canonical name; TaskNotes may store a list of wikilinks. Normally choose one Project. It is the sole canonical task-to-project relationship.

Source notes may use `source`, `author`, `url`, and `status`. AI-authored proposals use `origin: ai`, `confidence: low|medium|high`, and `review: pending` until a person accepts, edits, or rejects them. Do not add those fields to ordinary notes.

## Lifecycle

Projects are working notes under `Projects/`. On completion or abandonment, set `status: Archived` and move them to `Archive/` when it reduces noise. Links continue to work. Small Decisions and tests remain in a Project; promote them only when their history is reusable.

## Why no database

Bases are presentation files under `System/Bases/`; they read notes rather than define them. A note remains valuable in a text editor, and backlinks eliminate fragile synchronized lists.

## Operational views

TaskNotes view files live under `System/TaskNotes/Views/`; actions and inline conversions live under `Tasks/`. Inbox is the single fleeting capture location. The old Fleeting navigation note is retained only to preserve links. Project action counts are derived from backlinks and task status; reopen the Base after edits when needed. Literature notes leave the processing queue at `status: processed`. System notes, hubs, and archived material are excluded from operational review queues.
