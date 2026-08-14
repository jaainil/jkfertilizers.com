#!/usr/bin/env node
/**
 * generate-skills-index.mjs
 * Generates /.well-known/agent-skills/index.json per Agent Skills Discovery RFC v0.2.0.
 *
 * Computes exact SHA-256 digests for all SKILL.md files.
 *
 * Run manually: node scripts/generate-skills-index.mjs
 * Run on build: npm run build
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SITE_URL = 'https://jkfertilizers.com';
const ROOT_DIR = resolve(process.cwd());
const DIST_DIR = join(ROOT_DIR, 'dist');
const PUBLIC_DIR = join(ROOT_DIR, 'public');
const SKILLS_DIR = join(PUBLIC_DIR, '.well-known/agent-skills');

function sha256Hex(bufferOrString) {
  return createHash('sha256').update(bufferOrString).digest('hex');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!match) return { data: {}, body: raw };
  const block = match[1];
  const body = raw.slice(match[0].length).trim();
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith(' ') || line.startsWith('\t')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body };
}

function generateSkillsIndex() {
  if (!existsSync(SKILLS_DIR)) {
    mkdirSync(SKILLS_DIR, { recursive: true });
  }

  const entries = readdirSync(SKILLS_DIR, { withFileTypes: true });
  const skills = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const skillName = entry.name;
      const skillFile = join(SKILLS_DIR, skillName, 'SKILL.md');
      if (existsSync(skillFile)) {
        const fileBuffer = readFileSync(skillFile);
        const digest = `sha256:${sha256Hex(fileBuffer)}`;
        const { data } = parseFrontmatter(fileBuffer.toString('utf8'));

        skills.push({
          name: skillName,
          type: 'skill-md',
          description: data.description || `J K Fertilizers ${skillName} skill.`,
          url: `${SITE_URL}/.well-known/agent-skills/${skillName}/SKILL.md`,
          digest,
        });
      }
    }
  }

  const discoveryDoc = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills,
  };

  const jsonStr = JSON.stringify(discoveryDoc, null, 2) + '\n';

  // Write to public
  const publicIndex = join(SKILLS_DIR, 'index.json');
  writeFileSync(publicIndex, jsonStr, 'utf8');
  console.log(`[skills] Written → public/.well-known/agent-skills/index.json (${skills.length} skills)`);

  // Write to dist if present
  if (existsSync(DIST_DIR)) {
    const distSkillsDir = join(DIST_DIR, '.well-known/agent-skills');
    if (!existsSync(distSkillsDir)) mkdirSync(distSkillsDir, { recursive: true });
    writeFileSync(join(distSkillsDir, 'index.json'), jsonStr, 'utf8');
    console.log(`[skills] Written → dist/.well-known/agent-skills/index.json`);
  }
}

generateSkillsIndex();
