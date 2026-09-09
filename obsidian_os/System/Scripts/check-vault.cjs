// Read-only checks. This does not replace testing inside Obsidian.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const json = p => JSON.parse(read(p));
const exists = p => fs.existsSync(path.join(root, p));
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('PASS ' + name); }
function walk(dir) { return fs.readdirSync(path.join(root, dir), {withFileTypes: true}).flatMap(e => { const p = path.posix.join(dir, e.name); return e.isDirectory() ? walk(p) : [p]; }); }
const all = walk('');
const notes = all.filter(p => p.endsWith('.md') && !p.startsWith('.obsidian/'));
const bases = all.filter(p => p.endsWith('.base') && !p.startsWith('.obsidian/'));
test('JSON parses', () => all.filter(p => p.endsWith('.json') && !p.includes('/backups/')).forEach(json));
test('Wikilinks resolve outside plugin documentation', () => {
  const targets = new Set([...notes, ...bases].flatMap(p => [p, p.replace(/\.md$/, ''), path.basename(p), path.basename(p, '.md')]));
  for (const p of notes.filter(p => !p.startsWith('System/TaskNotes/'))) {
    const body = read(p).replace(/```[\s\S]*?```/g, '');
    for (const m of body.matchAll(/\[\[([^\]|#]+)(?:[^\]]*)\]\]/g)) assert(targets.has(m[1]), `${p}: missing ${m[1]}`);
  }
});
test('Task identity, paths, contexts, and view mappings agree', () => {
  const t = json('.obsidian/plugins/tasknotes/data.json');
  assert.equal(t.tasksFolder, 'Tasks'); assert.equal(t.inlineTaskConvertFolder, 'Tasks');
  assert.equal(t.taskIdentificationMethod, 'property'); assert.equal(t.taskPropertyName, 'type'); assert.equal(t.taskPropertyValue, 'task');
  assert.equal(t.fieldMapping.projects, 'project'); assert.equal(t.fieldMapping.contexts, 'contexts');
  Object.values(t.commandFileMapping).forEach(p => assert(exists(p), p));
  for (const p of bases.filter(p => p.startsWith('System/TaskNotes/Views/'))) {
    assert(!read(p).includes('file.hasTag("task")'), p); assert(!/\bnote\.projects\b|^-?\s+- projects\s*$/m.test(read(p)), p);
  }
});
const qa = json('.obsidian/plugins/quickadd/data.json');
test('QuickAdd targets and Commander command references resolve', () => {
  assert.equal(new Set(qa.choices.map(c => c.id)).size, qa.choices.length);
  for (const c of qa.choices) {
    if (c.type === 'Template') { assert(exists(c.templatePath), c.name); c.folder.folders.forEach(p => assert(exists(p), p)); }
    if (c.type === 'Macro') for (const step of c.macro.commands) {
      if (step.type === 'OpenFile') assert(exists(step.filePath), c.name);
      else { assert.equal(step.type, 'Obsidian'); assert(['tasknotes:create-new-task','periodic-notes:open-weekly-note','periodic-notes:open-monthly-note'].includes(step.commandId)); }
    }
  }
  assert.equal(qa.choices.find(c => c.name === 'Capture Task').macro.commands[0].commandId, 'tasknotes:create-new-task');
  for (const c of json('.obsidian/plugins/cmdr/data.json').leftRibbon) if(c.id.startsWith('quickadd:choice:')) assert(qa.choices.some(q => c.id === 'quickadd:choice:' + q.id), c.id);
  json('.obsidian/bookmarks.json').items.filter(i=>i.type==='file').forEach(i=>assert(exists(i.path),i.path));
});
test('Custom Bases separate columns and sorting', () => {
  for(const p of bases.filter(p=>p.startsWith('System/Bases/'))) {
    const s=read(p); assert(!s.includes('columns:'),p); assert(s.includes('views:'),p); assert(s.includes('    order:'),p);
  }
});
test('Capture URL prompts for URL and thoughts prompt for content', () => {
  assert(read('System/Templates/URL Capture.md').includes('{{VALUE:URL}}'));
  assert(read('System/Templates/Fleeting Note.md').includes('{{VALUE:Thought}}'));
});
test('Periodic templates use period-aware native tokens', () => {
  const pn=json('.obsidian/plugins/periodic-notes/data.json');
  for(const kind of ['daily','weekly','monthly']) {
    const p=pn[kind]; assert(p.enabled); assert(exists(p.folder));
    const s=read(p.template+'.md'); assert(!s.includes('tp.date.now')); assert(s.includes('{{date:'+p.format+'}}'));
  }
});
test('Task query behavior with a Project, completion, and excluded notes (simulation)', () => {
  const template=read('System/Templates/Project.md'); assert(template.includes('![[System/Bases/Project Tasks.base]]'));
  const source=read('System/Bases/Project Tasks.base');
  const global=source.split('views:')[0].split('\n').filter(l=>/^    - /.test(l)).map(l=>l.slice(6).replace(/^'(.*)'$/, '$1'));
  function matches(note, folder, project) {
    const file={inFolder:p=>folder===p||folder.startsWith(p+'/')};
    const list=v=>({contains:x=>(Array.isArray(v)?v:[v]).includes(x)});
    return global.every(e=>Function('note','file','list','project','host', 'return ('+e.replaceAll('this.file.asLink()', 'host')+')')(note,file,list,note.project,project));
  }
  assert(matches({type:'task',project:['[[Pilot]]'],status:'open'},'Tasks','[[Pilot]]'));
  assert(!matches({type:'task',project:['[[Other]]']},'Tasks','[[Pilot]]'));
  assert(!matches({type:'task',project:['[[Pilot]]']},'System/Templates','[[Pilot]]'));
  assert(!matches({type:'task',project:['[[Pilot]]']},'Archive/Tasks','[[Pilot]]'));
  assert(source.includes('status != "done"')); assert(source.includes('status == "done"'));
});
test('Derived open-action count changes after completion (simulation)', () => {
  let expr=read('System/Bases/Projects.base').match(/openActions: '(.*)'/)[1];
  expr=expr.replace('.filter(value.', '.filter(value => value.');
  const task={properties:{type:'task',status:'open',project:['[[Pilot]]']},inFolder:()=>false};
  const file={backlinks:[task],asLink:()=>'[[Pilot]]'};
  const list=v=>({contains:x=>(Array.isArray(v)?v:[v]).includes(x)});
  const count=()=>Function('file','list','return '+expr)(file,list);
  assert.equal(count(),1); task.properties.status='done'; assert.equal(count(),0);
  task.properties.status='open'; task.properties.project=['[[Other]]']; assert.equal(count(),0);
});
test('Project status filters tolerate capitalization (simulation)', () => {
  const s=read('System/Bases/Projects.base');
  const expressions=[...s.matchAll(/- (status\.lower\(\) [!=]= "[^"]+")/g)].map(m=>m[1]);
  assert.equal(expressions.length,8);
  for(const expression of expressions) {
    const run=Function('status','return '+expression.replace('.lower()', '.toLowerCase()'));
    for(const state of ['active','waiting','archived']) assert.equal(run(state),run(state[0].toUpperCase()+state.slice(1)));
  }
});
test('Weekly numbering matches the plugin locale week convention', () => {
  const p=json('.obsidian/plugins/periodic-notes/data.json').weekly;
  assert.equal(p.format,'gggg-[W]ww');
  assert(read(p.template+'.md').includes('{{date:gggg-[W]ww}}'));
  for(const file of notes.filter(p=>/^Periodic\/Weekly\/\d{4}-W\d{2}\.md$/.test(p))) {
    const period=path.basename(file,'.md'); assert(read(file).includes('week: '+period));
    assert(read(file).includes('# Weekly Review — '+period));
  }
});
console.log(`${checks} checks passed. No files changed. Live Obsidian rendering and actions remain untested.`);
