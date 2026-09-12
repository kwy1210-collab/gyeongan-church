/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var masterMembersCache: any[] | undefined;
  // eslint-disable-next-line no-var
  var masterVisitationsCache: any[] | undefined;
}

const isServerless = process.env.VERCEL || process.env.NODE_ENV === "production";
const dataDir = isServerless ? "/tmp" : path.join(process.cwd(), "data");

const membersFilePath = path.join(dataDir, "members.json");
const visitationsFilePath = path.join(dataDir, "visitations.json");

const INITIAL_MEMBERS = [
  {
    id: "m-1",
    name: "박영주",
    phone: "01023542783",
    position: "성도",
    district: "청년목장",
    birthdate: "1992-12-20",
    address: "부천시 장말로 137 사랑마을 청구아파트",
    familyNotes: "박병하(동생)",
    notes: "청년부 리더",
    createdAt: "2026-01-10",
  },
  {
    id: "m-2",
    name: "박영은",
    phone: "01039528964",
    position: "성도",
    district: "청년목장",
    createdAt: "2026-01-15",
  },
  {
    id: "m-3",
    name: "정대영",
    phone: "01043905061",
    position: "성도",
    district: "새가족",
    createdAt: "2026-03-01",
  },
];

const INITIAL_VISITATIONS: any[] = [];

export async function fetchCloudData(): Promise<{ members: any[]; visitations: any[] }> {
  // 1. Memory Cache Check
  if (globalThis.masterMembersCache && globalThis.masterMembersCache.length > 0) {
    return {
      members: globalThis.masterMembersCache,
      visitations: globalThis.masterVisitationsCache || [],
    };
  }

  // 2. Disk / Tmp File Read
  let members = INITIAL_MEMBERS;
  let visitations = INITIAL_VISITATIONS;

  try {
    const mData = await fs.readFile(membersFilePath, "utf-8");
    const parsed = JSON.parse(mData);
    if (Array.isArray(parsed) && parsed.length > 0) {
      members = parsed;
    }
  } catch {
    try {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(membersFilePath, JSON.stringify(INITIAL_MEMBERS, null, 2), "utf-8");
    } catch {}
  }

  try {
    const vData = await fs.readFile(visitationsFilePath, "utf-8");
    const parsed = JSON.parse(vData);
    if (Array.isArray(parsed)) {
      visitations = parsed;
    }
  } catch {
    try {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(visitationsFilePath, JSON.stringify(INITIAL_VISITATIONS, null, 2), "utf-8");
    } catch {}
  }

  globalThis.masterMembersCache = members;
  globalThis.masterVisitationsCache = visitations;

  return { members, visitations };
}

export async function saveCloudData(data: { members: any[]; visitations: any[] }) {
  // 1. Update Memory Cache
  if (Array.isArray(data.members)) {
    globalThis.masterMembersCache = data.members;
  }
  if (Array.isArray(data.visitations)) {
    globalThis.masterVisitationsCache = data.visitations;
  }

  // 2. Persist to disk (/tmp or /data)
  try {
    await fs.mkdir(dataDir, { recursive: true });
    if (Array.isArray(data.members)) {
      await fs.writeFile(membersFilePath, JSON.stringify(data.members, null, 2), "utf-8");
    }
    if (Array.isArray(data.visitations)) {
      await fs.writeFile(visitationsFilePath, JSON.stringify(data.visitations, null, 2), "utf-8");
    }
  } catch (e) {
    console.warn("Disk save skipped:", e);
  }
}
