# Validation Report

Implementation updated after critical review. Earlier validation statements overstated what file checks establish.

## Scope

Configuration, templates, links, and views have been repaired. Live Obsidian creation, rendering, completion, and reopening must not be inferred from JSON parsing alone.

## Verified

Run `node System/Scripts/check-vault.cjs` from the vault root. It checks configuration JSON, internal links, task identity and path agreement, QuickAdd targets, Commander references, bookmarks, column/sort structure, capture prompts, and period-aware template tokens. It also simulates Project task filtering and action counts with open, completed, unrelated, and excluded notes.

These checks are read-only. They do not execute Obsidian's Base expression engine or constitute full YAML schema validation.

## Live validation still required

This session has no native Obsidian control surface. Restart Obsidian to load plugin settings and then verify:

1. Open Home and use the new-task ribbon button. Create a task assigned to a Project and confirm it appears in the task list and the Project's embedded view.
2. Complete that task; confirm it moves to the Project's Completed view. Reopen Projects Base to refresh the derived No open action view.
3. Capture a thought and a URL; confirm their entered content is saved in Inbox.
4. Open the current weekly review using its ribbon button. Use Periodic Notes to create a different period and confirm that the heading and property represent that period.
5. Set a Literature note to `status: processed` and verify it leaves Needs processing. Confirm templates, hubs, and archive examples are absent from operational queues.

## Known behavior

Backlink-derived counts may require reopening the Base after edits. No open action counts open commitments; it does not decide whether a recurring task's current occurrence has been completed. Native TaskNotes views handle task recurrence. The Needs review view flags Active Projects unchanged for 14 days, which is a review prompt rather than a claim that work has stalled.

TaskNotes views were moved into `System/TaskNotes/Views/`, preserving their contents and updating mappings. The old empty top-level TaskNotes directories were removed; no task content was deleted.
