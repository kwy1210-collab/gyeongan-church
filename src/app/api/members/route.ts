/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "members.json");

declare global {
  // eslint-disable-next-line no-var
  var membersCache: any[] | undefined;
}

const INITIAL_MEMBERS = [
  {
    id: "m-1",
    name: "홍길동",
    phone: "010-1234-5678",
    position: "집사",
    district: "1구역",
    birthdate: "1980-05-15",
    address: "경기도 광주시 경안동 123-45",
    familyNotes: "배우자: 김영희 (집사), 자녀 2명 (민수, 지은)",
    notes: "찬양대 봉사 중, 주일예배 참석 성실",
    createdAt: "2026-01-10",
  },
  {
    id: "m-2",
    name: "김성결",
    phone: "010-9876-5432",
    position: "권사",
    district: "2구역",
    birthdate: "1965-11-20",
    address: "경기도 광주시 송정동 88-1",
    familyNotes: "자녀 직장 관계로 독거 중",
    notes: "구역장 봉사 중, 새벽기도회 매일 참석",
    createdAt: "2026-01-15",
  },
  {
    id: "m-3",
    name: "이은혜",
    phone: "010-5555-7777",
    position: "성도",
    district: "3구역",
    birthdate: "1992-03-08",
    address: "경기도 광주시 태전동 아파트 101동",
    familyNotes: "신혼 가구, 남편 (박믿음 성도)",
    notes: "올해 초 등록, 교사 봉사 희망",
    createdAt: "2026-03-01",
  },
  {
    id: "m-4",
    name: "박믿음",
    phone: "010-3333-2222",
    position: "장로",
    district: "1구역",
    birthdate: "1958-08-30",
    address: "경기도 광주시 경안동 45-6",
    familyNotes: "배우자: 최순희 (권사)",
    notes: "재정부장 봉사 중",
    createdAt: "2026-01-01",
  },
];

async function readMembersFromFile() {
  if (globalThis.membersCache && globalThis.membersCache.length > 0) {
    return globalThis.membersCache;
  }

  try {
    const fileData = await fs.readFile(dataFilePath, "utf-8");
    const parsed = JSON.parse(fileData);
    globalThis.membersCache = parsed;
    return parsed;
  } catch {
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(dataFilePath, JSON.stringify(INITIAL_MEMBERS, null, 2), "utf-8");
    } catch (e) {
      console.warn("FS write skipped:", e);
    }
    globalThis.membersCache = INITIAL_MEMBERS;
    return INITIAL_MEMBERS;
  }
}

async function saveMembersToFile(members: any[]) {
  globalThis.membersCache = members;
  try {
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(members, null, 2), "utf-8");
  } catch (e) {
    console.warn("FS save skipped (read-only environment):", e);
  }
}

export async function GET() {
  try {
    const members = await readMembersFromFile();
    return NextResponse.json(members);
  } catch (error) {
    console.error("GET Members Error:", error);
    return NextResponse.json({ error: "Failed to load members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let members = await readMembersFromFile();

    if (Array.isArray(body)) {
      members = body;
    } else if (body && typeof body === "object") {
      members = [body, ...members];
    }

    await saveMembersToFile(members);
    return NextResponse.json(members);
  } catch (error) {
    console.error("POST Members Error:", error);
    return NextResponse.json({ error: "Failed to save member" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const members = await readMembersFromFile();

    if (!body.id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const updatedMembers = members.map((m: any) => (m.id === body.id ? { ...m, ...body } : m));
    await saveMembersToFile(updatedMembers);
    return NextResponse.json(updatedMembers);
  } catch (error) {
    console.error("PUT Members Error:", error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const members = await readMembersFromFile();
    const updatedMembers = members.filter((m: any) => m.id !== id);

    await saveMembersToFile(updatedMembers);
    return NextResponse.json(updatedMembers);
  } catch (error) {
    console.error("DELETE Members Error:", error);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
