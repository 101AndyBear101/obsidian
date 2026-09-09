# Plugin Setup

## Configured workflows

- **TaskNotes:** task pages and inline conversions go to `Tasks/`. Identification is `type: task`. Templates and Archive are excluded. Projects map to `project`; contexts use `contexts`. Choose one Project normally; TaskNotes may serialize links as a list.
- **QuickAdd:** capture thoughts and URLs into Inbox; create Projects, Areas, Resources, Literature and Permanent notes, Decisions, and Experiments. Capture Task delegates to TaskNotes' native form. Navigation choices open Home, Inbox, Projects, and current weekly/monthly reviews.
- **Templater:** uses `System/Templates/`. Installed QuickAdd explicitly invokes Templater when creating a template-backed note. No startup scripts or system commands are needed. The device-local new-file trigger is optional for other creation paths; it has not been verified here.
- **Periodic Notes:** owns daily, weekly, and monthly creation. Periodic templates use its native date tags, which represent the selected period, including past and future periods, without requiring Templater's automatic trigger.
- **Commander:** ribbon buttons call existing QuickAdd commands. Configuration is saved in `.obsidian/plugins/cmdr/data.json`; buttons apply to all devices.
- **Linter:** conservative formatting on save, preserving two-space Markdown line breaks and excluding template files.
- **Style Settings:** available with no required custom styling.

TaskNotes views live in `System/TaskNotes/Views/`; task content lives in `Tasks/`. Command mappings and embedded links use the new locations.

## Load and verify

Restart Obsidian to load changed settings. Check **QuickAdd: Capture Task**, create a task, and confirm it appears in the TaskNotes task list. The task view filters and configured identification must both use `type: task`.

Run **QuickAdd: Open Weekly Review** to open this week's dated review. Open Home or use its bookmarks for direct navigation.

Installed plugin source was used to check command IDs and setting names. Live app behavior must still be confirmed in Obsidian; valid configuration files alone do not prove a working UI.
