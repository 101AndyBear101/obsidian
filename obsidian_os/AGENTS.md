# AGENTS.md — Vault Operating Guide

## Architecture

This is a Markdown-first PARA + Zettelkasten vault. Read `System/Documentation/Architecture.md` and `Workflow Guide.md` before making structural changes. Folders are lightweight homes; wikilinks/backlinks carry ordinary relationships; Bases are views, never storage schemas.

## Locations

`Inbox/` is unprocessed capture; `Projects/` finite working notes; `Tasks/` contains TaskNotes pages; `Areas/` ongoing responsibilities; `Resources/` reference hubs; `Notes/` holds Literature and Permanent notes; fleeting captures live in `Inbox/`; `Archive/` holds inactive items; `Periodic/` holds dated reviews; `System/` contains templates, Bases, and docs.

## Canonical properties

Use lowercase names exactly: `type`, `status`, `area`, `start`, `target`, `project`, `priority`, `due`, `scheduled`, `contexts`, `source`, `author`, `url`, `origin`, `confidence`, `review`. Do not invent variants such as `projects` or `project_link`. `project` is the canonical property name. TaskNotes may store it as a list of wikilinks; normally choose one Project. Add properties only when a view/automation needs them.

## Safe edits

Preserve frontmatter and meaningful prose. Do not mass-rename properties or move notes without updating links. Do not manually duplicate backlink-derived task, note, decision, or resource lists in Projects. Use templates under `System/Templates/`; do not put user content under `System/`.

## Task and knowledge conventions

TaskNotes owns global task lifecycle. Create task pages from `TaskNotes Task`; set `project` where relevant. A Project note is the working workspace. Fleeting captures may be discarded; Literature notes capture source context and interpretation; Permanent notes express one durable idea and use meaningful links in prose.

## AI policy

AI-generated drafts requiring review belong in `Inbox/` with `origin: ai`, `confidence`, and `review: pending`. Never remove `review: pending` without explicit human approval. Use `System/Bases/AI Review.base` to inspect proposals. Do not create provenance metadata on ordinary human notes.

## Validate after changes

Confirm new Markdown opens without malformed YAML, every Project has a valid `status`, TaskNotes task pages use `project` (a link or list of links) if applicable, and Base paths still match actual folders. Check internal wikilinks where a move or rename occurred. Treat `.obsidian/` and community-plugin configuration as cautious, app-managed files.

## Configuration details

TaskNotes native forms own task creation and lifecycle. QuickAdd Capture Task delegates to `tasknotes:create-new-task`. Inline conversions also use `Tasks/`. TaskNotes views and onboarding live under `System/TaskNotes/`; preserve their command mappings on moves. Commander stores shared configuration in its data.json (it is not exclusively device-local). Periodic templates use native Periodic Notes date tags; other note templates use Templater. Inbox is the only capture queue. Literature status is `unread`, `reading`, or `processed`. Core Bases use `order` for columns and `sort` entries for sorting. Backlink-derived Project action counts may require reopening the Base. Do not label file checks as live Obsidian workflow validation.
