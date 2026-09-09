# Workflow Guide

## Capture

Use **QuickAdd: Capture Thought** for a title and thought, or **Capture URL** for a title, URL, and reason to save it. Both create notes in Inbox. The URL lives in the note body so pasted punctuation cannot break YAML.

Use **QuickAdd: Capture Task** to open TaskNotes' native form. Add a Project, priority, or dates when useful. TaskNotes saves the note in `Tasks/`, including tasks converted from inline checkboxes.

## Projects

Use **QuickAdd: New Project**. Define the outcome and select an Area. Change `status` from `Idea` to `Active` when work begins; set `start` then. Other states are `Waiting`, `Completed`, and `Archived`.

The embedded task view derives open and completed tasks from their `project` links. Create tasks through TaskNotes and normally choose one Project. Local checkboxes remain local checklists.

Projects Base includes **Needs review** (Active and untouched for 14 days) and **No open action**. These are prompts for judgment, not proof of a problem. Open action counts use backlinks; reopen the Base after task changes because backlink-derived results may not refresh immediately. Recurring tasks remain open commitments until their task status is completed.

## Process and learn

Inbox is the single capture queue. Delete noise, turn actions into TaskNotes tasks, attach context to a Project, or move durable reference to Resources.

Literature notes preserve source understanding and interpretation. Use `status: unread`, then `reading`, then `processed` to remove finished sources from the processing view. Permanent notes express one useful idea in your words with links in prose. No mandatory promotion pipeline is required.

Small decisions and experiments stay inside the Project. Create standalone notes when rationale or findings deserve preservation.

## Reviews

Use the ribbon or **QuickAdd: Open Weekly Review**. Process Inbox, review tasks and active Projects, check missing actions, and develop useful notes. **Open Monthly Review** reviews Areas and long-term priorities.

Daily, weekly, and monthly templates use Periodic Notes date tags for the period being created. Notes for another week or month should be created with Periodic Notes, not the generic template launcher.

Weekly filenames use `gggg-[W]ww`: locale week-year and week number, matching Periodic Notes' locale week start. They are not ISO week numbers. Keep the same Obsidian locale across devices for consistent weekly boundaries. Project status filters accept both `Active` and `active` (and equivalent capitalization for Waiting and Archived).

## Archive and AI

Move inactive content through Obsidian so links update. Use `status: Archived` for Projects; the portfolio retains an Archived view. Operational review queues exclude Archive and System material.

AI drafts requiring approval use `origin: ai`, `confidence`, and `review: pending`. Only a human may approve their acceptance. The AI Review Base surfaces pending proposals outside System and Archive.
